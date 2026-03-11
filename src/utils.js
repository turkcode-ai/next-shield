'use strict';

/**
 * Next Shield - Utility Functions
 *
 * @author TurkCode AI <https://turkcode.net>
 * @license MIT
 * @see https://turkcode.net - High Quality Coding Resources
 */

/**
 * Validate input options and apply defaults
 * @param {Object} options - User provided options
 * @param {Object} defaults - Default values
 * @returns {Object} Merged options
 */
function validateOptions(options, defaults = {}) {
    if (typeof options !== 'object' || options === null) {
        throw new TypeError('Options must be a non-null object');
    }

    const merged = { ...defaults };
    for (const [key, value] of Object.entries(options)) {
        if (value !== undefined && value !== null) {
            merged[key] = value;
        }
    }

    return merged;
}

/**
 * Format duration in human-readable form
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration
 */
function formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

/**
 * Create a debounced version of a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @returns {Promise<*>} Result of the function
 */
async function retry(fn, options = {}) {
    const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = options;
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn(attempt);
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
                await new Promise(r => setTimeout(r, delay));
            }
        }
    }

    throw lastError;
}

/**
 * Deep clone an object (JSON-safe)
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Generate a short unique ID
 * @param {number} length - ID length
 * @returns {string} Random ID
 */
function generateId(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

/**
 * Chunk an array into smaller arrays
 * @param {Array} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array<Array>} Chunked arrays
 */
function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

module.exports = {
    validateOptions,
    formatDuration,
    debounce,
    retry,
    deepClone,
    generateId,
    chunk,
};
