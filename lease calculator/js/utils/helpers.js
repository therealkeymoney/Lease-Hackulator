/**
 * Helper Utilities Module
 * Contains general utility functions used throughout the application
 */

import { STATES, EV_INCENTIVES, ZIP_TO_STATE } from '../data/constants.js';

/**
 * Safely gets a DOM element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - Element or null if not found
 */
export function safeGetElement(id) {
    try {
        return document.getElementById(id);
    } catch (error) {
        console.warn(`Element not found: ${id}`);
        return null;
    }
}

/**
 * Safely gets element value with fallback
 * @param {string} id - Element ID
 * @param {string} fallback - Fallback value
 * @returns {string} - Element value or fallback
 */
export function safeGetElementValue(id, fallback = '') {
    const element = safeGetElement(id);
    return element ? element.value : fallback;
}

/**
 * Safely sets element value with validation
 * @param {string} id - Element ID
 * @param {string|number} value - Value to set
 * @returns {boolean} - True if successful
 */
export function safeSetElementValue(id, value) {
    const element = safeGetElement(id);
    if (element) {
        element.value = value;
        return true;
    }
    return false;
}

/**
 * Safely sets element text content
 * @param {string} id - Element ID
 * @param {string} text - Text to set
 * @returns {boolean} - True if successful
 */
export function safeSetElementText(id, text) {
    const element = safeGetElement(id);
    if (element) {
        element.textContent = text;
        return true;
    }
    return false;
}

/**
 * Parses a numeric value with fallback
 * @param {string|number} value - Value to parse
 * @param {number} fallback - Fallback number
 * @returns {number} - Parsed number or fallback
 */
export function safeParseFloat(value, fallback = 0) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * Parses an integer value with fallback
 * @param {string|number} value - Value to parse
 * @param {number} fallback - Fallback number
 * @returns {number} - Parsed integer or fallback
 */
export function safeParseInt(value, fallback = 0) {
    const parsed = parseInt(value);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    } catch (error) {
        console.warn('Currency formatting failed:', error);
        return `$${amount.toLocaleString()}`;
    }
}

/**
 * Formats a number with commas
 * @param {number} number - Number to format
 * @returns {string} - Formatted number string
 */
export function formatNumber(number) {
    try {
        return number.toLocaleString();
    } catch (error) {
        console.warn('Number formatting failed:', error);
        return number.toString();
    }
}

/**
 * Debounces a function call
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
 * Gets state information by code
 * @param {string} stateCode - Two-letter state code
 * @returns {Object|null} - State object or null if not found
 */
export function getStateByCode(stateCode) {
    if (!stateCode) return null;
    
    return STATES.find(state => state.code === stateCode.toUpperCase()) || null;
}

/**
 * Looks up state by ZIP code with error handling
 * @param {string} zip - ZIP code to look up
 * @returns {string|null} - State code or null if not found
 */
export function lookupStateByZip(zip) {
    try {
        if (!zip || zip.length !== 5) return null;
        return ZIP_TO_STATE.lookup(zip);
    } catch (error) {
        console.warn('ZIP lookup failed:', error);
        return null;
    }
}

/**
 * Gets federal EV credit for a vehicle
 * @param {string} make - Vehicle make
 * @param {string} model - Vehicle model
 * @param {number} year - Vehicle year
 * @returns {number} - Federal credit amount
 */
export function getFederalEvCredit(make, model, year) {
    try {
        if (!make || !model) return 0;
        
        const makeKey = make.toLowerCase();
        const modelKey = model.toLowerCase();
        
        // Check in EV_INCENTIVES data
        const federalData = EV_INCENTIVES.federal.eligible;
        
        for (const [eligibleMake, models] of Object.entries(federalData)) {
            if (eligibleMake.toLowerCase() === makeKey) {
                for (const [eligibleModel, credit] of Object.entries(models)) {
                    if (eligibleModel.toLowerCase().includes(modelKey) || 
                        modelKey.includes(eligibleModel.toLowerCase())) {
                        return credit;
                    }
                }
            }
        }
        
        return 0;
    } catch (error) {
        console.warn('Federal credit lookup failed:', error);
        return 0;
    }
}

/**
 * Gets state EV incentives
 * @param {string} stateCode - Two-letter state code
 * @returns {Object} - State incentive information
 */
