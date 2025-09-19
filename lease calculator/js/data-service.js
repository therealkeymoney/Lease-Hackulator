/**
 * Data Service for Lease Hackulator
 * Handles all data loading, caching, and API interactions
 */

class DataService {
    constructor() {
        this.configLoader = new window.LeaseHackulator.ConfigLoader();
        this.cache = new Map();
        this.initialized = false;
        
        // Configuration data holders
        this.zipStateMapping = null;
        this.stateTaxRates = null;
        this.evIncentives = null;
        
        // Live data holders
        this.federalCredits = [];
        this.stateCredits = {};
    }
    
    /**
     * Initialize the data service by loading all configuration
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Initializing DataService...');
            
            // Load configuration files with fallbacks
            await Promise.all([
                this.loadZipStateMapping(),
                this.loadStateTaxRates(),
                this.loadEVIncentives(),
                this.loadLiveIncentiveData()
            ]);
            
            this.initialized = true;
            console.log('DataService initialized successfully');
        } catch (error) {
            console.error('Failed to initialize DataService:', error);
            // Continue with fallback data
            this.initialized = true;
        }
    }
    
    /**
     * Load ZIP code to state mapping configuration
     */
    async loadZipStateMapping() {
        try {
            this.zipStateMapping = await this.configLoader.load('zip-state-mapping.json', {
                ranges: [
                    { start: '90001', end: '96199', state: 'CA' },
                    { start: '10001', end: '14999', state: 'NY' },
                    { start: '60001', end: '62999', state: 'IL' }
                ]
            });
        } catch (error) {
            console.warn('Using fallback ZIP state mapping');
            this.zipStateMapping = { ranges: [] };
        }
    }
    
    /**
     * Load state tax rates configuration
     */
    async loadStateTaxRates() {
        try {
            this.stateTaxRates = await this.configLoader.load('state-tax-rates.json', [
                { code: 'CA', name: 'California', tax: 7.25 },
                { code: 'NY', name: 'New York', tax: 4.0 },
                { code: 'TX', name: 'Texas', tax: 6.25 }
            ]);
        } catch (error) {
            console.warn('Using fallback state tax rates');
            this.stateTaxRates = [];
        }
    }
    
    /**
     * Load EV incentives configuration
     */
    async loadEVIncentives() {
        try {
            this.evIncentives = await this.configLoader.load('ev-incentives.json', {
                stateIncentives: {
                    'CA': { rebate: 2000, program: 'CVRP' },
                    'NY': { rebate: 2000, program: 'Drive Clean Rebate' }
                },
                federalIncentives: {
                    newEV: { maxCredit: 7500 }
                }
            });
        } catch (error) {
            console.warn('Using fallback EV incentives');
            this.evIncentives = { stateIncentives: {}, federalIncentives: {} };
        }
    }
    
    /**
     * Load live incentive data from external APIs
     */
    async loadLiveIncentiveData() {
        try {
            // Attempt to load federal credits
            await this.loadFederalCredits();
            
            // Load state credits (placeholder for external API)
            this.stateCredits = this.evIncentives?.stateIncentives || {};
            
        } catch (error) {
            console.warn('Failed to load live incentive data, using fallback:', error);
            // Use configuration data as fallback
            this.federalCredits = [];
            this.stateCredits = this.evIncentives?.stateIncentives || {};
        }
    }
    
    /**
     * Load federal credits from government API
     */
    async loadFederalCredits() {
        try {
            const xmlResponse = await window.LeaseHackulator.fetchJSON(
                'https://www.fueleconomy.gov/ws/rest/vehicles/taxcredit?format=json',
                { timeout: 5000 },
                null
            );
            
            if (xmlResponse && typeof xmlResponse === 'string') {
                const xmlData = window.LeaseHackulator.xml2json(xmlResponse);
                
                if (xmlData?.vehicles?.vehicle) {
                    const vehicles = Array.isArray(xmlData.vehicles.vehicle) 
                        ? xmlData.vehicles.vehicle 
                        : [xmlData.vehicles.vehicle];
                        
                    this.federalCredits = vehicles.map(v => ({
                        make: v.make || '',
                        model: v.model || '',
                        year: parseInt(v.year) || 0,
                        amount: parseInt(v.credit) || 0
                    })).filter(v => v.make && v.model && v.year && v.amount);
                    
                    console.log(`Loaded ${this.federalCredits.length} federal credit entries`);
                }
            }
        } catch (error) {
            console.warn('Failed to load federal credits from API:', error);
            this.federalCredits = [];
        }
    }
    
