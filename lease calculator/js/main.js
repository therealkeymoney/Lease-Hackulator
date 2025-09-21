/**
 * Lease Hackulator Main Application
 * Orchestrates the initialization and coordination of all modules
 */

import { loadFederalCredits } from './utils/api.js';
import { initializeDropdowns } from './core/domUtils.js';
import { attachEventListeners } from './core/eventHandlers.js';
import { updateAllCalculations } from './core/calculations.js';
import { 
    FEES, 
    RESIDUAL_MATRIX, 
    STATES, 
    MONEY_FACTORS, 
    VIN_MAPPING, 
    EV_INCENTIVES, 
    ZIP_TO_STATE 
} from './data/constants.js';

/**
 * Application state
 */
const AppState = {
    isInitialized: false,
    isDualMode: false,
    federalCredits: [],
    stateCredits: {},
    initializationErrors: []
};

/**
 * Main application initialization
 */
async function initializeApplication() {
    console.log('🚀 Initializing Lease Hackulator...');
    
    try {
        // Show loading state
        showLoadingState(true);
        
        // Load external data with error handling
        await loadExternalData();
        
        // Initialize UI components
        const uiInitialized = initializeUserInterface();
        
        // Attach event listeners
        const listenersAttached = attachEventListeners();
        
        // Initialize default values
        initializeDefaultValues();
        
        // Verify initialization
        const initializationSuccessful = uiInitialized && listenersAttached;
        
        if (initializationSuccessful) {
            AppState.isInitialized = true;
            console.log('✅ Lease Hackulator initialized successfully');
            showInitializationStatus('success');
        } else {
            throw new Error('UI or event listener initialization failed');
        }
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        AppState.initializationErrors.push(error.message);
        showInitializationStatus('error', error.message);
    } finally {
        showLoadingState(false);
    }
}

/**
 * Loads external data sources
 */
async function loadExternalData() {
    console.log('Loading external data sources...');
    
    try {
        // Load federal tax credits with timeout
        const federalCreditsPromise = Promise.race([
            loadFederalCredits(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Federal credits timeout')), 10000)
            )
        ]);
        
        AppState.federalCredits = await federalCreditsPromise;
        console.log(`✓ Loaded ${AppState.federalCredits.length} federal credit records`);
        
    } catch (error) {
        console.warn('⚠️ Failed to load federal credits:', error);
        AppState.federalCredits = []; // Use fallback data built into the API module
    }
    
    // Initialize state credits (static data for now)
    AppState.stateCredits = EV_INCENTIVES.state;
    console.log('✓ State credits data loaded');
}

/**
 * Initializes user interface components
 */
function initializeUserInterface() {
    console.log('Initializing user interface...');
    
    try {
        // Initialize dropdown menus
        const dropdownsInitialized = initializeDropdowns();
        
        if (!dropdownsInitialized) {
            throw new Error('Dropdown initialization failed');
        }
        
        // Initialize mode toggle
        initializeModeToggle();
        
        // Initialize status indicators
        initializeStatusIndicators();
        
        console.log('✓ User interface initialized');
        return true;
        
    } catch (error) {
        console.error('UI initialization failed:', error);
        return false;
    }
}

/**
 * Initializes the dual/single mode toggle
 */
function initializeModeToggle() {
    const dualModeToggle = document.getElementById('dualModeToggle');
    
    if (dualModeToggle) {
        // Set initial state
        AppState.isDualMode = dualModeToggle.checked;
        
        // Show/hide vehicle B section based on initial state
        const vehicleBSection = document.getElementById('vehicleBSection');
        if (vehicleBSection) {
            vehicleBSection.style.display = AppState.isDualMode ? 'block' : 'none';
        }
        
        console.log(`✓ Mode toggle initialized: ${AppState.isDualMode ? 'Dual' : 'Single'} mode`);
    }
}

/**
 * Initializes status indicator elements
 */
function initializeStatusIndicators() {
    const suffixes = ['A', 'B'];
    
    suffixes.forEach(suffix => {
        // Create status indicators if they don't exist
        const statusIndicators = [
            { id: `vinStatus${suffix}`, class: 'vin-status' },
            { id: `apiStatus${suffix}`, class: 'api-status' },
            { id: `calcStatus${suffix}`, class: 'calc-status' }
        ];
        
        statusIndicators.forEach(indicator => {
            let element = document.getElementById(indicator.id);
            if (!element) {
                element = document.createElement('div');
                element.id = indicator.id;
                element.className = indicator.class;
                
                // Try to append to a logical parent element
                const parentElement = document.getElementById(`vehicle${suffix}Section`) ||
                                    document.getElementById(`form${suffix}`) ||
                                    document.body;
                
                if (parentElement) {
                    parentElement.appendChild(element);
                }
            }
        });
    });
    
    console.log('✓ Status indicators initialized');
}

