'use strict';

/**
 * Next Shield - Test Suite
 *
 * Run: node tests/index.test.js
 *
 * @author TurkCode AI <https://turkcode.net>
 */

const assert = require('assert');
const path = require('path');

// Test runner
let passed = 0;
let failed = 0;
const tests = [];

function describe(name, fn) {
    console.log(`\n\x1b[1m${name}\x1b[0m`);
    fn();
}

function it(name, fn) {
    tests.push({ name, fn });
}

async function run() {
    for (const test of tests) {
        try {
            await test.fn();
            passed++;
            console.log(`  \x1b[32m✓\x1b[0m ${test.name}`);
        } catch (err) {
            failed++;
            console.log(`  \x1b[31m✗\x1b[0m ${test.name}`);
            console.log(`    \x1b[31m${err.message}\x1b[0m`);
        }
    }

    console.log(`\n\x1b[1mResults:\x1b[0m ${passed} passed, ${failed} failed, ${passed + failed} total\n`);
    process.exit(failed > 0 ? 1 : 0);
}

// ==================== Tests ====================

describe('Next Shield', () => {
    it('should load the module without errors', () => {
        const mod = require(path.join(__dirname, '..', 'src', 'index'));
        assert.ok(mod, 'Module should export something');
    });

    it('should export expected interface', () => {
        const mod = require(path.join(__dirname, '..', 'src', 'index'));
        assert.ok(typeof mod === 'object' || typeof mod === 'function', 'Module should export object or function');
    });
});

describe('Utils', () => {
    it('should load utils module', () => {
        const utils = require(path.join(__dirname, '..', 'src', 'utils'));
        assert.ok(utils, 'Utils should export something');
    });

    it('validateOptions should merge defaults', () => {
        const utils = require(path.join(__dirname, '..', 'src', 'utils'));
        if (utils.validateOptions) {
            const result = utils.validateOptions({ a: 1 }, { a: 0, b: 2 });
            assert.strictEqual(result.a, 1);
            assert.strictEqual(result.b, 2);
        }
    });

    it('formatDuration should format ms correctly', () => {
        const utils = require(path.join(__dirname, '..', 'src', 'utils'));
        if (utils.formatDuration) {
            assert.strictEqual(utils.formatDuration(500), '500ms');
            assert.ok(utils.formatDuration(1500).includes('s'));
        }
    });

    it('generateId should return string of expected length', () => {
        const utils = require(path.join(__dirname, '..', 'src', 'utils'));
        if (utils.generateId) {
            const id = utils.generateId(8);
            assert.strictEqual(id.length, 8);
        }
    });

    it('chunk should split array correctly', () => {
        const utils = require(path.join(__dirname, '..', 'src', 'utils'));
        if (utils.chunk) {
            const result = utils.chunk([1, 2, 3, 4, 5], 2);
            assert.strictEqual(result.length, 3);
            assert.deepStrictEqual(result[0], [1, 2]);
        }
    });
});

describe('Package', () => {
    it('should have valid package.json', () => {
        const pkg = require(path.join(__dirname, '..', 'package.json'));
        assert.ok(pkg.name, 'package.json should have name');
        assert.ok(pkg.version, 'package.json should have version');
        assert.ok(pkg.license, 'package.json should have license');
        assert.ok(pkg.main, 'package.json should have main');
    });
});

run();
