/**
 * API Utilities for Lease Hackulator
 * Contains all API utility functions with proper error handling
 */

/**
 * Convert XML string to JSON object
 * @param {string} xmlStr - XML string to convert
 * @returns {Object} - Parsed JSON object
 */
export function xml2json(xmlStr) {
    const parser = new DOMParser().parseFromString(xmlStr, 'application/xml');
    function walk(node) {
        const obj = {};
        node.childNodes.forEach(child => {
            if (child.nodeType === 1) {
                const key = child.nodeName;
                const value = child.childNodes.length > 1 ? walk(child) : child.textContent.trim();
                obj[key] = obj[key] ? [].concat(obj[key], value) : value;
            }
        });
        return obj;
    }
    return walk(parser.documentElement);
}

/**
 * Fetch JSON data from URL with error handling
 * @param {string} url - URL to fetch from
 * @returns {Promise<Object>} - Promise resolving to JSON data
 */
export async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch JSON from ${url}:`, error);
        throw error;
    }
}

/**
 * Decode VIN using NHTSA API
 * @param {string} vin - Vehicle Identification Number
 * @returns {Promise<Object>} - Promise resolving to vehicle information
 */
export async function decodeVINFromAPI(vin) {
    if (!vin || vin.length !== 17) {
        throw new Error('VIN must be exactly 17 characters');
    }
    
    try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
        if (!response.ok) {
            throw new Error(`NHTSA API error: ${response.status}`);
        }
        
        const data = await response.json();
        const results = data.Results;
        
        return {
            make: results.find(r => r.Variable === 'Make')?.Value || 
                  results.find(r => r.Variable === 'Manufacturer')?.Value || '',
            model: results.find(r => r.Variable === 'Model')?.Value || '',
            year: results.find(r => r.Variable === 'Model Year')?.Value || ''
        };
    } catch (error) {
        console.error('VIN decode failed:', error);
        throw error;
    }
}

/**
 * Load federal tax credit data from government API
 * @returns {Promise<Array>} - Promise resolving to array of federal credit data
 */
export async function loadFederalCredits() {
    try {
        const xmlResponse = await fetch('https://www.fueleconomy.gov/ws/rest/vehicles/taxcredit?format=json');
        const xmlText = await xmlResponse.text();
        const xmlData = xml2json(xmlText);
        
        if (xmlData.vehicles && xmlData.vehicles.vehicle) {
            return xmlData.vehicles.vehicle.map(v => ({
                make: v.make,
                model: v.model,
                year: parseInt(v.year),
                amount: parseInt(v.credit)
            }));
        }
        return [];
    } catch (error) {
        console.warn('Failed to load federal credits:', error);
        return [];
    }
}

/**
 * Load state incentive data from external API
 * @returns {Promise<Object>} - Promise resolving to state credits object
 */
export async function loadStateCredits() {
    try {
        return await fetchJSON('https://evincentive.kbb.com/api/state/summary');
    } catch (error) {
        console.warn('Failed to load state credits:', error);
        return {};
    }
}