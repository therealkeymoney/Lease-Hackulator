/**
 * Event Handlers Module
 * Manages all event listeners and user interactions
 */

import { decodeVINAPI } from '../utils/api.js';
import { 
    updateFees, 
    updateCapitalizedCost, 
    updateResidualValue, 
    updateTaxRate, 
    updateEvCredits,
    updateAllCalculations
} from './calculations.js';
import { setSelectValue } from './domUtils.js';
import { 
    safeGetElement, 
    safeGetMappedElement,
    lookupStateByZip, 
    debounce,
    safeGetElementValue 
} from '../utils/helpers.js';

/**
 * Creates and attaches all event listeners
 * @returns {boolean} - True if successful
 */
export function attachEventListeners() {
    try {
        console.log('Attaching event listeners...');
        
        const suffixes = ['1', '2']; // Use numbers to match HTML IDs
        let listenersAttached = 0;
        
        suffixes.forEach(suffix => {
            const attached = attachVehicleEventListeners(suffix);
            if (attached) {
                listenersAttached++;
            }
        });
        
        // Attach global event listeners
        attachGlobalEventListeners();
        
        const allAttached = listenersAttached === suffixes.length;
        
        if (allAttached) {
            console.log('All event listeners attached successfully');
        } else {
            console.warn('Some event listeners failed to attach');
        }
        
        return allAttached;
    } catch (error) {
        console.error('Failed to attach event listeners:', error);
        return false;
    }
}

/**
 * Attaches event listeners for a single vehicle form
 * @param {string} suffix - Form suffix (A or B)
 * @returns {boolean} - True if successful
 */
function attachVehicleEventListeners(suffix) {
    try {
        console.log(`Attaching event listeners for vehicle ${suffix}`);
        
        // MSRP and selling price listeners for cap cost calculation
        attachPriceListeners(suffix);
        
        // Term and mileage listeners for residual calculation
        attachTermMileageListeners(suffix);
        
        // Make listener for fees and credits
        attachMakeListener(suffix);
        
        // Model and year listeners for credits
        attachModelYearListeners(suffix);
        
        // State listener for tax and credits
        attachStateListener(suffix);
        
        // ZIP code listener for state lookup
        attachZipListener(suffix);
        
        // VIN listener for vehicle decoding
        attachVinListener(suffix);
        
        return true;
    } catch (error) {
        console.error(`Failed to attach listeners for vehicle ${suffix}:`, error);
        return false;
    }
}

/**
 * Attaches price-related event listeners
 * @param {string} suffix - Form suffix
 */
