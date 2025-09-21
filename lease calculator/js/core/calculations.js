/**
 * Core Calculations Module
 * Contains all lease calculation logic and form update functions
 */

import { FEES, RESIDUAL_MATRIX, STATES } from '../data/constants.js';
import { 
    safeGetElement, 
    safeGetElementValue, 
    safeSetElementValue, 
    safeSetElementText,
    safeGetMappedElement,
    safeGetMappedElementValue,
    safeSetMappedElementValue,
    safeSetMappedElementText,
    safeParseFloat,
    safeParseInt,
    getStateByCode,
    getFederalEvCredit,
    getStateEvIncentives,
    formatCurrency
} from '../utils/helpers.js';

/**
 * Updates manufacturer fees based on selected make
 * @param {string} suffix - Form suffix (A/B or 1/2)
 * @returns {boolean} - True if successful
 */
export function updateFees(suffix) {
    try {
        const make = safeGetMappedElementValue('make', suffix);
        
        if (!make || !FEES[make]) {
            console.warn(`No fee data found for make: ${make}`);
            return false;
        }
        
        const feeData = FEES[make];
        const acquisitionUpdated = safeSetMappedElementValue('acq', suffix, feeData.acq);
        const dispositionUpdated = safeSetMappedElementValue('disp', suffix, feeData.disp);
        
        if (acquisitionUpdated && dispositionUpdated) {
            console.log(`Fees updated for ${make}: Acq: $${feeData.acq}, Disp: $${feeData.disp}`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to update fees for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Calculates and updates capitalized cost percentage
 * @param {string} suffix - Form suffix (A/B or 1/2)
 * @returns {boolean} - True if successful
 */
export function updateCapitalizedCost(suffix) {
    try {
        const msrp = safeParseFloat(safeGetMappedElementValue('msrp', suffix));
        const sellingPrice = safeParseFloat(safeGetMappedElementValue('sellingPrice', suffix));
        
        if (msrp <= 0) {
            console.warn('MSRP must be greater than 0');
            return false;
        }
        
        const capCostPercentage = (sellingPrice / msrp) * 100;
        const updated = safeSetMappedElementValue('capCost', suffix, capCostPercentage.toFixed(2));
        
        if (updated) {
            console.log(`Cap cost updated: ${capCostPercentage.toFixed(2)}%`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to update capitalized cost for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Updates residual value based on term and mileage
 * @param {string} suffix - Form suffix (A/B or 1/2)
 * @returns {boolean} - True if successful
 */
export function updateResidualValue(suffix) {
    try {
        const term = safeGetMappedElementValue('term', suffix);
        const mileage = safeGetMappedElementValue('mileage', suffix);
        
        if (!term || !mileage) {
            console.warn('Term and mileage are required for residual calculation');
            return false;
        }
        
        const residualData = RESIDUAL_MATRIX[term];
        if (!residualData || !residualData[mileage]) {
            console.warn(`No residual data found for term: ${term}, mileage: ${mileage}`);
            return false;
        }
        
        const residualValue = residualData[mileage];
        const updated = safeSetMappedElementValue('residual', suffix, residualValue);
        
        if (updated) {
            console.log(`Residual updated: ${residualValue}%`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to update residual for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Updates tax rate based on selected state
 * @param {string} suffix - Form suffix (A/B or 1/2)
 * @returns {boolean} - True if successful
 */
export function updateTaxRate(suffix) {
    try {
        const stateCode = safeGetMappedElementValue('state', suffix);
        
        if (!stateCode) {
            console.warn('State code is required for tax calculation');
            return false;
        }
        
        const stateData = getStateByCode(stateCode);
        if (!stateData) {
            console.warn(`No state data found for code: ${stateCode}`);
            return false;
        }
        
        const updated = safeSetMappedElementValue('taxRate', suffix, stateData.tax);
        
        if (updated) {
            console.log(`Tax rate updated for ${stateData.name}: ${stateData.tax}%`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to update tax rate for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Updates EV credits based on vehicle information
 * @param {string} suffix - Form suffix (A/B or 1/2)
 * @returns {boolean} - True if successful
 */
export function updateEvCredits(suffix) {
    try {
        const make = safeGetMappedElementValue('make', suffix);
        const model = safeGetMappedElementValue('model', suffix);
        const year = safeParseInt(safeGetMappedElementValue('year', suffix));
        const stateCode = safeGetMappedElementValue('state', suffix);
        
        // Get federal credit
        const federalCredit = getFederalEvCredit(make, model, year);
        
        // Get state incentives
        const stateIncentives = getStateEvIncentives(stateCode);
        
        // Update display elements - Note: These might not exist in current HTML
        const fedNewUpdated = safeSetMappedElementText('fedNew', suffix, formatCurrency(federalCredit));
        const stateNewUpdated = safeSetMappedElementText('stateNew', suffix, formatCurrency(stateIncentives.new));
        const stateUsedUpdated = safeSetMappedElementText('stateUsed', suffix, formatCurrency(stateIncentives.used));
        
        // Update total credits input
        const totalCredits = federalCredit + stateIncentives.new;
        const creditsUpdated = safeSetMappedElementValue('credits', suffix, totalCredits);
        
        if (fedNewUpdated || stateNewUpdated || stateUsedUpdated || creditsUpdated) {
            console.log(`EV credits updated: Federal: ${formatCurrency(federalCredit)}, State: ${formatCurrency(stateIncentives.new)}`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Failed to update EV credits for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Calculates monthly lease payment
 * @param {Object} params - Lease parameters
 * @param {number} params.msrp - Manufacturer's Suggested Retail Price
 * @param {number} params.sellingPrice - Negotiated selling price
 * @param {number} params.residualPercent - Residual value percentage
 * @param {number} params.moneyFactor - Money factor (interest rate equivalent)
 * @param {number} params.term - Lease term in months
 * @param {number} params.downPayment - Down payment amount
 * @param {number} params.acquisitionFee - Acquisition fee
 * @param {number} params.taxRate - Tax rate percentage
 * @param {number} params.rebates - Total rebates/incentives
 * @returns {Object} - Calculated lease payment breakdown
 */
export function calculateLeasePayment(params) {
    try {
        const {
            msrp,
            sellingPrice,
            residualPercent,
            moneyFactor,
            term,
            downPayment = 0,
            acquisitionFee = 0,
            taxRate = 0,
            rebates = 0
        } = params;
        
        // Validate required parameters
        if (!msrp || !sellingPrice || !residualPercent || !moneyFactor || !term) {
            throw new Error('Missing required lease calculation parameters');
        }
        
        // Calculate residual value
        const residualValue = msrp * (residualPercent / 100);
        
        // Calculate adjusted capitalized cost
        const adjustedCapCost = sellingPrice + acquisitionFee - downPayment - rebates;
        
        // Calculate depreciation
        const depreciation = adjustedCapCost - residualValue;
        
        // Calculate monthly depreciation
        const monthlyDepreciation = depreciation / term;
        
        // Calculate monthly finance charge
        const monthlyFinanceCharge = (adjustedCapCost + residualValue) * moneyFactor;
        
        // Calculate base monthly payment (before tax)
        const baseMonthlyPayment = monthlyDepreciation + monthlyFinanceCharge;
        
        // Calculate tax
        const monthlyTax = baseMonthlyPayment * (taxRate / 100);
        
        // Calculate total monthly payment
        const totalMonthlyPayment = baseMonthlyPayment + monthlyTax;
        
        // Calculate total lease cost
        const totalLeaseCost = (totalMonthlyPayment * term) + downPayment;
        
        return {
            monthlyPayment: totalMonthlyPayment,
            basePayment: baseMonthlyPayment,
            monthlyTax: monthlyTax,
            totalLeaseCost: totalLeaseCost,
            totalDriveOff: downPayment + totalMonthlyPayment,
            residualValue: residualValue,
            depreciation: depreciation,
            monthlyDepreciation: monthlyDepreciation,
            monthlyFinanceCharge: monthlyFinanceCharge,
            adjustedCapCost: adjustedCapCost
        };
        
    } catch (error) {
        console.error('Lease calculation failed:', error);
        return {
            monthlyPayment: 0,
            basePayment: 0,
            monthlyTax: 0,
            totalLeaseCost: 0,
            totalDriveOff: 0,
            residualValue: 0,
            depreciation: 0,
            monthlyDepreciation: 0,
            monthlyFinanceCharge: 0,
            adjustedCapCost: 0,
            error: error.message
        };
    }
}

/**
 * Updates all dependent fields for a vehicle form
 * @param {string} suffix - Form suffix (A or B)
 * @returns {boolean} - True if all updates successful
 */
export function updateAllCalculations(suffix) {
    try {
        console.log(`Updating all calculations for vehicle ${suffix}`);
        
        const feesUpdated = updateFees(suffix);
        const capCostUpdated = updateCapitalizedCost(suffix);
        const residualUpdated = updateResidualValue(suffix);
        const taxUpdated = updateTaxRate(suffix);
        const creditsUpdated = updateEvCredits(suffix);
        
        const allUpdated = feesUpdated && capCostUpdated && residualUpdated && taxUpdated && creditsUpdated;
        
        if (allUpdated) {
            console.log(`All calculations updated successfully for vehicle ${suffix}`);
        } else {
            console.warn(`Some calculations failed for vehicle ${suffix}`);
        }
        
        return allUpdated;
    } catch (error) {
        console.error(`Failed to update all calculations for suffix ${suffix}:`, error);
        return false;
    }
}

/**
 * Validates lease calculation inputs
 * @param {string} suffix - Form suffix (A or B)
 * @returns {Object} - Validation result with errors array
 */
export function validateLeaseInputs(suffix) {
    const errors = [];
    
    try {
        const msrp = safeParseFloat(safeGetElementValue(`msrp${suffix}`));
        const sellingPrice = safeParseFloat(safeGetElementValue(`sellingPrice${suffix}`));
        const term = safeParseInt(safeGetElementValue(`term${suffix}`));
        const mileage = safeGetElementValue(`mileage${suffix}`);
        const make = safeGetElementValue(`make${suffix}`);
        
        if (msrp <= 0) {
            errors.push('MSRP must be greater than 0');
        }
        
        if (sellingPrice <= 0) {
            errors.push('Selling price must be greater than 0');
        }
        
        if (sellingPrice > msrp * 1.1) {
            errors.push('Selling price seems too high compared to MSRP');
        }
        
        if (!term || term < 12 || term > 60) {
            errors.push('Term must be between 12 and 60 months');
        }
        
        if (!mileage) {
            errors.push('Mileage selection is required');
        }
        
        if (!make) {
            errors.push('Vehicle make is required');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
        
    } catch (error) {
        errors.push('Validation failed due to unexpected error');
        return {
            valid: false,
            errors: errors
        };
    }
}