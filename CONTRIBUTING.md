# Contributing to Next Shield

First off, thank you for considering contributing to **Next Shield**! Every contribution makes this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/next-shield.git
   cd next-shield
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a branch for your work:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

## Making Changes

1. Make your changes in a dedicated branch
2. Write or update tests as needed
3. Ensure all tests pass: `npm test`
4. Follow the existing code style
5. Write clear, descriptive commit messages

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug with input validation
docs: update API documentation
chore: update dependencies
refactor: simplify error handling logic
test: add unit tests for parser module
perf: optimize database query performance
```

## Pull Request Process

1. Update the README.md with details of changes (if applicable)
2. Update the CHANGELOG.md with a note about your change
3. Ensure CI checks pass
4. Request review from at least one maintainer
5. Your PR will be merged once approved

### PR Title Format

```
feat: short description of the change
fix: what was fixed
docs: what documentation was updated
```

## Style Guide

- **Indentation:** 2 spaces
- **Semicolons:** Required
- **Quotes:** Single quotes for strings
- **Trailing commas:** ES5 compatible
- **Line length:** Max 120 characters
- **Comments:** JSDoc for public APIs, inline for complex logic

### Example

```javascript
/**
 * Process input data and return structured results.
 * @param {Object} options - Configuration options
 * @param {string} options.input - Input data to process
 * @param {boolean} [options.verbose=false] - Enable verbose logging
 * @returns {Promise<Object>} Processed results
 */
async function processData(options) {
  const { input, verbose = false } = options;

  if (!input) {
    throw new Error('Input is required');
  }

  // Process the data
  const result = await transform(input);

  if (verbose) {
    console.log('Processing complete:', result.summary);
  }

  return result;
}
```

## Reporting Bugs

Use [GitHub Issues](https://github.com/turkcode-ai/next-shield/issues/new?template=bug_report.md) with the bug report template. Include:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version)
- Screenshots or logs (if applicable)

## Suggesting Features

Use [GitHub Issues](https://github.com/turkcode-ai/next-shield/issues/new?template=feature_request.md) with the feature request template. Include:

- Clear description of the feature
- Use case and motivation
- Proposed API or interface
- Alternatives considered

## Recognition

Contributors are recognized in:
- The project README
- Release notes for their contributions
- Our [contributors page](https://github.com/turkcode-ai/next-shield/graphs/contributors)

## Questions?

Feel free to open a [Discussion](https://github.com/turkcode-ai/next-shield/discussions) or reach out at info@turkcode.net.

---

**Thank you for contributing!** Your work helps make Next Shield better for the entire community.
