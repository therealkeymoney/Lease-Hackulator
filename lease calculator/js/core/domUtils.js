/**
 * DOM Utilities Module
 * Handles all DOM manipulation and form initialization
 */

import { MAKES, STATES } from '../data/constants.js';
import { populateSelect, createOption, safeGetElement } from '../utils/helpers.js';

/**
 * Initializes all dropdown menus
 * @returns {boolean} - True if initialization successful
 */
export function initializeDropdowns() {
    try {
        console.log('Initializing dropdown menus...');
        
        const makesInitialized = initializeMakeDropdowns();
        const statesInitialized = initializeStateDropdowns();
        const termMileageInitialized = initializeTermAndMileageDropdowns();
        
        const allInitialized = makesInitialized && statesInitialized && termMileageInitialized;
        
        if (allInitialized) {
            console.log('All dropdowns initialized successfully');
        } else {
            console.warn('Some dropdowns failed to initialize');
        }
        
        return allInitialized;
    } catch (error) {
        console.error('Failed to initialize dropdowns:', error);
        return false;
    }
}

/**
 * Initializes manufacturer dropdown menus
 * @returns {boolean} - True if successful
 */
function initializeMakeDropdowns() {
    try {
        const makeOptions = MAKES.map(make => ({ value: make, text: make }));
        
        const make1Initialized = populateSelect('manufacturer1', makeOptions);
        const make2Initialized = populateSelect('manufacturer2', makeOptions);
        
        if (make1Initialized && make2Initialized) {
            console.log(`Initialized make dropdowns with ${MAKES.length} options`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Failed to initialize make dropdowns:', error);
        return false;
    }
}

/**
 * Initializes state dropdown menus
 * @returns {boolean} - True if successful
 */
function initializeStateDropdowns() {
    try {
        const stateOptions = STATES.map(state => ({ 
            value: state.code, 
            text: state.name 
        }));
        
        const state1Initialized = populateSelect('state1', stateOptions);
        const state2Initialized = populateSelect('state2', stateOptions);
        
        if (state1Initialized && state2Initialized) {
            console.log(`Initialized state dropdowns with ${STATES.length} options`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Failed to initialize state dropdowns:', error);
        return false;
    }
}

/**
 * Initializes term and mileage dropdown menus
 * @returns {boolean} - True if successful
 */
function initializeTermAndMileageDropdowns() {
    try {
        // Term options (in months)
        const termOptions = [
            { value: '24', text: '24 months' },
            { value: '30', text: '30 months' },
            { value: '36', text: '36 months' },
            { value: '39', text: '39 months' },
            { value: '42', text: '42 months' },
            { value: '48', text: '48 months' }
        ];
        
        // Mileage options (annual)
        const mileageOptions = [
            { value: '10000', text: '10,000 miles/year' },
            { value: '12000', text: '12,000 miles/year' },
            { value: '15000', text: '15,000 miles/year' },
            { value: '18000', text: '18,000 miles/year' },
            { value: '20000', text: '20,000 miles/year' }
        ];
        
        const termAInitialized = populateSelect('termA', termOptions);
        const termBInitialized = populateSelect('termB', termOptions);
        const mileageAInitialized = populateSelect('mileageA', mileageOptions);
        const mileageBInitialized = populateSelect('mileageB', mileageOptions);
        
        const allInitialized = termAInitialized && termBInitialized && 
                              mileageAInitialized && mileageBInitialized;
        
        if (allInitialized) {
            console.log('Initialized term and mileage dropdowns');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Failed to initialize term and mileage dropdowns:', error);
        return false;
    }
}

/**
 * Creates and appends multiple options to a select element
 * @param {HTMLSelectElement} selectElement - The select element
 * @param {Array} options - Array of {value, text} objects
 * @param {string} defaultValue - Default selected value
 */
export function appendOptionsToSelect(selectElement, options, defaultValue = '') {
    if (!selectElement || !Array.isArray(options)) {
        console.warn('Invalid parameters for appendOptionsToSelect');
        return;
    }
    
    try {
        options.forEach(option => {
            const isSelected = option.value === defaultValue;
            const optionElement = createOption(option.value, option.text, isSelected);
            selectElement.appendChild(optionElement);
        });
    } catch (error) {
        console.error('Failed to append options to select:', error);
    }
}

/**
 * Clears all options from a select element
 * @param {string} selectId - Select element ID
 * @returns {boolean} - True if successful
 */
export function clearSelectOptions(selectId) {
    const selectElement = safeGetElement(selectId);
    if (!selectElement) {
        return false;
    }
    
    try {
        selectElement.innerHTML = '';
        return true;
    } catch (error) {
        console.error(`Failed to clear options for ${selectId}:`, error);
        return false;
    }
}

/**
 * Sets the selected value of a dropdown
 * @param {string} selectId - Select element ID
 * @param {string} value - Value to select
 * @returns {boolean} - True if successful
 */
export function setSelectValue(selectId, value) {
    const selectElement = safeGetElement(selectId);
    if (!selectElement) {
        return false;
    }
    
    try {
        selectElement.value = value;
        
        // Trigger change event if value was set successfully
        if (selectElement.value === value) {
            const changeEvent = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(changeEvent);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to set value for ${selectId}:`, error);
        return false;
    }
}

/**
 * Gets the selected option text from a dropdown
 * @param {string} selectId - Select element ID
 * @returns {string} - Selected option text or empty string
 */
export function getSelectedOptionText(selectId) {
    const selectElement = safeGetElement(selectId);
    if (!selectElement) {
        return '';
    }
    
    try {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        return selectedOption ? selectedOption.text : '';
    } catch (error) {
        console.error(`Failed to get selected option text for ${selectId}:`, error);
        return '';
    }
}

/**
 * Disables or enables a form element
 * @param {string} elementId - Element ID
 * @param {boolean} disabled - Whether to disable the element
 * @returns {boolean} - True if successful
 */
export function setElementDisabled(elementId, disabled) {
    const element = safeGetElement(elementId);
    if (!element) {
        return false;
    }
    
    try {
        element.disabled = disabled;
        
        // Add visual indication for disabled state
        if (disabled) {
            element.classList.add('disabled');
        } else {
            element.classList.remove('disabled');
        }
        
        return true;
    } catch (error) {
        console.error(`Failed to set disabled state for ${elementId}:`, error);
        return false;
    }
}

/**
 * Shows or hides an element
 * @param {string} elementId - Element ID
 * @param {boolean} visible - Whether to show the element
 * @returns {boolean} - True if successful
 */
export function setElementVisible(elementId, visible) {
    const element = safeGetElement(elementId);
    if (!element) {
        return false;
    }
    
    try {
        element.style.display = visible ? '' : 'none';
        return true;
    } catch (error) {
        console.error(`Failed to set visibility for ${elementId}:`, error);
        return false;
    }
}

/**
 * Adds a CSS class to an element
 * @param {string} elementId - Element ID
 * @param {string} className - CSS class name
 * @returns {boolean} - True if successful
 */
export function addElementClass(elementId, className) {
    const element = safeGetElement(elementId);
    if (!element) {
        return false;
    }
    
    try {
        element.classList.add(className);
        return true;
    } catch (error) {
        console.error(`Failed to add class ${className} to ${elementId}:`, error);
        return false;
    }
}

/**
 * Removes a CSS class from an element
 * @param {string} elementId - Element ID
 * @param {string} className - CSS class name
 * @returns {boolean} - True if successful
 */
export function removeElementClass(elementId, className) {
    const element = safeGetElement(elementId);
    if (!element) {
        return false;
    }
    
    try {
        element.classList.remove(className);
        return true;
    } catch (error) {
        console.error(`Failed to remove class ${className} from ${elementId}:`, error);
        return false;
    }
}

/**
 * Validates that all required form elements exist
 * @param {string} suffix - Form suffix (A or B)
 * @returns {Object} - Validation result with missing elements
 */
export function validateFormElements(suffix) {
    const requiredElements = [
        `make${suffix}`,
        `model${suffix}`,
        `year${suffix}`,
        `msrp${suffix}`,
        `sellingPrice${suffix}`,
        `term${suffix}`,
        `mileage${suffix}`,
        `state${suffix}`,
        `zip${suffix}`,
        `vin${suffix}`
    ];
    
    const missingElements = [];
    
    requiredElements.forEach(elementId => {
        if (!safeGetElement(elementId)) {
            missingElements.push(elementId);
        }
    });
    
    return {
        valid: missingElements.length === 0,
        missingElements: missingElements
    };
}

/**
 * Resets a form section to default values
 * @param {string} suffix - Form suffix (A or B)
 * @returns {boolean} - True if successful
 */
export function resetFormSection(suffix) {
    try {
        const elementsToReset = [
            `make${suffix}`,
            `model${suffix}`,
            `year${suffix}`,
            `msrp${suffix}`,
            `sellingPrice${suffix}`,
            `capCost${suffix}`,
            `term${suffix}`,
            `mileage${suffix}`,
            `residual${suffix}`,
            `state${suffix}`,
            `taxRate${suffix}`,
            `zip${suffix}`,
            `vin${suffix}`,
            `acq${suffix}`,
            `disp${suffix}`,
            `credits${suffix}`
        ];
        
        elementsToReset.forEach(elementId => {
            const element = safeGetElement(elementId);
            if (element) {
                if (element.tagName === 'SELECT') {
                    element.selectedIndex = 0;
                } else {
                    element.value = '';
                }
            }
        });
        
        // Reset display elements
        const displayElements = [
            `fedNew${suffix}`,
            `stateNew${suffix}`,
            `stateUsed${suffix}`
        ];
        
        displayElements.forEach(elementId => {
            const element = safeGetElement(elementId);
            if (element) {
                element.textContent = '$0';
            }
        });
        
        console.log(`Form section ${suffix} reset successfully`);
        return true;
        
    } catch (error) {
        console.error(`Failed to reset form section ${suffix}:`, error);
        return false;
    }
}