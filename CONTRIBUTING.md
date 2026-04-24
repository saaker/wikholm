# Contributing Guide

## Branch Naming Convention

All branches should follow this format:

```
<type>/<number>-<short-description>
```

### Branch Types

- `feat/` - New features or enhancements
- `refactor/` - Code restructuring (no behavior change)
- `bugfix/` - Bug fixes
- `test/` - Test additions or updates
- `chore/` - Dependencies, config, tooling, maintenance
- `docs/` - Documentation changes

### Numbering

Use sequential numbers starting from 001. The number represents the order in which branches were created.

### Examples

```bash
feat/001-testing-infrastructure
refactor/002-component-file-structure
bugfix/003-mobile-header-layout
test/004-api-integration-tests
chore/005-update-dependencies
docs/006-api-documentation
```

## Development Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b feat/001-your-feature
   ```

2. **Make your changes** and commit regularly:
   ```bash
   git add .
   git commit -m "Add feature X"
   ```

3. **Push to remote**:
   ```bash
   git push -u origin feat/001-your-feature
   ```

4. **Create a Pull Request** on GitHub

5. **Merge to main** after review

## Commit Messages

Keep commits clear and descriptive:

```bash
# Good
git commit -m "Add CheckboxField component tests"
git commit -m "Refactor adminComponents into separate files"
git commit -m "Fix mobile navigation overflow"

# Avoid
git commit -m "fixes"
git commit -m "wip"
git commit -m "updates"
```

### Commit Message Format

```
<action> <what>

Examples:
- Add user authentication
- Fix header layout on mobile
- Refactor Card components into separate files
- Update dependencies
- Remove unused imports
```

### Co-Authoring with AI

When working with Claude Code or other AI assistants, optionally add:

```bash
git commit -m "Add comprehensive test coverage

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Testing

Run tests before committing:

```bash
npm test
```

For new features, add tests:
- Components → `ComponentName.test.tsx`
- Hooks → `useHookName.test.ts`
- Utils → `utilName.test.ts`

See [TESTING.md](TESTING.md) for details.

## Code Style

- **One component per file** - Keep files focused and navigable
- **Co-locate tests** - Place test files next to source files
- **Use TypeScript** - Leverage type safety
- **Keep it simple** - Don't over-engineer solutions
- **No unnecessary comments** - Code should be self-documenting

## Pull Request Guidelines

- Keep PRs focused on a single change
- Reference related issues if applicable
- Update documentation if needed
- Ensure all tests pass
- Request review if working in a team
