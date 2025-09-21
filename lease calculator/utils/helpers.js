/**
 * General Helper Utilities for Lease Hackulator
 * Contains reusable utility functions that can be used across the project
 */

/**
 * Format number as currency string
 * @param {number} amount - Amount to format
 * @param {boolean} showCents - Whether to show cents (default: true)
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount, showCents = true) {
    const num = Number(amount || 0);
    return showCents ? num.toFixed(2) : Math.round(num).toString();
}

/**
 * Format number with commas as thousands separator
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
export function formatNumber(num) {
    return Number(num || 0).toLocaleString();
}

/**
 * Validate ZIP code format
 * @param {string} zip - ZIP code to validate
 * @returns {boolean} - True if valid ZIP code format
 */
export function validateZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip.toString());
}

/**
 * Parse and clean numeric input
 * @param {string|number} value - Value to parse
 * @returns {number} - Parsed number or 0 if invalid
 */
export function parseNumericInput(value) {
    if (value === null || value === undefined || value === '') return 0;
    const num = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
}

/**
 * Calculate percentage
 * @param {number} value - Value to convert
 * @param {number} total - Total value
 * @returns {number} - Percentage value
 */
export function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

/**
 * Round to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} - Rounded number
 */
export function roundTo(num, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = deepClone(obj[key]);
        });
        return copy;
    }
}

/**
 * Check if value is empty (null, undefined, empty string, or whitespace)
 * @param {any} value - Value to check
 * @returns {boolean} - True if empty
 */
export function isEmpty(value) {
    return value === null || 
           value === undefined || 
           (typeof value === 'string' && value.trim() === '') ||
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0);
}

/**
 * Generate a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - Unique ID string
 */
export function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}