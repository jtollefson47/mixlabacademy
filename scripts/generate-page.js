#!/usr/bin/env node

/**
 * Page Template Generator
 * 
 * Generates new pages that follow our style guide automatically.
 * Usage: npm run generate:page <pageName> [pageType]
 */

const fs = require('fs');
const path = require('path');

const pageTypes = {
  standard: {
    template: `'use client'

import { PageWrapper, PageHeader } from '@/components/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function {{PageName}}Page() {
  return (
    <PageWrapper>
      <PageHeader
        title="{{Title}}"
        description="{{Description}}"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Card content goes here.</p>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  )
}`,
    description: 'Standard page with header and card grid'
  },
  
  dashboard: {
    template: `'use client'

import { useEffect, useState } from 'react'
import { PageWrapper, PageHeader, PageLoading } from '@/components/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function {{PageName}}Page() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch data here
    setLoading(false)
  }, [])

  if (loading) {
    return <PageLoading message="Loading {{title}}..." />
  }

  return (
    <PageWrapper>
      <PageHeader
        title="{{Title}}"
        description="{{Description}}"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground">Description</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Section Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Section content goes here.</p>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  )
}`,
    description: 'Dashboard-style page with stats and content sections'
  },
  
  list: {
    template: `'use client'

import { useEffect, useState } from 'react'
import { PageWrapper, PageHeader, PageLoading } from '@/components/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function {{PageName}}Page() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch items here
    setLoading(false)
  }, [])

  const filteredItems = items.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <PageLoading message="Loading {{title}}..." />
  }

  return (
    <PageWrapper>
      <PageHeader
        title="{{Title}}"
        description="{{Description}}"
      />
      
      {/* Search */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search {{title}}..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-input border-border text-foreground"
          />
        </CardContent>
      </Card>
      
      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-foreground">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No items found.</p>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  )
}`,
    description: 'List page with search functionality'
  }
}

function generatePage(pageName, pageType = 'standard') {
  if (!pageName) {
    console.error('Error: Page name is required')
    console.log('Usage: npm run generate:page <pageName> [pageType]')
    console.log('Available page types:', Object.keys(pageTypes).join(', '))
    process.exit(1)
  }

  if (!pageTypes[pageType]) {
    console.error(`Error: Unknown page type '${pageType}'`)
    console.log('Available page types:', Object.keys(pageTypes).join(', '))
    process.exit(1)
  }

  const template = pageTypes[pageType]
  const pascalCaseName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
  const kebabCaseName = pageName.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  const titleCase = pascalCaseName.replace(/([A-Z])/g, ' $1').trim()

  // Replace template variables
  const content = template.template
    .replace(/{{PageName}}/g, pascalCaseName)
    .replace(/{{Title}}/g, titleCase)
    .replace(/{{title}}/g, titleCase.toLowerCase())
    .replace(/{{Description}}/g, `Manage and view ${titleCase.toLowerCase()}`)

  // Determine output path
  const outputPath = path.join(process.cwd(), 'app', kebabCaseName, 'page.tsx')
  const outputDir = path.dirname(outputPath)

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Write file
  if (fs.existsSync(outputPath)) {
    console.error(`Error: File already exists: ${outputPath}`)
    process.exit(1)
  }

  fs.writeFileSync(outputPath, content)
  
  console.log(`✅ Generated ${pageType} page: ${outputPath}`)
  console.log(`📖 Description: ${template.description}`)
  console.log('🎨 Style guide compliant: Uses solid backgrounds and theme colors')
  console.log(`🔍 Route: /${kebabCaseName}`)
}

// Run the generator
const [,, pageName, pageType] = process.argv
generatePage(pageName, pageType)
