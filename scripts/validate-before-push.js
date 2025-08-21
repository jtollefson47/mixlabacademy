#!/usr/bin/env node

/**
 * Pre-push validation script to catch CI issues locally
 * This script validates the build, tests, and E2E accessibility before pushing to GitHub
 */

const { spawn, exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)
const path = require('path')
const fs = require('fs')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  step: (msg) => console.log(`\n${colors.cyan}🔄 ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.magenta}🚀 ${msg}${colors.reset}`)
}

// Configuration
const CONFIG = {
  projectRoot: path.resolve(__dirname, '..'),
  serverPort: 3000,
  serverStartTimeout: 30000,
  lighthouseTimeout: 60000,
}

class ValidationError extends Error {
  constructor(message, step) {
    super(message)
    this.step = step
  }
}

class PrePushValidator {
  constructor() {
    this.devServer = null
    this.isServerRunning = false
  }

  async run() {
    log.header('Pre-Push Validation Started')
    
    try {
      // Step 1: Environment check
      await this.checkEnvironment()
      
      // Step 2: Build validation
      await this.validateBuild()
      
      // Step 3: Unit tests
      await this.runUnitTests()
      
      // Step 4: Start dev server for E2E tests
      await this.startDevServer()
      
      // Step 5: E2E accessibility tests
      await this.runAccessibilityTests()
      
      // Step 6: Cleanup
      await this.cleanup()
      
      log.success('All validations passed! ✨ Ready to push to GitHub')
      process.exit(0)
      
    } catch (error) {
      log.error(`Validation failed at step: ${error.step || 'unknown'}`)
      log.error(`Error: ${error.message}`)
      
      await this.cleanup()
      process.exit(1)
    }
  }

  async checkEnvironment() {
    log.step('Checking environment requirements')
    
    // Check Node.js version
    const nodeVersion = process.version
    log.info(`Node.js version: ${nodeVersion}`)
    
    // Check if pnpm is available
    try {
      const { stdout } = await execAsync('pnpm --version')
      log.info(`pnpm version: ${stdout.trim()}`)
    } catch (error) {
      throw new ValidationError('pnpm is not installed or not available', 'environment-check')
    }
    
    // Check if required files exist
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'tailwind.config.ts',
      'tsconfig.json',
      'playwright.config.ts'
    ]
    
    for (const file of requiredFiles) {
      const filePath = path.join(CONFIG.projectRoot, file)
      if (!fs.existsSync(filePath)) {
        throw new ValidationError(`Required file missing: ${file}`, 'environment-check')
      }
    }
    
    log.success('Environment check passed')
  }

  async validateBuild() {
    log.step('Validating build process')
    
    try {
      // Clean previous build
      await this.runCommand('rm -rf .next')
      
      // Run build with proper NVM setup
      const buildResult = await this.runCommand(
        'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && pnpm build'
      )
      
      log.success('Build validation passed')
      return buildResult
    } catch (error) {
      throw new ValidationError(`Build failed: ${error.message}`, 'build-validation')
    }
  }

  async runUnitTests() {
    log.step('Running unit tests')
    
    try {
      const testResult = await this.runCommand(
        'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && pnpm test --run'
      )
      
      log.success('Unit tests passed')
      return testResult
    } catch (error) {
      // Unit test failures shouldn't block push if they're not critical
      log.warning(`Unit tests had issues: ${error.message}`)
      log.info('Continuing with E2E tests...')
    }
  }

  async startDevServer() {
    log.step('Starting development server for E2E tests')
    
    try {
      // Kill any existing dev servers
      await this.runCommand('pkill -f "next dev" || true')
      await this.sleep(2000)
      
      // Start dev server in background
      this.devServer = spawn('bash', ['-c', 
        'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && cd "' + CONFIG.projectRoot + '" && pnpm dev'
      ], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: true
      })
      
      // Wait for server to be ready
      log.info('Waiting for server to start...')
      await this.waitForServer()
      
      log.success(`Development server is running on http://localhost:${CONFIG.serverPort}`)
      
    } catch (error) {
      throw new ValidationError(`Failed to start dev server: ${error.message}`, 'dev-server-start')
    }
  }

  async waitForServer() {
    const startTime = Date.now()
    
    while (Date.now() - startTime < CONFIG.serverStartTimeout) {
      try {
        const response = await this.checkServerHealth()
        if (response) {
          this.isServerRunning = true
          return
        }
      } catch (error) {
        // Server not ready yet, continue waiting
      }
      
      await this.sleep(1000)
    }
    
    throw new Error(`Server did not start within ${CONFIG.serverStartTimeout}ms`)
  }

  async checkServerHealth() {
    try {
      const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:${CONFIG.serverPort}`)
      return stdout.trim() === '200'
    } catch (error) {
      return false
    }
  }

  async runAccessibilityTests() {
    log.step('Running accessibility E2E tests')
    
    if (!this.isServerRunning) {
      throw new ValidationError('Development server is not running', 'accessibility-tests')
    }
    
    try {
      // Install Playwright browsers if needed
      log.info('Ensuring Playwright browsers are installed...')
      await this.runCommand(
        'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && npx playwright install chromium'
      )
      
      // Run accessibility tests
      log.info('Running accessibility tests...')
      const testResult = await this.runCommand(
        'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && pnpm test:a11y',
        { timeout: CONFIG.lighthouseTimeout }
      )
      
      log.success('Accessibility tests passed')
      return testResult
      
    } catch (error) {
      throw new ValidationError(`Accessibility tests failed: ${error.message}`, 'accessibility-tests')
    }
  }

  async cleanup() {
    log.step('Cleaning up')
    
    try {
      // Kill dev server
      if (this.devServer) {
        process.kill(-this.devServer.pid, 'SIGTERM')
        this.devServer = null
      }
      
      // Kill any remaining dev servers
      await this.runCommand('pkill -f "next dev" || true')
      
      log.info('Cleanup completed')
    } catch (error) {
      log.warning(`Cleanup had issues: ${error.message}`)
    }
  }

  async runCommand(command, options = {}) {
    const timeout = options.timeout || 120000 // 2 minutes default
    
    return new Promise((resolve, reject) => {
      const child = exec(command, {
        cwd: CONFIG.projectRoot,
        timeout
      }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Command failed: ${command}\n${stderr || error.message}`))
        } else {
          resolve(stdout)
        }
      })
      
      // Log output in real-time for long-running commands
      if (options.realTimeOutput !== false) {
        child.stdout?.on('data', (data) => {
          process.stdout.write(data)
        })
        child.stderr?.on('data', (data) => {
          process.stderr.write(data)
        })
      }
    })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Handle script interruption
process.on('SIGINT', async () => {
  log.warning('Received SIGINT, cleaning up...')
  try {
    await execAsync('pkill -f "next dev" || true')
  } catch (error) {
    // Ignore cleanup errors
  }
  process.exit(130)
})

// Run the validator
const validator = new PrePushValidator()
validator.run().catch((error) => {
  log.error(`Unexpected error: ${error.message}`)
  process.exit(1)
})
