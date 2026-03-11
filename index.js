#!/usr/bin/env node
'use strict';

/**
 * Next Shield
 * One-line security and authentication layer for Next.js applications with built-in CSRF and XSS protection
 *
 * @author TurkCode AI <https://turkcode.net>
 * @license MIT
 * @see https://turkcode.net - High Quality Coding Resources
 */

module.exports = require('./src/index');

// CLI mode
if (require.main === module) {
    require('./src/index');
}