function attachPriceListeners(suffix) {
    const msrpElement = safeGetMappedElement('msrp', suffix);
    const sellingPriceElement = safeGetMappedElement('sellingPrice', suffix);
    
    if (msrpElement) {
        const debouncedUpdate = debounce(() => updateCapitalizedCost(suffix), 300);
        msrpElement.addEventListener('input', debouncedUpdate);
        msrpElement.addEventListener('blur', () => updateCapitalizedCost(suffix));
    } else {
        console.warn(`MSRP field not found for vehicle ${suffix}`);
    }
    
    if (sellingPriceElement) {
        const debouncedUpdate = debounce(() => updateCapitalizedCost(suffix), 300);
        sellingPriceElement.addEventListener('input', debouncedUpdate);
        sellingPriceElement.addEventListener('blur', () => updateCapitalizedCost(suffix));
    } else {
        console.warn(`Selling price field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches term and mileage event listeners
 * @param {string} suffix - Form suffix
 */
function attachTermMileageListeners(suffix) {
    const termElement = safeGetMappedElement('term', suffix);
    const mileageElement = safeGetMappedElement('mileage', suffix);
    
    if (termElement) {
        termElement.addEventListener('change', () => {
            updateResidualValue(suffix);
            updateAllCalculations(suffix);
        });
    } else {
        console.warn(`Term field not found for vehicle ${suffix}`);
    }
    
    if (mileageElement) {
        mileageElement.addEventListener('change', () => {
            updateResidualValue(suffix);
            updateAllCalculations(suffix);
        });
    } else {
        console.warn(`Mileage field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches make selection event listener
 * @param {string} suffix - Form suffix
 */
function attachMakeListener(suffix) {
    const makeElement = safeGetMappedElement('make', suffix);
    
    if (makeElement) {
        makeElement.addEventListener('change', () => {
            updateFees(suffix);
            updateEvCredits(suffix);
        });
    } else {
        console.warn(`Make field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches model and year event listeners
 * @param {string} suffix - Form suffix
 */
function attachModelYearListeners(suffix) {
    const modelElement = safeGetMappedElement('model', suffix);
    const yearElement = safeGetMappedElement('year', suffix);
    
    if (modelElement) {
        const debouncedUpdate = debounce(() => updateEvCredits(suffix), 500);
        modelElement.addEventListener('input', debouncedUpdate);
        modelElement.addEventListener('blur', () => updateEvCredits(suffix));
    } else {
        console.warn(`Model field not found for vehicle ${suffix}`);
    }
    
    if (yearElement) {
        yearElement.addEventListener('change', () => updateEvCredits(suffix));
        yearElement.addEventListener('input', () => updateEvCredits(suffix));
    } else {
        console.warn(`Year field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches state selection event listener
 * @param {string} suffix - Form suffix
 */
function attachStateListener(suffix) {
    const stateElement = safeGetMappedElement('state', suffix);
    
    if (stateElement) {
        stateElement.addEventListener('change', () => {
            updateTaxRate(suffix);
            updateEvCredits(suffix);
        });
    } else {
        console.warn(`State field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches ZIP code event listener with state lookup
 * @param {string} suffix - Form suffix
 */
function attachZipListener(suffix) {
    const zipElement = safeGetMappedElement('zip', suffix);
    
    if (zipElement) {
        const handleZipChange = async () => {
            const zip = zipElement.value.trim();
            
            if (zip.length === 5) {
                try {
                    const stateCode = lookupStateByZip(zip);
                    
                    if (stateCode) {
                        const stateSet = setSelectValue(`state${suffix}`, stateCode);
                        
                        if (stateSet) {
                            updateTaxRate(suffix);
                            updateEvCredits(suffix);
                            console.log(`Auto-filled state ${stateCode} for ZIP ${zip}`);
                        }
                    } else {
                        console.warn(`No state found for ZIP code: ${zip}`);
                    }
                } catch (error) {
                    console.error('ZIP lookup failed:', error);
                }
            }
        };
        
        const debouncedZipLookup = debounce(handleZipChange, 500);
        zipElement.addEventListener('input', debouncedZipLookup);
        zipElement.addEventListener('blur', handleZipChange);
    } else {
        console.warn(`ZIP field not found for vehicle ${suffix}`);
    }
}

/**
 * Attaches VIN decoding event listener
 * @param {string} suffix - Form suffix
 */
function attachVinListener(suffix) {
    const vinElement = safeGetMappedElement('vin', suffix);
    
    if (vinElement) {
        const handleVinDecode = async () => {
            const vin = vinElement.value.trim().toUpperCase();
            
            if (vin.length === 17) {
                try {
                    console.log(`Decoding VIN: ${vin}`);
                    
                    // Show loading state
                    showVinDecodeStatus(suffix, 'decoding');
                    
                    const vinData = await decodeVINAPI(vin);
                    
                    if (vinData.success) {
                        // Update form fields with decoded data
                        if (vinData.make) {
                            const makeSet = setSelectValue(`manufacturer${suffix}`, vinData.make);
                            if (makeSet) {
                                updateFees(suffix);
                            }
                        }
                        
                        if (vinData.model) {
                            const modelElement = safeGetMappedElement('model', suffix);
                            if (modelElement) {
                                modelElement.value = vinData.model;
                            }
                        }
                        
                        if (vinData.year) {
                            const yearElement = safeGetMappedElement('year', suffix);
                            if (yearElement) {
                                yearElement.value = vinData.year;
                            }
                        }
                        
                        // Update dependent calculations
                        updateEvCredits(suffix);
                        
                        showVinDecodeStatus(suffix, 'success');
                        console.log('VIN decoded successfully:', vinData);
                        
                    } else {
                        showVinDecodeStatus(suffix, 'partial');
                        console.warn('VIN decode returned partial data:', vinData);
                    }
                    
                } catch (error) {
                    showVinDecodeStatus(suffix, 'error');
                    console.error('VIN decode failed:', error);
                }
            } else {
                showVinDecodeStatus(suffix, 'invalid');
            }
        };
        
        const debouncedVinDecode = debounce(handleVinDecode, 1000);
        vinElement.addEventListener('input', debouncedVinDecode);
        vinElement.addEventListener('blur', handleVinDecode);
        
        // Format VIN input (uppercase, remove invalid characters)
        vinElement.addEventListener('input', (e) => {
            let value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
            if (value.length > 17) {
                value = value.substring(0, 17);
            }
            e.target.value = value;
        });
    } else {
        console.warn(`VIN field not found for vehicle ${suffix}`);
    }
}

/**
 * Shows VIN decode status to user
 * @param {string} suffix - Form suffix
 * @param {string} status - Status: 'decoding', 'success', 'partial', 'error', 'invalid'
 */
function showVinDecodeStatus(suffix, status) {
    const statusElement = safeGetElement(`vinStatus${suffix}`);
    
    if (!statusElement) return;
    
    const statusMessages = {
        'decoding': { text: 'Decoding VIN...', class: 'status-loading' },
        'success': { text: 'VIN decoded successfully', class: 'status-success' },
        'partial': { text: 'VIN decoded with limited data', class: 'status-warning' },
        'error': { text: 'VIN decode failed', class: 'status-error' },
        'invalid': { text: 'Invalid VIN format', class: 'status-error' }
    };
    
    const statusInfo = statusMessages[status] || statusMessages['error'];
    
    statusElement.textContent = statusInfo.text;
    statusElement.className = `vin-status ${statusInfo.class}`;
    
    // Auto-hide status after 3 seconds for success/warning
    if (status === 'success' || status === 'partial') {
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'vin-status';
        }, 3000);
    }
}

/**
 * Attaches global event listeners (not vehicle-specific)
 */
function attachGlobalEventListeners() {
    // Calculate button listeners
    const calculateBtn = safeGetElement('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleCalculateClick);
    }
    
    // Form reset listeners
    const resetBtnA = safeGetElement('resetBtnA');
    const resetBtnB = safeGetElement('resetBtnB');
    
    if (resetBtnA) {
        resetBtnA.addEventListener('click', () => resetFormSection('A'));
    }
    
    if (resetBtnB) {
        resetBtnB.addEventListener('click', () => resetFormSection('B'));
    }
    
    // Mode toggle listeners
    const dualModeToggle = safeGetElement('dualModeToggle');
    if (dualModeToggle) {
        dualModeToggle.addEventListener('change', handleModeToggle);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handles calculate button click
 * @param {Event} event - Click event
 */
function handleCalculateClick(event) {
    event.preventDefault();
    
    try {
        console.log('Calculate button clicked');
        
        // Update all calculations for both vehicles
        const vehicleAUpdated = updateAllCalculations('A');
        const vehicleBUpdated = updateAllCalculations('B');
        
        if (vehicleAUpdated || vehicleBUpdated) {
            console.log('Calculations completed');
            // Here you would trigger the actual lease calculation display
            // This would integrate with the main calculation engine
        } else {
            console.warn('Calculation failed - check form inputs');
            alert('Please check your form inputs and try again.');
        }
        
    } catch (error) {
        console.error('Calculate button handler failed:', error);
        alert('Calculation failed. Please try again.');
    }
}

/**
 * Handles dual mode toggle
 * @param {Event} event - Change event
 */
function handleModeToggle(event) {
    const isDualMode = event.target.checked;
    
    try {
        // Show/hide vehicle B section
        const vehicleBSection = safeGetElement('vehicleBSection');
        if (vehicleBSection) {
            vehicleBSection.style.display = isDualMode ? 'block' : 'none';
        }
        
        // Update UI labels and instructions
        const mainTitle = safeGetElement('mainTitle');
        if (mainTitle) {
            mainTitle.textContent = isDualMode ? 'Dual Vehicle Lease Calculator' : 'Lease Calculator';
        }
        
        console.log(`Mode toggled: ${isDualMode ? 'Dual' : 'Single'} vehicle mode`);
        
    } catch (error) {
        console.error('Mode toggle failed:', error);
    }
}

/**
 * Handles keyboard shortcuts
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + Enter to calculate
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        const calculateBtn = safeGetElement('calculateBtn');
        if (calculateBtn) {
            calculateBtn.click();
        }
    }
    
    // Escape to clear current input
    if (event.key === 'Escape' && event.target.tagName === 'INPUT') {
        event.target.value = '';
        event.target.blur();
    }
}

/**
 * Creates a universal event handler factory for form updates
 * @param {string} suffix - Form suffix
 * @param {Function} updateFunction - Update function to call
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {Function} - Event handler function
 */
export function createUpdateHandler(suffix, updateFunction, debounceMs = 0) {
    const handler = () => {
        try {
            updateFunction(suffix);
        } catch (error) {
            console.error(`Update handler failed for ${suffix}:`, error);
        }
    };
    
    return debounceMs > 0 ? debounce(handler, debounceMs) : handler;
}

/**
 * Removes all event listeners (cleanup function)
 * @returns {boolean} - True if successful
 */
export function removeEventListeners() {
    try {
        // This would be implemented if we need to clean up listeners
        // For now, we'll rely on page unload to clean up
        console.log('Event listeners cleanup requested');
        return true;
    } catch (error) {
        console.error('Failed to remove event listeners:', error);
        return false;
    }
}