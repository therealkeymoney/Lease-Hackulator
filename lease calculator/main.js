/**
 * Main Entry Point for Lease Hackulator
 * Initializes and orchestrates the application components
 */

// Import all modules
import { 
    FEES, 
    RESIDUAL_MATRIX, 
    STATES, 
    MONEY_FACTORS, 
    VIN_MAPPING, 
    EV_INCENTIVES, 
    ZIP_TO_STATE,
    WMI_MAPPING,
    MAKES 
} from './data/constants.js';

import { 
    loadFederalCredits, 
    loadStateCredits 
} from './utils/api.js';

import { 
    getFederalCredit, 
    getStateCredit,
    setFederalCredits,
    setStateCredits 
} from './core/calculations.js';

import { 
    updateFees, 
    updateCapCost, 
    updateResidual, 
    updateTax, 
    updateEVCredits,
    initDropdowns 
} from './core/domUtils.js';

import { 
    attachListeners 
} from './core/eventHandlers.js';

/**
 * Load live incentive data from external APIs
 */
async function preloadIncentiveData() {
    try {
        // Load federal credits
        const federalCredits = await loadFederalCredits();
        setFederalCredits(federalCredits);
        
        // Load state credits  
        const stateCredits = await loadStateCredits();
        setStateCredits(stateCredits);
        
        console.log('Live incentive data loaded successfully');
    } catch (error) {
        console.warn('Failed to load live incentive data, using static fallback:', error);
        // Use static fallback data from constants
        setFederalCredits([]);
        setStateCredits(EV_INCENTIVES.state);
    }
}

/**
 * Initialize default form values
 */
function initializeDefaultValues() {
    ['A', 'B'].forEach(suffix => {
        updateCapCost(suffix);
        updateResidual(suffix);
        updateEVCredits(suffix);
    });
}

/**
 * Main application initialization
 */
async function initializeApp() {
    console.log('Initializing Lease Hackulator...');
    
    try {
        // Load live incentive data
        await preloadIncentiveData();
        console.log('Live incentive data loaded');
        
        // Initialize dropdowns
        initDropdowns();
        console.log('Dropdowns initialized');
        
        // Attach event listeners
        attachListeners();
        console.log('Event listeners attached');
        
        // Initialize default values
        initializeDefaultValues();
        console.log('Default values initialized');
        
        console.log('Lease Hackulator ready with live incentives, VIN decoding, and comprehensive data mapping');
        
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

// Initialize app when DOM is loaded
window.addEventListener('DOMContentLoaded', initializeApp);

// Global API for external access
window.LeaseHackulator = {
    // Core functions
    getFederalCredit,
    getStateCredit,
    updateFees,
    updateCapCost,
    updateResidual,
    updateTax,
    updateEVCredits,
    
    // Data constants
    FEES,
    RESIDUAL_MATRIX,
    STATES,
    MONEY_FACTORS,
    VIN_MAPPING,
    EV_INCENTIVES,
    ZIP_TO_STATE,
    WMI_MAPPING,
    MAKES,
    
    // Utility functions
    preloadIncentiveData,
    initDropdowns,
    attachListeners,
    initializeDefaultValues,
    
    // Reinitialize function for dynamic loading
    reinitialize: initializeApp
};