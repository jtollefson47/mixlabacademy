# Accessibility Testing with Lighthouse

This project includes automated accessibility testing using Playwright and Lighthouse to ensure our pages meet WCAG standards.

## Running Accessibility Tests

```bash
# Run all accessibility tests (Chromium only)
pnpm test:a11y

# Run all E2E tests including accessibility
pnpm test:e2e

# Run accessibility tests with specific project
pnpm playwright test tests/e2e/accessibility.spec.ts --project=chromium
```

## What Gets Tested

The accessibility tests check:

1. **Lighthouse Accessibility Score**: Each page must score ≥95/100
2. **Skip Links**: Presence and functionality of skip-to-content links
3. **Semantic Landmarks**: Proper use of main, header, section elements
4. **Image Alt Text**: All images have appropriate alternative text
5. **Button Labels**: All interactive elements have accessible names
6. **Heading Structure**: Proper heading hierarchy (h1-h6)

## Test Coverage

- **Home Page** (`/`) - Main landing page accessibility
- **Games Page** (`/games`) - Games catalog accessibility  
- **EQ Match Page** (`/games/eq-match`) - Game page accessibility

## Lighthouse Configuration

The tests use Lighthouse with the following configuration:
- **Categories**: Accessibility only
- **Form Factor**: Desktop
- **Viewport**: 1350x940
- **Browser**: Chromium (required for Lighthouse integration)

## Minimum Requirements

- Lighthouse Accessibility Score: **95/100**
- All WCAG 2.1 AA standards must be met
- Zero critical accessibility violations

## Test Output

When tests pass:
```
✓ Home page meets accessibility standards (Lighthouse score >= 95)
Accessibility score for Home page: 98/100
```

When tests fail:
```
✗ Home page meets accessibility standards (Lighthouse score >= 95)
Accessibility score: 87/100 (minimum required: 95)
Violations: 2
- Images must have alternate text (missing-alt-text)
  Help: https://web.dev/missing-alt-text/
```

## Continuous Integration

The accessibility tests are included in the standard E2E test suite and will run on every pull request to ensure accessibility standards are maintained.
