/**
 * Lease Hackulator - Refactored Main Application
 * Modular, maintainable, and performant lease calculator
 */

class LeaseHackulator {
    constructor() {
        this.domCache = new window.LeaseHackulator.DOMCache();
        this.eventManager = new window.LeaseHackulator.EventManager();
        this.dataService = window.LeaseHackulator.dataService;
        this.initialized = false;
        
        // Static data (will be moved to configuration files eventually)
        this.fees = this.getFees();
        this.residualMatrix = this.getResidualMatrix();
        this.moneyFactors = this.getMoneyFactors();
        this.vinMapping = this.getVinMapping();
    }
    
    /**
     * Initialize the application
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Initializing Lease Hackulator...');
            
            // Initialize data service
            await this.dataService.initialize();
            
            // Initialize UI components
            await this.initializeUI();
            
            // Set up event listeners
            this.attachEventListeners();
            
            // Initialize default values
            this.initializeDefaults();
            
            this.initialized = true;
            console.log('Lease Hackulator initialized successfully');
            
            // Announce to screen readers
            window.LeaseHackulator.AccessibilityUtils.announce(
                'Lease Hackulator is ready for use',
                'polite'
            );
            
        } catch (error) {
            console.error('Failed to initialize Lease Hackulator:', error);
            this.handleInitializationError(error);
        }
    }
    
    /**
     * Initialize UI components
     */
    async initializeUI() {
        try {
            await this.initializeDropdowns();
            this.setupAccessibility();
        } catch (error) {
            console.error('UI initialization failed:', error);
        }
    }
    
    /**
     * Initialize dropdown menus
     */
    async initializeDropdowns() {
        const makes = this.dataService.getAvailableMakes();
        const states = this.dataService.stateTaxRates || [];
        
        // Initialize make dropdowns
        ['A', 'B'].forEach(suffix => {
            const makeSelect = this.domCache.getElementById(`make${suffix}`);
            if (makeSelect) {
                this.populateSelect(makeSelect, makes, 'Select Make...');
            }
        });
        
        // Initialize state dropdowns
        ['A', 'B'].forEach(suffix => {
            const stateSelect = this.domCache.getElementById(`state${suffix}`);
            if (stateSelect) {
                const stateOptions = states.map(s => ({ value: s.code, text: s.name }));
                this.populateSelectWithObjects(stateSelect, stateOptions, 'Select State...');
            }
        });
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels and descriptions
        ['A', 'B'].forEach(suffix => {
            const vinInput = this.domCache.getElementById(`vin${suffix}`);
            if (vinInput) {
                window.LeaseHackulator.AccessibilityUtils.updateARIA(vinInput, {
                    'aria-label': `Vehicle ${suffix} VIN input`,
                    'aria-describedby': `vin${suffix}-help`,
                    'role': 'textbox'
                });
            }
            
            const zipInput = this.domCache.getElementById(`zipCode${suffix}`);
            if (zipInput) {
                window.LeaseHackulator.AccessibilityUtils.updateARIA(zipInput, {
                    'aria-label': `Vehicle ${suffix} ZIP code input`,
                    'aria-describedby': `zip${suffix}-help`
                });
            }
        });
        
        // Add help text elements if they don't exist
        this.addHelpText();
    }
    
    /**
     * Add help text for accessibility
     */
    addHelpText() {
        ['A', 'B'].forEach(suffix => {
            if (!document.getElementById(`vin${suffix}-help`)) {
                const helpDiv = document.createElement('div');
                helpDiv.id = `vin${suffix}-help`;
                helpDiv.className = 'sr-only';
                helpDiv.textContent = 'Enter 17-character Vehicle Identification Number';
                
                const vinInput = this.domCache.getElementById(`vin${suffix}`);
                if (vinInput && vinInput.parentNode) {
                    vinInput.parentNode.insertBefore(helpDiv, vinInput.nextSibling);
                }
            }
        });
    }
    
