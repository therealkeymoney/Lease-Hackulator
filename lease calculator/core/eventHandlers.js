/**
 * Event Handler Management for Lease Hackulator
 * Manages event listener logic for handling user interactions
 */

import { ZIP_TO_STATE } from '../data/constants.js';
import { updateFees, updateCapCost, updateResidual, updateTax, updateEVCredits } from './domUtils.js';
import { decodeVINFromAPI } from '../utils/api.js';

/**
 * Decode VIN and update form fields
 * @param {string} vin - Vehicle Identification Number
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
async function decodeVIN(vin, suffix) {
    if (!vin || vin.length !== 17) return;
    
    try {
        const vehicleInfo = await decodeVINFromAPI(vin);
        
        // Update form fields
        if (vehicleInfo.make) {
            const makeEl = document.getElementById(`make${suffix}`);
            if (makeEl) makeEl.value = vehicleInfo.make;
        }
        if (vehicleInfo.model) {
            const modelEl = document.getElementById(`model${suffix}`);
            if (modelEl) modelEl.value = vehicleInfo.model;
        }
        if (vehicleInfo.year) {
            const yearEl = document.getElementById(`year${suffix}`);
            if (yearEl) yearEl.value = vehicleInfo.year;
        }
        
        // Update dependent fields
        updateFees(suffix);
        updateEVCredits(suffix);
        
    } catch (error) {
        console.warn('VIN decode failed:', error);
    }
}

/**
 * Handle ZIP code input and auto-populate state
 * @param {Event} event - Input event
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
async function handleZipInput(event, suffix) {
    const zip = event.target.value;
    if (zip.length === 5) {
        try {
            const stateCode = ZIP_TO_STATE.lookup(zip);
            if (stateCode) {
                const stateEl = document.getElementById(`state${suffix}`);
                if (stateEl) {
                    stateEl.value = stateCode;
                    updateTax(suffix);
                    updateEVCredits(suffix);
                }
            }
        } catch (error) {
            console.warn('ZIP lookup failed:', error);
        }
    }
}

/**
 * Handle make selection change
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
function handleMakeChange(suffix) {
    updateFees(suffix);
    updateEVCredits(suffix);
}

/**
 * Handle state selection change
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
function handleStateChange(suffix) {
    updateTax(suffix);
    updateEVCredits(suffix);
}

/**
 * Attach all event listeners to form elements
 */
export function attachListeners() {
    ['A', 'B'].forEach(suffix => {
        // MSRP and selling price listeners
        const msrpEl = document.getElementById(`msrp${suffix}`);
        const sellEl = document.getElementById(`sellingPrice${suffix}`);
        if (msrpEl) msrpEl.addEventListener('input', () => updateCapCost(suffix));
        if (sellEl) sellEl.addEventListener('input', () => updateCapCost(suffix));
        
        // Term and mileage listeners
        const termEl = document.getElementById(`term${suffix}`);
        const mileEl = document.getElementById(`mileage${suffix}`);
        if (termEl) termEl.addEventListener('change', () => updateResidual(suffix));
        if (mileEl) mileEl.addEventListener('change', () => updateResidual(suffix));
        
        // Make listener
        const makeEl = document.getElementById(`make${suffix}`);
        if (makeEl) makeEl.addEventListener('change', () => handleMakeChange(suffix));
        
        // Model and year listeners
        const modelEl = document.getElementById(`model${suffix}`);
        const yearEl = document.getElementById(`year${suffix}`);
        if (modelEl) modelEl.addEventListener('change', () => updateEVCredits(suffix));
        if (yearEl) yearEl.addEventListener('change', () => updateEVCredits(suffix));
        
        // State listener
        const stateEl = document.getElementById(`state${suffix}`);
        if (stateEl) stateEl.addEventListener('change', () => handleStateChange(suffix));
        
        // ZIP code listener
        const zipEl = document.getElementById(`zip${suffix}`);
        if (zipEl) zipEl.addEventListener('blur', (e) => handleZipInput(e, suffix));
        
        // VIN listener
        const vinEl = document.getElementById(`vin${suffix}`);
        if (vinEl) vinEl.addEventListener('blur', (e) => decodeVIN(e.target.value, suffix));
    });
}

/**
 * Remove all event listeners (for cleanup)
 */
export function detachListeners() {
    ['A', 'B'].forEach(suffix => {
        const elements = [
            `msrp${suffix}`, `sellingPrice${suffix}`, `term${suffix}`, `mileage${suffix}`,
            `make${suffix}`, `model${suffix}`, `year${suffix}`, `state${suffix}`,
            `zip${suffix}`, `vin${suffix}`
        ];
        
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // Clone element to remove all event listeners
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
            }
        });
    });
}

/**
 * Add custom event listener with automatic cleanup
 * @param {string} elementId - Element ID
 * @param {string} eventType - Event type (e.g., 'click', 'change')
 * @param {Function} handler - Event handler function
 */
export function addEventListenerWithCleanup(elementId, eventType, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(eventType, handler);
        
        // Store reference for potential cleanup
        if (!element._eventHandlers) element._eventHandlers = [];
        element._eventHandlers.push({ type: eventType, handler });
    }
}

/**
 * Remove specific event listener
 * @param {string} elementId - Element ID
 * @param {string} eventType - Event type
 * @param {Function} handler - Event handler function
 */
export function removeEventListener(elementId, eventType, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.removeEventListener(eventType, handler);
    }
}