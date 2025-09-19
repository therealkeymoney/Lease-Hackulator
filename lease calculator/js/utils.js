/**
 * Utility functions for the Lease Hackulator
 * Provides common functionality with robust error handling
 */

/**
 * Fetches JSON data with error handling and fallback
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {any} fallback - Fallback data if fetch fails
 * @returns {Promise<any>} The fetched JSON data or fallback
 */
async function fetchJSON(url, options = {}, fallback = null) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`Failed to fetch data from ${url}:`, error);
        
        if (fallback !== null) {
            console.log('Using fallback data');
            return fallback;
        }
        
        throw new Error(`Network request failed: ${error.message}`);
    }
}

/**
 * Converts XML string to JSON with error handling
 * @param {string} xmlStr - XML string to convert
 * @returns {Object|null} Parsed JSON object or null if parsing fails
 */
function xml2json(xmlStr) {
    try {
        if (!xmlStr || typeof xmlStr !== 'string') {
            throw new Error('Invalid XML string provided');
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlStr, 'application/xml');
        
        // Check for parsing errors
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
            throw new Error(`XML parsing error: ${errorNode.textContent}`);
        }
        
        function walk(node) {
            const obj = {};
            if (node.childNodes.length === 0) return node.textContent?.trim() || '';
            
            node.childNodes.forEach(child => {
                if (child.nodeType === 1) { // Element node
                    const key = child.nodeName;
                    const value = child.childNodes.length > 1 ? walk(child) : child.textContent?.trim() || '';
                    
                    if (obj[key]) {
                        // Convert to array if multiple elements with same name
                        obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
                        obj[key].push(value);
                    } else {
                        obj[key] = value;
                    }
                }
            });
            return obj;
        }
        
        return walk(doc.documentElement);
    } catch (error) {
        console.error('XML to JSON conversion failed:', error);
        return null;
    }
}

/**
 * Validates ZIP code format
 * @param {string|number} zip - ZIP code to validate
 * @returns {boolean} True if valid ZIP code format
 */
function validateZipCode(zip) {
    if (!zip) return false;
    const zipStr = zip.toString().trim();
    return /^\d{5}(-\d{4})?$/.test(zipStr);
}

/**
 * Normalizes ZIP code to 5-digit format
 * @param {string|number} zip - ZIP code to normalize
 * @returns {string} Normalized 5-digit ZIP code
 */
function normalizeZipCode(zip) {
    if (!zip) return '';
    const cleanZip = zip.toString().replace(/[^0-9]/g, '');
    return cleanZip.padStart(5, '0').substring(0, 5);
}

/**
 * Validates VIN format
 * @param {string} vin - VIN to validate
 * @returns {boolean} True if valid VIN format
 */
function validateVIN(vin) {
    if (!vin || typeof vin !== 'string') return false;
    const cleanVin = vin.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    return cleanVin.length === 17 && !/[IOQ]/.test(cleanVin);
}

/**
 * Caches DOM elements to improve performance
 */
class DOMCache {
    constructor() {
        this.cache = new Map();
    }
    
    get(selector) {
        if (!this.cache.has(selector)) {
            const element = document.querySelector(selector);
            this.cache.set(selector, element);
        }
        return this.cache.get(selector);
    }
    
    getElementById(id) {
        const selector = `#${id}`;
        return this.get(selector);
    }
    
    clear() {
        this.cache.clear();
    }
    
    refresh(selector) {
        this.cache.delete(selector);
        return this.get(selector);
    }
}

/**
 * Event listener management utility
 */
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    addListener(element, event, handler, options = {}) {
        if (!element) return;
        
        const key = `${element.id || element.tagName}-${event}`;
        
        // Remove existing listener if present
        this.removeListener(element, event);
        
        // Add new listener
        element.addEventListener(event, handler, options);
        this.listeners.set(key, { element, event, handler, options });
    }
    
    removeListener(element, event) {
        if (!element) return;
        
        const key = `${element.id || element.tagName}-${event}`;
        const existing = this.listeners.get(key);
        
        if (existing) {
            existing.element.removeEventListener(existing.event, existing.handler);
            this.listeners.delete(key);
        }
    }
    
    removeAll() {
        this.listeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.listeners.clear();
    }
}

/**
 * Configuration loader utility
 */
class ConfigLoader {
    constructor(basePath = './config/') {
        this.basePath = basePath;
        this.cache = new Map();
    }
    
    async load(filename, fallback = null) {
        if (this.cache.has(filename)) {
            return this.cache.get(filename);
        }
        
        try {
            const url = `${this.basePath}${filename}`;
            const data = await fetchJSON(url, {}, fallback);
            this.cache.set(filename, data);
            return data;
        } catch (error) {
            console.error(`Failed to load configuration ${filename}:`, error);
            if (fallback !== null) {
                this.cache.set(filename, fallback);
                return fallback;
            }
            throw error;
        }
    }
    
    get(filename) {
        return this.cache.get(filename);
    }
    
    clearCache() {
        this.cache.clear();
    }
}

/**
 * Debounce utility for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle utility for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Accessibility utility functions
 */
const AccessibilityUtils = {
    /**
     * Announces text to screen readers
     * @param {string} message - Message to announce
     * @param {string} priority - Priority level ('polite' or 'assertive')
     */
    announce(message, priority = 'polite') {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = message;
        
        document.body.appendChild(announcer);
        
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    },
    
    /**
     * Sets focus to element with proper management
     * @param {HTMLElement} element - Element to focus
     * @param {Object} options - Focus options
     */
    setFocus(element, options = {}) {
        if (!element) return;
        
        // Ensure element is focusable
        if (element.tabIndex === -1) {
            element.tabIndex = 0;
        }
        
        element.focus(options);
        
        // Announce focus change if requested
        if (options.announce) {
            this.announce(`Focused on ${element.getAttribute('aria-label') || element.textContent || 'element'}`);
        }
    },
    
    /**
     * Updates ARIA attributes for dynamic content
     * @param {HTMLElement} element - Element to update
     * @param {Object} attributes - ARIA attributes to set
     */
    updateARIA(element, attributes) {
        if (!element) return;
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key.startsWith('aria-') || key === 'role') {
                element.setAttribute(key, value);
            }
        });
    }
};

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchJSON,
        xml2json,
        validateZipCode,
        normalizeZipCode,
        validateVIN,
        DOMCache,
        EventManager,
        ConfigLoader,
        debounce,
        throttle,
        AccessibilityUtils
    };
} else {
    // Browser environment - attach to window
    window.LeaseHackulator = window.LeaseHackulator || {};
    Object.assign(window.LeaseHackulator, {
        fetchJSON,
        xml2json,
        validateZipCode,
        normalizeZipCode,
        validateVIN,
        DOMCache,
        EventManager,
        ConfigLoader,
        debounce,
        throttle,
        AccessibilityUtils
    });
}