export function getStateEvIncentives(stateCode) {
    try {
        if (!stateCode) return { new: 0, used: 0, program: '' };
        
        const stateIncentive = EV_INCENTIVES.state[stateCode.toUpperCase()];
        
        if (stateIncentive) {
            return {
                new: stateIncentive.rebate || 0,
                used: Math.floor((stateIncentive.rebate || 0) * 0.5), // Assume used is 50% of new
                program: stateIncentive.program || ''
            };
        }
        
        return { new: 0, used: 0, program: '' };
    } catch (error) {
        console.warn('State incentive lookup failed:', error);
        return { new: 0, used: 0, program: '' };
    }
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export function validatePhone(phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
}

/**
 * Creates an option element for select dropdowns
 * @param {string} value - Option value
 * @param {string} text - Option display text
 * @param {boolean} selected - Whether option is selected
 * @returns {HTMLOptionElement} - Created option element
 */
export function createOption(value, text, selected = false) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    option.selected = selected;
    return option;
}

/**
 * Populates a select element with options
 * @param {string} selectId - Select element ID
 * @param {Array} options - Array of {value, text} objects
 * @param {string} defaultValue - Default selected value
 * @returns {boolean} - True if successful
 */
export function populateSelect(selectId, options, defaultValue = '') {
    const selectElement = safeGetElement(selectId);
    if (!selectElement) return false;
    
    try {
        // Clear existing options
        selectElement.innerHTML = '';
        
        // Add default option if needed
        if (!defaultValue) {
            selectElement.appendChild(createOption('', 'Select...'));
        }
        
        // Add options
        options.forEach(option => {
            const isSelected = option.value === defaultValue;
            selectElement.appendChild(createOption(option.value, option.text, isSelected));
        });
        
        return true;
    } catch (error) {
        console.error(`Failed to populate select ${selectId}:`, error);
        return false;
    }
}

/**
 * Logs function execution time for performance monitoring
 * @param {Function} func - Function to time
 * @param {string} name - Function name for logging
 * @returns {Function} - Wrapped function
 */
export function timeFunction(func, name) {
    return function(...args) {
        const start = performance.now();
        const result = func.apply(this, args);
        const end = performance.now();
        console.log(`${name} executed in ${(end - start).toFixed(2)}ms`);
        return result;
    };
}

/**
 * Maps old ID conventions to new HTML ID conventions
 * @param {string} fieldName - Field name (make, model, year, etc.)
 * @param {string} suffix - Suffix (A/B maps to 1/2)
 * @returns {string} - Mapped element ID
 */
export function mapElementId(fieldName, suffix) {
    // Convert A/B to 1/2 for compatibility
    const numericSuffix = suffix === 'A' ? '1' : suffix === 'B' ? '2' : suffix;
    
    // Map field names to HTML IDs
    const fieldMap = {
        'make': 'manufacturer',
        'model': 'model',
        'year': 'year',
        'msrp': 'msrp',
        'sellingPrice': 'capcost',
        'capCost': 'capcost',
        'term': 'term',
        'mileage': 'mileage',
        'residual': 'residual',
        'state': 'state',
        'taxRate': 'taxRate',
        'zip': 'zipCode',
        'vin': 'vin',
        'acq': 'acquisitionFee',
        'disp': 'dispositionFee',
        'credits': 'credits',
        'fedNew': 'fedNew',
        'stateNew': 'stateNewCredit',
        'stateUsed': 'stateUsedCredit'
    };
    
    const mappedField = fieldMap[fieldName] || fieldName;
    return `${mappedField}${numericSuffix}`;
}

/**
 * Safely gets a DOM element by ID with field mapping
 * @param {string} fieldName - Field name
 * @param {string} suffix - Form suffix
 * @returns {HTMLElement|null} - Element or null if not found
 */
export function safeGetMappedElement(fieldName, suffix) {
    const elementId = mapElementId(fieldName, suffix);
    return safeGetElement(elementId);
}

/**
 * Safely gets element value with field mapping
 * @param {string} fieldName - Field name
 * @param {string} suffix - Form suffix
 * @param {string} fallback - Fallback value
 * @returns {string} - Element value or fallback
 */
export function safeGetMappedElementValue(fieldName, suffix, fallback = '') {
    const element = safeGetMappedElement(fieldName, suffix);
    return element ? element.value : fallback;
}

/**
 * Safely sets element value with field mapping
 * @param {string} fieldName - Field name
 * @param {string} suffix - Form suffix
 * @param {string|number} value - Value to set
 * @returns {boolean} - True if successful
 */
export function safeSetMappedElementValue(fieldName, suffix, value) {
    const element = safeGetMappedElement(fieldName, suffix);
    if (element) {
        element.value = value;
        return true;
    }
    return false;
}

/**
 * Safely sets element text content with field mapping
 * @param {string} fieldName - Field name
 * @param {string} suffix - Form suffix
 * @param {string} text - Text to set
 * @returns {boolean} - True if successful
 */
export function safeSetMappedElementText(fieldName, suffix, text) {
    const element = safeGetMappedElement(fieldName, suffix);
    if (element) {
        element.textContent = text;
        return true;
    }
    return false;
}