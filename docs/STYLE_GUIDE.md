# Style Guide - Nonprofit Audio Learning Platform

## Overview
This style guide ensures consistent visual design across all pages and components. Our platform uses a retro 1950s theme with carefully chosen colors that provide excellent accessibility and user experience.

## Core Design Principles

### 1. Theme System
- **Primary Theme**: Retro 1950s aesthetic with modern usability
- **Color Scheme**: Light and dark mode support with system preference detection
- **Background Rule**: **NEVER use gradient backgrounds** - always use solid theme colors

### 2. Required Page Structure

Every page MUST follow this structure:

```tsx
export default function YourPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page content here */}
      </div>
    </div>
  )
}
```

### 3. Card Components

Always use solid card backgrounds:

```tsx
// ✅ CORRECT - Solid card background
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Content</p>
  </CardContent>
</Card>

// ❌ WRONG - Semi-transparent or gradient backgrounds
<Card className="bg-card/80 backdrop-blur border-border/20">
<Card className="bg-gradient-to-br from-cyan-200 via-yellow-100 to-pink-200">
```

### 4. Color Usage

#### Background Colors
- **Page backgrounds**: Always use `bg-background`
- **Card backgrounds**: Always use `bg-card`
- **Input backgrounds**: Always use `bg-input`
- **Muted areas**: Use `bg-muted`

#### Text Colors
- **Primary text**: `text-foreground`
- **Secondary text**: `text-muted-foreground`
- **Card text**: `text-card-foreground`
- **Interactive elements**: `text-primary` for links and buttons

#### Border Colors
- **Default borders**: `border-border`
- **Input borders**: `border-input`
- **Focus rings**: `ring-primary`

### 5. Theme Variables

Our theme uses these CSS variables (DO NOT modify):

```css
/* Light Mode */
--background: 0, 0%, 100%        /* Pure white */
--foreground: 0, 0%, 15%         /* Dark text */
--card: 0, 0%, 100%              /* White cards */
--card-foreground: 0, 0%, 15%    /* Dark text on cards */
--primary: 195, 100%, 45%        /* Retro blue */
--secondary: 50, 100%, 85%       /* Light cream */
--accent: 345, 100%, 55%         /* Retro pink */

/* Dark Mode */
--background: 220, 40%, 8%       /* Dark blue background */
--foreground: 50, 30%, 90%       /* Light cream text */
--card: 220, 35%, 12%            /* Dark blue cards */
--card-foreground: 50, 30%, 90%  /* Light text on cards */
```

## Forbidden Practices

### ❌ NEVER Use These:
1. Gradient backgrounds (`bg-gradient-*`)
2. Semi-transparent cards (`bg-card/80`, `backdrop-blur`)
3. Hard-coded colors (use theme variables only)
4. Missing `min-h-screen bg-background` wrapper
5. Inconsistent container structure

### ❌ Examples of What NOT to Do:
```tsx
// Don't use gradients
<div className="bg-gradient-to-br from-cyan-200 to-pink-200">

// Don't use semi-transparent cards
<Card className="bg-card/80 backdrop-blur">

// Don't use hard-coded colors
<div className="bg-white dark:bg-gray-900">

// Don't skip the page wrapper
<div className="container mx-auto"> // Missing min-h-screen bg-background
```

## Component Templates

### Page Template
```tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TemplatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Page Title</h1>
          <p className="text-muted-foreground">Page description</p>
        </div>

        {/* Content Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Card content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

### Loading State Template
```tsx
if (loading) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
}
```

## Accessibility Requirements

1. **Contrast**: All color combinations meet WCAG AA standards
2. **Focus**: Use `focus-ring` class for keyboard navigation
3. **Screen readers**: Use semantic HTML and proper ARIA labels
4. **Motion**: Respect `prefers-reduced-motion` settings

## Code Review Checklist

Before merging any page or component:

- [ ] Uses `min-h-screen bg-background` wrapper
- [ ] Uses solid card backgrounds (`bg-card`)
- [ ] Uses theme color classes (no hard-coded colors)
- [ ] No gradient backgrounds anywhere
- [ ] Proper semantic HTML structure
- [ ] Consistent spacing and typography
- [ ] Loading states follow template
- [ ] Dark mode compatibility tested

## Enforcement

This style guide is enforced through:
1. ESLint rules (see `.eslintrc.js`)
2. Component templates
3. Code review requirements
4. Automated testing

## Questions?

If you're unsure about styling decisions, refer to existing pages:
- `app/dashboard/page.tsx` - Good example of page structure
- `app/profile/page.tsx` - Good example of card layouts
- `app/community/page.tsx` - Good example of grid layouts

For questions, consult this guide or ask the team lead.
