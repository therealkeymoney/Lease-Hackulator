/**
 * API Utilities Module
 * Handles all external API calls with comprehensive error handling and fallbacks
 */

import { API_ENDPOINTS } from '../data/constants.js';

/**
 * Generic fetch utility with timeout and error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<Response>} - The fetch response
 * @throws {Error} - Network or timeout errors
 */
export async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
        }
        
        throw error;
    }
}

/**
 * Converts XML string to JSON object
 * @param {string} xmlStr - XML string to convert
 * @returns {Object} - Parsed JSON object
 */
export function xml2json(xmlStr) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('XML parsing failed');
        }
        
        function walk(node) {
            const obj = {};
            node.childNodes.forEach(child => {
                if (child.nodeType === 1) { // Element node
                    const key = child.nodeName;
                    const value = child.childNodes.length > 1 
                        ? walk(child) 
                        : child.textContent.trim();
                    obj[key] = obj[key] ? [].concat(obj[key], value) : value;
                }
            });
            return obj;
        }
        
        return walk(xmlDoc.documentElement);
    } catch (error) {
        console.error('XML to JSON conversion failed:', error);
        throw new Error('Failed to parse XML response');
    }
}

/**
 * Fetches and parses JSON with error handling
 * @param {string} url - URL to fetch JSON from
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Parsed JSON object
 */
export async function fetchJSON(url, options = {}) {
    try {
        const response = await fetchWithTimeout(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Failed to fetch JSON from ${url}:`, error);
        throw new Error(`API request failed: ${error.message}`);
    }
}

/**
 * Decodes VIN using NHTSA API with error handling and fallback
 * @param {string} vin - 17-character VIN to decode
 * @returns {Promise<Object>} - Decoded VIN data or fallback object
 */
export async function decodeVINAPI(vin) {
    if (!vin || vin.length !== 17) {
        throw new Error('Invalid VIN: must be 17 characters');
    }
    
    try {
        const url = `${API_ENDPOINTS.NHTSA_VIN_DECODE}/${vin}?format=json`;
        const data = await fetchJSON(url);
        
        if (!data.Results || !Array.isArray(data.Results)) {
            throw new Error('Invalid API response format');
        }
        
        const results = data.Results;
        
        // Extract key information with fallbacks
        const makeResult = results.find(r => r.Variable === 'Make') || 
                          results.find(r => r.Variable === 'Manufacturer');
        const modelResult = results.find(r => r.Variable === 'Model');
        const yearResult = results.find(r => r.Variable === 'Model Year');
        
        return {
            make: makeResult?.Value || '',
            model: modelResult?.Value || '',
            year: yearResult?.Value || '',
            success: true,
            source: 'nhtsa'
        };
        
    } catch (error) {
        console.warn(`VIN decode failed for ${vin}:`, error);
        
        // Fallback to local VIN parsing if API fails
        return decodeVINLocal(vin);
    }
}

/**
 * Local VIN decoding fallback using WMI patterns
 * @param {string} vin - VIN to decode locally
 * @returns {Object} - Basic decoded information
 */
function decodeVINLocal(vin) {
    try {
        const wmi = vin.substring(0, 3);
        const yearCode = vin.charAt(9);
        
        // Simple manufacturer detection based on WMI
        const manufacturerMap = {
            'JHM': 'Honda', 'JTD': 'Toyota', 'WBA': 'BMW', '1FA': 'Ford',
            'WDC': 'Mercedes-Benz', '1G1': 'Chevrolet', '1HG': 'Honda',
            'JF1': 'Subaru', 'JN1': 'Nissan', 'KMH': 'Hyundai'
        };
        
        // Year code mapping (simplified)
        const yearMap = {
            'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025
        };
        
        return {
            make: manufacturerMap[wmi] || '',
            model: '',
            year: yearMap[yearCode] || '',
            success: false,
            source: 'local_fallback'
        };
        
    } catch (error) {
        console.error('Local VIN decode failed:', error);
        return {
            make: '',
            model: '',
            year: '',
            success: false,
            source: 'failed'
        };
    }
}

/**
 * Loads federal tax credit data from fuel economy API
 * @returns {Promise<Array>} - Array of federal credit data
 */
export async function loadFederalCredits() {
    try {
        const response = await fetchWithTimeout(API_ENDPOINTS.FUEL_ECONOMY_CREDITS);
        const xmlText = await response.text();
        const xmlData = xml2json(xmlText);
        
        if (xmlData.vehicles && xmlData.vehicles.vehicle) {
            const vehicles = Array.isArray(xmlData.vehicles.vehicle) 
                ? xmlData.vehicles.vehicle 
                : [xmlData.vehicles.vehicle];
                
            return vehicles.map(v => ({
                make: v.make || '',
                model: v.model || '',
                year: parseInt(v.year) || 0,
                credit: parseInt(v.credit) || 0
            }));
        }
        
        return [];
        
    } catch (error) {
        console.error('Failed to load federal credits:', error);
        
        // Return fallback federal credits data
        return getFallbackFederalCredits();
    }
}

/**
 * Fallback federal credits data when API is unavailable
 * @returns {Array} - Static federal credits data
 */
function getFallbackFederalCredits() {
    return [
        { make: 'Tesla', model: 'Model 3', year: 2024, credit: 7500 },
        { make: 'Tesla', model: 'Model Y', year: 2024, credit: 7500 },
        { make: 'Ford', model: 'Mustang Mach-E', year: 2024, credit: 7500 },
        { make: 'Chevrolet', model: 'Bolt EV', year: 2024, credit: 7500 },
        { make: 'BMW', model: 'i4', year: 2024, credit: 7500 }
    ];
}

/**
 * Validates ZIP code format
 * @param {string} zip - ZIP code to validate
 * @returns {boolean} - True if valid format
 */
export function validateZipCode(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip.toString());
}

/**
 * Validates VIN format
 * @param {string} vin - VIN to validate
 * @returns {boolean} - True if valid format
 */
export function validateVIN(vin) {
    return typeof vin === 'string' && vin.length === 17 && /^[A-HJ-NPR-Z0-9]+$/i.test(vin);
}