    /**
     * Get state from ZIP code
     * @param {string|number} zip - ZIP code to lookup
     * @returns {string|null} State code or null if not found
     */
    getStateFromZip(zip) {
        if (!this.zipStateMapping) return null;
        
        const normalizedZip = window.LeaseHackulator.normalizeZipCode(zip);
        if (!normalizedZip) return null;
        
        for (const range of this.zipStateMapping.ranges) {
            if (normalizedZip >= range.start && normalizedZip <= range.end) {
                return range.state;
            }
        }
        
        return null;
    }
    
    /**
     * Get state tax rate
     * @param {string} stateCode - State code (e.g., 'CA', 'NY')
     * @returns {number} Tax rate percentage or 0 if not found
     */
    getStateTaxRate(stateCode) {
        if (!this.stateTaxRates || !stateCode) return 0;
        
        const state = this.stateTaxRates.find(s => s.code === stateCode);
        return state ? state.tax : 0;
    }
    
    /**
     * Get state information
     * @param {string} stateCode - State code
     * @returns {Object|null} State information or null
     */
    getStateInfo(stateCode) {
        if (!this.stateTaxRates || !stateCode) return null;
        
        return this.stateTaxRates.find(s => s.code === stateCode) || null;
    }
    
    /**
     * Get federal EV credit for vehicle
     * @param {string} make - Vehicle make
     * @param {string} model - Vehicle model  
     * @param {number} year - Vehicle year
     * @returns {number} Federal credit amount
     */
    getFederalCredit(make, model, year) {
        if (!this.federalCredits || !make || !model || !year) return 0;
        
        const credit = this.federalCredits.find(c => 
            c.make.toLowerCase() === make.toLowerCase() &&
            c.model.toLowerCase().includes(model.toLowerCase()) &&
            c.year === parseInt(year)
        );
        
        return credit ? credit.amount : 0;
    }
    
    /**
     * Get state EV credit/rebate
     * @param {string} stateCode - State code
     * @returns {Object} State credit information
     */
    getStateCredit(stateCode) {
        if (!this.stateCredits || !stateCode) {
            return { rebate: 0, program: '', new: 0, used: 0 };
        }
        
        const credit = this.stateCredits[stateCode];
        if (!credit) {
            return { rebate: 0, program: '', new: 0, used: 0 };
        }
        
        return {
            rebate: credit.rebate || 0,
            program: credit.program || '',
            new: credit.rebate || 0,
            used: credit.additionalPrograms?.usedEV || 0
        };
    }
    
    /**
     * Decode VIN using NHTSA API
     * @param {string} vin - VIN to decode
     * @returns {Promise<Object|null>} Decoded VIN data or null
     */
    async decodeVIN(vin) {
        if (!window.LeaseHackulator.validateVIN(vin)) {
            throw new Error('Invalid VIN format');
        }
        
        try {
            const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;
            const data = await window.LeaseHackulator.fetchJSON(url, { timeout: 10000 });
            
            if (!data?.Results) {
                throw new Error('Invalid response from VIN decode API');
            }
            
            const results = data.Results;
            
            const make = this.extractValue(results, ['Make', 'Manufacturer']);
            const model = this.extractValue(results, ['Model']);
            const year = this.extractValue(results, ['Model Year']);
            const bodyClass = this.extractValue(results, ['Body Class']);
            const fuelType = this.extractValue(results, ['Fuel Type - Primary']);
            
            return {
                make: make || '',
                model: model || '',
                year: year ? parseInt(year) : 0,
                bodyClass: bodyClass || '',
                fuelType: fuelType || '',
                isValid: !!make && !!model && !!year
            };
            
        } catch (error) {
            console.error('VIN decode failed:', error);
            throw new Error(`VIN decode failed: ${error.message}`);
        }
    }
    
    /**
     * Extract value from NHTSA API results
     * @private
     */
    extractValue(results, variables) {
        for (const variable of variables) {
            const result = results.find(r => r.Variable === variable);
            if (result && result.Value && result.Value !== 'Not Applicable') {
                return result.Value;
            }
        }
        return null;
    }
    
    /**
     * Get all available makes
     * @returns {Array<string>} Array of vehicle makes
     */
    getAvailableMakes() {
        // This would typically come from a configuration file
        return [
            'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Cadillac', 'Chevrolet',
            'Ford', 'Genesis', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar',
            'Kia', 'Lexus', 'Lincoln', 'Mercedes-Benz', 'Nissan', 'Porsche',
            'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
        ];
    }
    
    /**
     * Clear all cached data
     */
    clearCache() {
        this.cache.clear();
        this.configLoader.clearCache();
    }
    
    /**
     * Refresh configuration data
     */
    async refresh() {
        this.initialized = false;
        this.clearCache();
        await this.initialize();
    }
}

// Create singleton instance
const dataService = new DataService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataService, dataService };
} else {
    // Browser environment
    window.LeaseHackulator = window.LeaseHackulator || {};
    window.LeaseHackulator.DataService = DataService;
    window.LeaseHackulator.dataService = dataService;
}