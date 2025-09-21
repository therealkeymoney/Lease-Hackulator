/**
 * DOM Utility Functions for Lease Hackulator
 * Provides utility functions for DOM manipulation and form updates
 */

import { FEES, RESIDUAL_MATRIX, STATES, MAKES } from '../data/constants.js';
import { getFederalCredit, getStateCredit } from './calculations.js';

/**
 * Update fees display based on selected manufacturer
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
export function updateFees(suffix) {
    const makeEl = document.getElementById(`make${suffix}`);
    const acqEl = document.getElementById(`acq${suffix}`);
    const dispEl = document.getElementById(`disp${suffix}`);
    
    if (makeEl && acqEl && dispEl) {
        const make = makeEl.value;
        if (FEES[make]) {
            acqEl.value = FEES[make].acq;
            dispEl.value = FEES[make].disp;
        }
    }
}

/**
 * Update capitalized cost calculation
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
export function updateCapCost(suffix) {
    const msrpEl = document.getElementById(`msrp${suffix}`);
    const sellEl = document.getElementById(`sellingPrice${suffix}`);
    const capEl = document.getElementById(`capCost${suffix}`);
    
    if (msrpEl && sellEl && capEl) {
        const msrp = parseFloat(msrpEl.value) || 0;
        const sell = parseFloat(sellEl.value) || 0;
        if (msrp > 0) {
            capEl.value = ((sell / msrp) * 100).toFixed(2);
        }
    }
}

/**
 * Update residual value based on term and mileage
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
export function updateResidual(suffix) {
    const termEl = document.getElementById(`term${suffix}`);
    const mileEl = document.getElementById(`mileage${suffix}`);
    const resEl = document.getElementById(`residual${suffix}`);
    
    if (termEl && mileEl && resEl) {
        const term = termEl.value;
        const mile = mileEl.value;
        if (RESIDUAL_MATRIX[term] && RESIDUAL_MATRIX[term][mile]) {
            resEl.value = RESIDUAL_MATRIX[term][mile];
        }
    }
}

/**
 * Update tax rate based on selected state
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
export function updateTax(suffix) {
    const stateEl = document.getElementById(`state${suffix}`);
    const taxEl = document.getElementById(`taxRate${suffix}`);
    
    if (stateEl && taxEl) {
        const stateCode = stateEl.value;
        const state = STATES.find(s => s.code === stateCode);
        if (state) {
            taxEl.value = state.tax;
        }
    }
}

/**
 * Update EV credits display
 * @param {string} suffix - Form suffix (e.g., 'A' or 'B')
 */
export function updateEVCredits(suffix) {
    const make = document.getElementById(`make${suffix}`)?.value || '';
    const model = document.getElementById(`model${suffix}`)?.value || '';
    const year = parseInt(document.getElementById(`year${suffix}`)?.value) || 0;
    const state = document.getElementById(`state${suffix}`)?.value || '';
    
    const federalCredit = getFederalCredit(make, model, year);
    const stateCredit = getStateCredit(state);
    
    // Update display elements
    const fedNewEl = document.getElementById(`fedNew${suffix}`);
    const stateNewEl = document.getElementById(`stateNew${suffix}`);
    const stateUsedEl = document.getElementById(`stateUsed${suffix}`);
    const creditsEl = document.getElementById(`credits${suffix}`);
    
    if (fedNewEl) fedNewEl.textContent = `$${federalCredit.toLocaleString()}`;
    if (stateNewEl) stateNewEl.textContent = `$${stateCredit.new.toLocaleString()}`;
    if (stateUsedEl) stateUsedEl.textContent = `$${stateCredit.used.toLocaleString()}`;
    if (creditsEl) creditsEl.value = federalCredit + stateCredit.new;
}

/**
 * Initialize dropdown options
 */
export function initDropdowns() {
    // Initialize make dropdowns
    const makeSelects = [document.getElementById('makeA'), document.getElementById('makeB')];
    makeSelects.forEach(select => {
        if (select) {
            // Clear existing options
            select.innerHTML = '<option value="">Select Make</option>';
            
            // Add manufacturer options
            MAKES.forEach(make => {
                const option = document.createElement('option');
                option.value = make;
                option.textContent = make;
                select.appendChild(option);
            });
        }
    });

    // Initialize state dropdowns
    const stateSelects = [document.getElementById('stateA'), document.getElementById('stateB')];
    stateSelects.forEach(select => {
        if (select) {
            // Clear existing options
            select.innerHTML = '<option value="">Select State</option>';
            
            // Add state options
            STATES.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = `${state.name} (${state.code})`;
                select.appendChild(option);
            });
        }
    });
}

/**
 * Get element value by ID
 * @param {string} id - Element ID
 * @returns {string} - Element value or empty string
 */
export function getElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

/**
 * Set element value by ID
 * @param {string} id - Element ID
 * @param {string} value - Value to set
 */
export function setElementValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

/**
 * Set element text content by ID
 * @param {string} id - Element ID
 * @param {string} text - Text to set
 */
export function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

/**
 * Show or hide element by ID
 * @param {string} id - Element ID
 * @param {boolean} show - Whether to show the element
 */
export function toggleElement(id, show) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

/**
 * Add CSS class to element
 * @param {string} id - Element ID
 * @param {string} className - CSS class name
 */
export function addClass(id, className) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove CSS class from element
 * @param {string} id - Element ID
 * @param {string} className - CSS class name
 */
export function removeClass(id, className) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove(className);
    }
}