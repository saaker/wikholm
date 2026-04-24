# Testing Guide

This project uses **Vitest** + **React Testing Library** for testing.

## Test Summary

**93 tests** across 7 test files covering:
- ✅ Pure functions (17 tests)
- ✅ Components (60 tests)
- ✅ Business logic (16 tests)

## Setup

Install test dependencies:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Files

Tests are co-located with source files using the `.test.ts` or `.test.tsx` extension:

**Pure Functions:**
- `app/components/utils/animationHelpers.test.ts` - Animation delay calculations

**Components:**
- `app/components/for-dentists/NewsCard.test.tsx` - NewsCard component
- `app/admin/SectionHeaderPreview.test.tsx` - Section header preview
- `app/admin/adminComponents.test.tsx` - Admin form components (CheckboxField, Field)

**Business Logic:**
- `app/admin/hooks/useContentEditor.test.ts` - Checkbox value transformation
- `app/admin/hooks/useContentEditor.integration.test.ts` - Hook integration with API
- `app/admin/CardsEditor.test.ts` - Card filtering and hide logic

## Test Coverage

Current test coverage includes:

### ✅ Pure Functions
- **animationHelpers.ts** - 100% coverage
  - Grid size calculations (2-col, 3-col, 4-col)
  - Edge cases (index 0, large indices)
  - Delay cap at delay-5

### ✅ Components
- **NewsCard.tsx** - Comprehensive coverage (15 tests)
  - Rendering in both languages (sv/en)
  - Conditional "Read more" link
  - Click handlers and keyboard navigation
  - Accessibility (tabIndex, ARIA, focus states)

- **SectionHeaderPreview.tsx** - Full coverage (13 tests)
  - Content rendering
  - Optional props
  - Styling classes
  - Real-world usage scenarios

- **CheckboxField** - Complete coverage (17 tests)
  - Boolean value rendering (checked/unchecked)
  - onChange with boolean values (not strings)
  - Label association and accessibility
  - Type safety verification

- **Field (text input)** - Complete coverage (15 tests)
  - Single-line and multiline modes
  - Controlled component behavior
  - Value changes and user input
  - Edge cases (empty, special characters, long text)

### ✅ Business Logic
- **Checkbox value transformation** - Unit tests (6 tests)
  - Boolean value handling (proper types)
  - Conversion to "true"/"false" strings for storage
  - Global setting (saves to both sv/en)

- **useContentEditor integration** - API integration tests (7 tests)
  - Loading: string → boolean conversion for checkboxes
  - Saving: boolean → string conversion for API
  - Checkbox saved to both languages (global setting)
  - Text fields saved to current language only
  - Error handling

- **Card filtering** - Hide functionality (10 tests)
  - Filter hidden cards
  - Handle undefined hidden property
  - Empty arrays
  - Type guard helper functions

## Writing Tests

### Example: Testing a pure function

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from './myFunction'

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction(input)).toBe(expectedOutput)
  })
})
```

### Example: Testing a component

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('should render content', () => {
    render(<MyComponent text="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Example: Testing user interactions

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyButton } from './MyButton'

describe('MyButton', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<MyButton onClick={handleClick} />)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Best Practices

1. **Co-locate tests** with source files
2. **Name tests descriptively** - describe behavior, not implementation
3. **Test behavior, not implementation** - test what the user sees/does
4. **Use Testing Library queries** - getByRole, getByText, etc.
5. **Avoid testing internal state** - test outputs and side effects
6. **Keep tests simple** - one assertion per test when possible
7. **Use beforeEach for common setup** - DRY principle

## CI Integration

Tests run automatically on:
- Every commit (via pre-commit hook - if configured)
- Pull requests
- Deployment builds

## Troubleshooting

### Tests fail with "Cannot find module"

Make sure you've installed all dependencies:
```bash
npm install
```

### TypeScript errors in tests

Check that `vitest/globals` is in your tsconfig:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

### Component tests fail with "document is not defined"

Make sure `vitest.config.ts` has:
```typescript
test: {
  environment: 'jsdom'
}
```