    /**
     * Populate a select element with string options
     */
    populateSelect(selectElement, options, defaultText = '') {
        if (!selectElement) return;
        
        selectElement.innerHTML = '';
        
        if (defaultText) {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = defaultText;
            selectElement.appendChild(defaultOption);
        }
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }
    
    /**
     * Populate a select element with object options
     */
    populateSelectWithObjects(selectElement, options, defaultText = '') {
        if (!selectElement) return;
        
        selectElement.innerHTML = '';
        
        if (defaultText) {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = defaultText;
            selectElement.appendChild(defaultOption);
        }
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            selectElement.appendChild(optionElement);
        });
    }
    
    /**
     * Attach event listeners with improved performance
     */
    attachEventListeners() {
        ['A', 'B'].forEach(suffix => {
            this.attachVehicleListeners(suffix);
        });
    }
    
    /**
     * Attach listeners for a specific vehicle
     */
    attachVehicleListeners(suffix) {
        // ZIP code listener with debouncing
        const zipInput = this.domCache.getElementById(`zipCode${suffix}`);
        if (zipInput) {
            const debouncedZipHandler = window.LeaseHackulator.debounce(
                (e) => this.handleZipCodeChange(e.target.value, suffix),
                300
            );
            this.eventManager.addListener(zipInput, 'input', debouncedZipHandler);
        }
        
        // VIN listener with validation
        const vinInput = this.domCache.getElementById(`vin${suffix}`);
        if (vinInput) {
            this.eventManager.addListener(vinInput, 'blur', (e) => this.handleVinChange(e.target.value, suffix));
            this.eventManager.addListener(vinInput, 'input', (e) => this.validateVinInput(e.target.value, vinInput));
        }
        
        // Make change listener
        const makeSelect = this.domCache.getElementById(`make${suffix}`);
        if (makeSelect) {
            this.eventManager.addListener(makeSelect, 'change', () => this.updateFees(suffix));
        }
        
        // State change listener
        const stateSelect = this.domCache.getElementById(`state${suffix}`);
        if (stateSelect) {
            this.eventManager.addListener(stateSelect, 'change', () => this.updateTax(suffix));
        }
        
        // Term and mileage listeners
        ['term', 'mileage'].forEach(field => {
            const element = this.domCache.getElementById(`${field}${suffix}`);
            if (element) {
                this.eventManager.addListener(element, 'change', () => this.updateResidual(suffix));
            }
        });
        
        // MSRP and selling price listeners
        ['msrp', 'sellingPrice'].forEach(field => {
            const element = this.domCache.getElementById(`${field}${suffix}`);
            if (element) {
                const debouncedHandler = window.LeaseHackulator.debounce(
                    () => this.updateCapCost(suffix),
                    300
                );
                this.eventManager.addListener(element, 'input', debouncedHandler);
            }
        });
    }
    
    /**
     * Handle ZIP code changes with better error handling
     */
    async handleZipCodeChange(zip, suffix) {
        try {
            if (!window.LeaseHackulator.validateZipCode(zip)) {
                return; // Don't process invalid ZIP codes
            }
            
            const stateCode = this.dataService.getStateFromZip(zip);
            if (stateCode) {
                const stateSelect = this.domCache.getElementById(`state${suffix}`);
                if (stateSelect) {
                    stateSelect.value = stateCode;
                    
                    // Update dependent fields
                    this.updateTax(suffix);
                    this.updateEVCredits(suffix);
                    
                    // Announce change to screen readers
                    window.LeaseHackulator.AccessibilityUtils.announce(
                        `State updated to ${this.dataService.getStateInfo(stateCode)?.name || stateCode}`,
                        'polite'
                    );
                }
            }
        } catch (error) {
            console.warn('ZIP code lookup failed:', error);
        }
    }
    
    /**
     * Handle VIN changes with improved validation and error handling
     */
    async handleVinChange(vin, suffix) {
        try {
            if (!window.LeaseHackulator.validateVIN(vin)) {
                this.showVinError(suffix, 'Invalid VIN format');
                return;
            }
            
            this.clearVinError(suffix);
            this.setVinLoading(suffix, true);
            
            const vinData = await this.dataService.decodeVIN(vin);
            
            if (vinData && vinData.isValid) {
                // Update form fields
                this.updateFormFromVinData(vinData, suffix);
                
                // Update dependent calculations
                this.updateFees(suffix);
                this.updateEVCredits(suffix);
                
                // Announce success
                window.LeaseHackulator.AccessibilityUtils.announce(
                    `VIN decoded: ${vinData.year} ${vinData.make} ${vinData.model}`,
                    'polite'
                );
            } else {
                this.showVinError(suffix, 'Unable to decode VIN');
            }
            
        } catch (error) {
            console.error('VIN decoding failed:', error);
            this.showVinError(suffix, error.message);
        } finally {
            this.setVinLoading(suffix, false);
        }
    }
    
    /**
     * Validate VIN input as user types
     */
    validateVinInput(vin, inputElement) {
        const isValid = window.LeaseHackulator.validateVIN(vin) || vin.length < 17;
        
        if (isValid) {
            inputElement.classList.remove('error');
        } else {
            inputElement.classList.add('error');
        }
    }
    
    /**
     * Update form fields from VIN data
     */
    updateFormFromVinData(vinData, suffix) {
        const fields = [
            { id: `make${suffix}`, value: vinData.make },
            { id: `model${suffix}`, value: vinData.model },
            { id: `year${suffix}`, value: vinData.year.toString() }
        ];
        
        fields.forEach(field => {
            const element = this.domCache.getElementById(field.id);
            if (element && field.value) {
                element.value = field.value;
            }
        });
    }
    
    /**
     * Show VIN error message
     */
    showVinError(suffix, message) {
        const errorElement = this.domCache.getElementById(`vin${suffix}-error`) || 
                            this.createVinErrorElement(suffix);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.setAttribute('aria-live', 'assertive');
    }
    
    /**
     * Clear VIN error message
     */
    clearVinError(suffix) {
        const errorElement = this.domCache.getElementById(`vin${suffix}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }
    
    /**
     * Create VIN error element if it doesn't exist
     */
    createVinErrorElement(suffix) {
        const errorDiv = document.createElement('div');
        errorDiv.id = `vin${suffix}-error`;
        errorDiv.className = 'error-message';
        errorDiv.style.display = 'none';
        errorDiv.setAttribute('role', 'alert');
        
        const vinInput = this.domCache.getElementById(`vin${suffix}`);
        if (vinInput && vinInput.parentNode) {
            vinInput.parentNode.insertBefore(errorDiv, vinInput.nextSibling);
        }
        
        return errorDiv;
    }
    
    /**
     * Set VIN loading state
     */
    setVinLoading(suffix, loading) {
        const vinInput = this.domCache.getElementById(`vin${suffix}`);
        if (vinInput) {
            vinInput.disabled = loading;
            
            if (loading) {
                vinInput.classList.add('loading');
                window.LeaseHackulator.AccessibilityUtils.updateARIA(vinInput, {
                    'aria-busy': 'true'
                });
            } else {
                vinInput.classList.remove('loading');
                window.LeaseHackulator.AccessibilityUtils.updateARIA(vinInput, {
                    'aria-busy': 'false'
                });
            }
        }
    }
    
    /**
     * Update fees based on make selection
     */
    updateFees(suffix) {
        const makeElement = this.domCache.getElementById(`make${suffix}`);
        if (!makeElement) return;
        
        const make = makeElement.value;
        const feeData = this.fees[make];
        
        if (feeData) {
            const acqElement = this.domCache.getElementById(`acq${suffix}`);
            const dispElement = this.domCache.getElementById(`disp${suffix}`);
            
            if (acqElement) acqElement.value = feeData.acq;
            if (dispElement) dispElement.value = feeData.disp;
        }
    }
    
    /**
     * Update cap cost calculation
     */
    updateCapCost(suffix) {
        const msrpElement = this.domCache.getElementById(`msrp${suffix}`);
        const sellElement = this.domCache.getElementById(`sellingPrice${suffix}`);
        const capElement = this.domCache.getElementById(`capCost${suffix}`);
        
        if (!msrpElement || !sellElement || !capElement) return;
        
        const msrp = parseFloat(msrpElement.value) || 0;
        const sell = parseFloat(sellElement.value) || 0;
        
        if (msrp > 0) {
            const capCostPercent = ((sell / msrp) * 100).toFixed(2);
            capElement.value = capCostPercent;
        }
    }
    
    /**
     * Update residual value based on term and mileage
     */
    updateResidual(suffix) {
        const termElement = this.domCache.getElementById(`term${suffix}`);
        const mileElement = this.domCache.getElementById(`mileage${suffix}`);
        const resElement = this.domCache.getElementById(`residual${suffix}`);
        
        if (!termElement || !mileElement || !resElement) return;
        
        const term = termElement.value;
        const mile = mileElement.value;
        
        if (this.residualMatrix[term] && this.residualMatrix[term][mile]) {
            resElement.value = this.residualMatrix[term][mile];
        }
    }
    
    /**
     * Update tax rate based on state selection
     */
    updateTax(suffix) {
        const stateElement = this.domCache.getElementById(`state${suffix}`);
        const taxElement = this.domCache.getElementById(`taxRate${suffix}`);
        
        if (!stateElement || !taxElement) return;
        
        const stateCode = stateElement.value;
        const taxRate = this.dataService.getStateTaxRate(stateCode);
        
        if (taxRate) {
            taxElement.value = taxRate;
        }
    }
    
    /**
     * Update EV credits calculation
     */
    updateEVCredits(suffix) {
        const make = this.domCache.getElementById(`make${suffix}`)?.value || '';
        const model = this.domCache.getElementById(`model${suffix}`)?.value || '';
        const year = parseInt(this.domCache.getElementById(`year${suffix}`)?.value) || 0;
        const state = this.domCache.getElementById(`state${suffix}`)?.value || '';
        
        if (!make || !model || !year || !state) return;
        
        try {
            const federalCredit = this.dataService.getFederalCredit(make, model, year);
            const stateCredit = this.dataService.getStateCredit(state);
            
            // Update display elements
            this.updateCreditDisplays(suffix, federalCredit, stateCredit);
            
        } catch (error) {
            console.warn('Failed to update EV credits:', error);
        }
    }
    
    /**
     * Update credit display elements
     */
    updateCreditDisplays(suffix, federalCredit, stateCredit) {
        const elements = {
            fedNew: this.domCache.getElementById(`fedNew${suffix}`),
            stateNew: this.domCache.getElementById(`stateNew${suffix}`),
            stateUsed: this.domCache.getElementById(`stateUsed${suffix}`),
            credits: this.domCache.getElementById(`credits${suffix}`)
        };
        
        if (elements.fedNew) {
            elements.fedNew.textContent = `$${federalCredit.toLocaleString()}`;
        }
        
        if (elements.stateNew) {
            elements.stateNew.textContent = `$${stateCredit.new.toLocaleString()}`;
        }
        
        if (elements.stateUsed) {
            elements.stateUsed.textContent = `$${stateCredit.used.toLocaleString()}`;
        }
        
        if (elements.credits) {
            elements.credits.value = federalCredit + stateCredit.new;
        }
    }
    
    /**
     * Initialize default values
     */
    initializeDefaults() {
        ['A', 'B'].forEach(suffix => {
            this.updateCapCost(suffix);
            this.updateResidual(suffix);
            this.updateEVCredits(suffix);
        });
    }
    
    /**
     * Handle initialization errors gracefully
     */
    handleInitializationError(error) {
        console.error('Initialization failed:', error);
        
        // Show user-friendly error message
        const errorMessage = 'Some features may not work properly. Please refresh the page.';
        window.LeaseHackulator.AccessibilityUtils.announce(errorMessage, 'assertive');
        
        // Try to continue with basic functionality
        this.initialized = true;
    }
    
    /**
     * Static data methods (temporary until moved to configuration)
     */
    getFees() {
        return {
            "Acura": { acq: 595, disp: 350 }, "Alfa Romeo": { acq: 795, disp: 395 }, "Audi": { acq: 895, disp: 395 },
            "BMW": { acq: 925, disp: 350 }, "Cadillac": { acq: 695, disp: 395 }, "Chevrolet": { acq: 595, disp: 400 },
            "Ford": { acq: 645, disp: 395 }, "Honda": { acq: 595, disp: 350 }, "Hyundai": { acq: 595, disp: 400 },
            "Infiniti": { acq: 695, disp: 395 }, "Kia": { acq: 595, disp: 400 }, "Lexus": { acq: 695, disp: 350 },
            "Mercedes-Benz": { acq: 895, disp: 395 }, "Nissan": { acq: 595, disp: 395 }, "Tesla": { acq: 1195, disp: 1000 },
            "Toyota": { acq: 650, disp: 350 }, "Volkswagen": { acq: 645, disp: 395 }
        };
    }
    
    getResidualMatrix() {
        return {
            "24": { "10K": 68, "12K": 66, "15K": 64, "18K": 62, "20K": 60, "25K": 56, "30K": 52 },
            "36": { "10K": 58, "12K": 56, "15K": 54, "18K": 52, "20K": 50, "25K": 46, "30K": 42 },
            "39": { "10K": 55, "12K": 53, "15K": 51, "18K": 49, "20K": 47, "25K": 43, "30K": 39 },
            "48": { "10K": 50, "12K": 48, "15K": 46, "18K": 44, "20K": 42, "25K": 38, "30K": 34 }
        };
    }
    
    getMoneyFactors() {
        return {
            'Toyota': { 2024: { tier1: 0.00083, tier2: 0.00104, tier3: 0.00146 } },
            'Honda': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167 } },
            'BMW': { 2024: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188 } }
        };
    }
    
    getVinMapping() {
        return {
            'JHM': 'Honda', 'JTD': 'Toyota', 'WBA': 'BMW', '1FA': 'Ford',
            'WDC': 'Mercedes-Benz', '5YJ': 'Tesla', 'SAL': 'Land Rover'
        };
    }
    
    /**
     * Public API methods
     */
    getAPI() {
        return {
            getFederalCredit: (make, model, year) => this.dataService.getFederalCredit(make, model, year),
            getStateCredit: (stateCode) => this.dataService.getStateCredit(stateCode),
            decodeVIN: (vin) => this.dataService.decodeVIN(vin),
            updateFees: (suffix) => this.updateFees(suffix),
            updateCapCost: (suffix) => this.updateCapCost(suffix),
            updateResidual: (suffix) => this.updateResidual(suffix),
            updateTax: (suffix) => this.updateTax(suffix),
            updateEVCredits: (suffix) => this.updateEVCredits(suffix),
            refresh: () => this.dataService.refresh()
        };
    }
}

// Initialize application when DOM is ready
let leaseHackulator;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        leaseHackulator = new LeaseHackulator();
        await leaseHackulator.initialize();
        
        // Expose API globally
        window.LeaseHackulator = Object.assign(window.LeaseHackulator || {}, leaseHackulator.getAPI());
        
    } catch (error) {
        console.error('Failed to start Lease Hackulator:', error);
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LeaseHackulator };
}