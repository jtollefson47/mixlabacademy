'use client'

import { PageWrapper, PageHeader } from '@/components/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestPagePage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Test Page"
        description="Manage and view test page"
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
}