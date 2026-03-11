# Next Shield - API Reference

> Complete API documentation for `next-shield`

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Methods](#api-methods)
- [Configuration](#configuration)
- [CLI Usage](#cli-usage)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)

## Installation

```bash
# npm
npm install next-shield

# yarn
yarn add next-shield

# pnpm
pnpm add next-shield
```

## Quick Start

```javascript
const nextShield = require('next-shield');

// Basic usage
const result = await nextShield.run({
  // your options here
});

console.log(result);
```

## API Methods

### `run(options)`

Main entry point for Next Shield.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | `string|object` | required | Input data to process |
| `verbose` | `boolean` | `false` | Enable verbose logging |
| `output` | `string` | `'json'` | Output format (json, text, table) |
| `timeout` | `number` | `30000` | Timeout in milliseconds |

**Returns:** `Promise<Object>` - Processing results

**Example:**

```javascript
const result = await nextShield.run({
  input: 'example data',
  verbose: true,
  output: 'json',
});
```

## Configuration

Configuration can be provided via:

1. **Constructor options** (highest priority)
2. **Environment variables**
3. **Config file** (`.nextrc.json`)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_SHIELD_DEBUG` | Enable debug mode | `false` |
| `NEXT_SHIELD_TIMEOUT` | Default timeout (ms) | `30000` |

## CLI Usage

```bash
# Show help
npx next-shield --help

# Run with input
npx next-shield --input "data" --verbose

# Output as JSON
npx next-shield --input "data" --output json

# Pipe support
echo "data" | npx next-shield
```

### CLI Flags

| Flag | Alias | Description |
|------|-------|-------------|
| `--help` | `-h` | Show help message |
| `--version` | `-v` | Show version |
| `--input` | `-i` | Input data |
| `--output` | `-o` | Output format |
| `--verbose` | | Enable verbose output |
| `--json` | | Output as JSON |
| `--benchmark` | | Run benchmark mode |

## Error Handling

```javascript
try {
  const result = await nextShield.run({ input: 'test' });
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    console.error('Invalid input:', error.message);
  } else if (error.code === 'TIMEOUT') {
    console.error('Operation timed out');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Support

Type definitions are included:

```typescript
import nextShield from 'next-shield';

interface Options {
  input: string | object;
  verbose?: boolean;
  output?: 'json' | 'text' | 'table';
  timeout?: number;
}

const result: Result = await nextShield.run(options);
```

---

*Powered by [TurkCode.NET](https://turkcode.net) - High Quality Coding Resources*
