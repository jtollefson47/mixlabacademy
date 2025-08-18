# Audio Learning Platform

A nonprofit organization dedicated to making audio engineering education accessible through game-based learning. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Mission

We believe that quality audio engineering education should be accessible to everyone. Our platform combines the power of gamification with professional-grade learning to make audio engineering skills development engaging, effective, and free for all learners.

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nonprofit-audio-learn.git
cd nonprofit-audio-learn

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production application |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |
| `pnpm e2e:install` | Install Playwright browsers |

## 🧪 Testing

### Unit Tests
We use Vitest and React Testing Library for unit testing:

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### End-to-End Tests
Playwright handles our E2E testing:

```bash
# Install Playwright browsers (first time only)
pnpm e2e:install

# Run E2E tests
pnpm test:e2e

# Run E2E tests in headed mode
pnpm test:e2e --headed

# Run E2E tests for specific browser
pnpm test:e2e --project=chromium
```

## 🎮 Features

### Current Games
- **EQ Match** *(In Development)*: Train your ear to identify frequency ranges and EQ adjustments

### Planned Games
- **Compression Quest**: Master dynamic range control
- **Mix Master**: Practice mixing techniques
- **Reverb Runner**: Learn reverb types and applications
- **Spectrum Detective**: Analyze frequency spectrums
- **Mastering Challenge**: Advanced mastering techniques

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Testing**: Vitest + @testing-library/react + Playwright
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm
- **CI/CD**: GitHub Actions

## ♿ Accessibility

This project prioritizes accessibility and follows WCAG AA guidelines:

- ✅ Semantic HTML and proper landmarks
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management and visible focus indicators
- ✅ Color contrast compliance
- ✅ `prefers-reduced-motion` support
- ✅ Alternative text for images

### Accessibility Testing
```bash
# Manual testing checklist
1. Navigate using only keyboard (Tab, Enter, Space, Arrow keys)
2. Test with screen reader (VoiceOver on Mac, NVDA on Windows)
3. Verify color contrast ratios
4. Test with reduced motion preferences
5. Validate HTML semantics
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test && pnpm test:e2e`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards
- Write TypeScript with strict type checking
- Follow ESLint and Prettier configurations
- Write tests for new features
- Ensure accessibility compliance
- Document complex logic

### Issue Reports
When reporting issues, please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 💰 [Donating](https://audiolearning.org/donate) to support development

## 📞 Contact

- 🌐 Website: [https://audiolearning.org](https://audiolearning.org)
- 📧 Email: [contact@audiolearning.org](mailto:contact@audiolearning.org)
- 💬 Discord: [Join our community](https://discord.gg/audiolearning)

---

**Audio Learning Platform** - *Making audio engineering education accessible to everyone* 🎵
