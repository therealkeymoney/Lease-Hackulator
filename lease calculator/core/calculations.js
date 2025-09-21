/**
 * Core Calculation Functions for Lease Hackulator
 * Contains central calculation logic for lease computations and incentives
 */

import { EV_INCENTIVES } from '../data/constants.js';

// Global variables for live data
let FED_CREDITS = [];
let STATE_CREDITS = {};

/**
 * Set live federal credits data
 * @param {Array} credits - Array of federal credit objects
 */
export function setFederalCredits(credits) {
    FED_CREDITS = credits || [];
}

/**
 * Set live state credits data
 * @param {Object} credits - State credits object
 */
export function setStateCredits(credits) {
    STATE_CREDITS = credits || {};
}

/**
 * Get current federal credits data
 * @returns {Array} - Current federal credits array
 */
export function getFederalCredits() {
    return FED_CREDITS;
}

/**
 * Get current state credits data
 * @returns {Object} - Current state credits object
 */
export function getStateCredits() {
    return STATE_CREDITS;
}

/**
 * Calculate federal tax credit for a vehicle
 * @param {string} make - Vehicle make
 * @param {string} model - Vehicle model
 * @param {number} year - Vehicle year
 * @returns {number} - Federal tax credit amount
 */
export function getFederalCredit(make, model, year) {
    // First check live data
    const liveCredit = FED_CREDITS.find(credit =>
        credit.make.toLowerCase() === make.toLowerCase() &&
        credit.model.toLowerCase() === model.toLowerCase() &&
        credit.year === year
    );
    
    if (liveCredit) return liveCredit.amount;
    
    // Fallback to static data
    const staticCredit = EV_INCENTIVES.federal.eligible[make];
    if (staticCredit && staticCredit[model]) {
        return staticCredit[model];
    }
    
    return 0;
}

/**
 * Calculate state incentive credits
 * @param {string} stateCode - Two-letter state code
 * @returns {Object} - Object with new and used credit amounts
 */
export function getStateCredit(stateCode) {
    // Check live data first
    if (STATE_CREDITS[stateCode]) {
        return {
            new: STATE_CREDITS[stateCode].new || 0,
            used: STATE_CREDITS[stateCode].used || 0
        };
    }
    
    // Fallback to static data
    const staticCredit = EV_INCENTIVES.state[stateCode];
    if (staticCredit) {
        return {
            new: staticCredit.rebate || 0,
            used: staticCredit.usedRebate || 0
        };
    }
    
    return { new: 0, used: 0 };
}

/**
 * Calculate lease payment based on parameters
 * @param {Object} params - Lease calculation parameters
 * @param {number} params.msrp - Manufacturer's suggested retail price
 * @param {number} params.capCost - Capitalized cost
 * @param {number} params.residualValue - Residual value
 * @param {number} params.moneyFactor - Money factor
 * @param {number} params.term - Lease term in months
 * @param {number} params.taxRate - Sales tax rate as decimal
 * @returns {Object} - Lease payment breakdown
 */
export function calculateLeasePayment(params) {
    const {
        msrp,
        capCost,
        residualValue,
        moneyFactor,
        term,
        taxRate = 0
    } = params;

    // Calculate depreciation
    const depreciation = (capCost - residualValue) / term;
    
    // Calculate finance charge
    const financeCharge = (capCost + residualValue) * moneyFactor;
    
    // Base payment before tax
    const basePayment = depreciation + financeCharge;
    
    // Apply tax
    const tax = basePayment * taxRate;
    
    // Total monthly payment
    const totalPayment = basePayment + tax;

    return {
        basePayment: Math.round(basePayment * 100) / 100,
        depreciation: Math.round(depreciation * 100) / 100,
        financeCharge: Math.round(financeCharge * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100
    };
}

/**
 * Calculate residual value percentage
 * @param {number} msrp - Manufacturer's suggested retail price
 * @param {number} residualAmount - Residual amount
 * @returns {number} - Residual percentage
 */
export function calculateResidualPercentage(msrp, residualAmount) {
    if (msrp === 0) return 0;
    return Math.round((residualAmount / msrp) * 100 * 100) / 100;
}

/**
 * Convert money factor to APR
 * @param {number} moneyFactor - Money factor
 * @returns {number} - APR percentage
 */
export function moneyFactorToAPR(moneyFactor) {
    return Math.round(moneyFactor * 2400 * 100) / 100;
}

/**
 * Convert APR to money factor
 * @param {number} apr - APR percentage
 * @returns {number} - Money factor
 */
export function aprToMoneyFactor(apr) {
    return Math.round((apr / 2400) * 100000) / 100000;
}

/**
 * Calculate total lease cost
 * @param {number} monthlyPayment - Monthly payment amount
 * @param {number} term - Lease term in months
 * @param {number} downPayment - Down payment amount
 * @param {number} fees - Total fees
 * @returns {number} - Total lease cost
 */
export function calculateTotalLeaseCost(monthlyPayment, term, downPayment = 0, fees = 0) {
    return (monthlyPayment * term) + downPayment + fees;
}