/**
 * Initializes default values for form fields
 */
function initializeDefaultValues() {
    console.log('Setting default values...');
    
    try {
        const suffixes = ['1', '2']; // Use numbers to match HTML IDs
        
        suffixes.forEach(suffix => {
            // Only initialize if in dual mode or if it's vehicle 1
            if (suffix === '1' || AppState.isDualMode) {
                updateAllCalculations(suffix);
            }
        });
        
        console.log('✓ Default values initialized');
        
    } catch (error) {
        console.error('Failed to initialize default values:', error);
    }
}

/**
 * Shows/hides loading state
 */
function showLoadingState(loading) {
    const loadingElements = document.querySelectorAll('.loading-indicator');
    const mainContent = document.getElementById('mainContent');
    
    loadingElements.forEach(element => {
        element.style.display = loading ? 'block' : 'none';
    });
    
    if (mainContent) {
        mainContent.style.opacity = loading ? '0.5' : '1';
        mainContent.style.pointerEvents = loading ? 'none' : 'auto';
    }
}

/**
 * Shows initialization status to user
 */
function showInitializationStatus(status, message = '') {
    const statusElement = document.getElementById('initStatus');
    
    if (statusElement) {
        const statusConfig = {
            'success': {
                text: '✅ Lease Hackulator ready with live data and comprehensive features',
                class: 'status-success'
            },
            'error': {
                text: `❌ Initialization failed: ${message}`,
                class: 'status-error'
            },
            'warning': {
                text: `⚠️ Initialized with limited features: ${message}`,
                class: 'status-warning'
            }
        };
        
        const config = statusConfig[status] || statusConfig['error'];
        statusElement.textContent = config.text;
        statusElement.className = `init-status ${config.class}`;
        
        // Auto-hide success messages after 5 seconds
        if (status === 'success') {
            setTimeout(() => {
                statusElement.style.opacity = '0';
            }, 5000);
        }
    }
}

/**
 * Gets current application state
 */
function getApplicationState() {
    return {
        ...AppState,
        version: '2.0.0',
        timestamp: new Date().toISOString()
    };
}

/**
 * Global API for external access and debugging
 */
const LeaseHackulator = {
    // Core functions
    initialize: initializeApplication,
    getState: getApplicationState,
    
    // Data access
    getFees: () => FEES,
    getResidualMatrix: () => RESIDUAL_MATRIX,
    getStates: () => STATES,
    getMoneyFactors: () => MONEY_FACTORS,
    getVinMapping: () => VIN_MAPPING,
    getEvIncentives: () => EV_INCENTIVES,
    getZipToState: () => ZIP_TO_STATE,
    
    // Runtime data
    getFederalCredits: () => AppState.federalCredits,
    getStateCredits: () => AppState.stateCredits,
    
    // Utility functions
    updateCalculations: updateAllCalculations,
    
    // Version and debugging
    version: '2.0.0',
    debug: {
        state: () => AppState,
        errors: () => AppState.initializationErrors,
        performance: () => ({
            memory: performance.memory || {},
            navigation: performance.navigation || {},
            timing: performance.timing || {}
        })
    }
};

/**
 * DOM Content Loaded Event Handler
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, starting application...');
    
    // Initialize application
    await initializeApplication();
    
    // Make global API available
    window.LeaseHackulator = LeaseHackulator;
    
    // Development helpers
    if (process?.env?.NODE_ENV === 'development') {
        window.LeaseHackulatorDebug = LeaseHackulator.debug;
        console.log('🔧 Debug tools available: window.LeaseHackulatorDebug');
    }
});

/**
 * Error handling for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    AppState.initializationErrors.push(`Unhandled error: ${event.reason}`);
    event.preventDefault();
});

/**
 * Error handling for general errors
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    AppState.initializationErrors.push(`Global error: ${event.error?.message || 'Unknown error'}`);
});

// Export for module usage
export default LeaseHackulator;