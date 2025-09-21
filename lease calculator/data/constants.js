/**
 * Data Constants for Lease Hackulator
 * Contains all static data constants and mappings used throughout the application
 */

// Acquisition and disposition fees by manufacturer
export const FEES = {
    "Acura": { acq: 595, disp: 350 }, "Alfa Romeo": { acq: 795, disp: 395 }, "Audi": { acq: 895, disp: 395 },
    "Bentley": { acq: 1295, disp: 595 }, "BMW": { acq: 925, disp: 350 }, "Bugatti": { acq: 2500, disp: 1500 },
    "Buick": { acq: 595, disp: 400 }, "Cadillac": { acq: 695, disp: 395 }, "Chevrolet": { acq: 595, disp: 400 },
    "Chrysler": { acq: 695, disp: 395 }, "Dodge": { acq: 695, disp: 395 }, "Ford": { acq: 645, disp: 395 },
    "Genesis": { acq: 750, disp: 400 }, "GMC": { acq: 595, disp: 400 }, "Honda": { acq: 595, disp: 350 },
    "Hyundai": { acq: 595, disp: 400 }, "Infiniti": { acq: 695, disp: 395 }, "Jaguar": { acq: 895, disp: 595 },
    "Jeep": { acq: 695, disp: 395 }, "Kia": { acq: 595, disp: 400 }, "Land Rover": { acq: 895, disp: 595 },
    "Lexus": { acq: 695, disp: 350 }, "Lincoln": { acq: 645, disp: 395 }, "Maserati": { acq: 1095, disp: 595 },
    "Mazda": { acq: 595, disp: 350 }, "Mercedes-Benz": { acq: 895, disp: 395 }, "MINI": { acq: 925, disp: 350 },
    "Mitsubishi": { acq: 595, disp: 400 }, "Nissan": { acq: 595, disp: 395 }, "Polestar": { acq: 795, disp: 400 },
    "Porsche": { acq: 995, disp: 350 }, "Ram": { acq: 695, disp: 395 }, "Rivian": { acq: 995, disp: 595 },
    "Rolls-Royce": { acq: 2000, disp: 1200 }, "Subaru": { acq: 595, disp: 350 }, "Tesla": { acq: 1195, disp: 1000 },
    "Toyota": { acq: 650, disp: 350 }, "Volkswagen": { acq: 645, disp: 395 }, "Volvo": { acq: 895, disp: 395 }
};

// Residual value matrix by term and mileage
export const RESIDUAL_MATRIX = {
    "12": { "10K": 82, "12K": 80, "15K": 78, "18K": 76, "20K": 74, "25K": 70, "30K": 66 },
    "24": { "10K": 68, "12K": 66, "15K": 64, "18K": 62, "20K": 60, "25K": 56, "30K": 52 },
    "36": { "10K": 58, "12K": 56, "15K": 54, "18K": 52, "20K": 50, "25K": 46, "30K": 42 },
    "39": { "10K": 55, "12K": 53, "15K": 51, "18K": 49, "20K": 47, "25K": 43, "30K": 39 },
    "48": { "10K": 50, "12K": 48, "15K": 46, "18K": 44, "20K": 42, "25K": 38, "30K": 34 },
    "60": { "10K": 42, "12K": 40, "15K": 38, "18K": 36, "20K": 34, "25K": 30, "30K": 26 },
    "72": { "10K": 36, "12K": 34, "15K": 32, "18K": 30, "20K": 28, "25K": 24, "30K": 20 },
    "84": { "10K": 30, "12K": 28, "15K": 26, "18K": 24, "20K": 22, "25K": 18, "30K": 14 },
    "96": { "10K": 25, "12K": 23, "15K": 21, "18K": 19, "20K": 17, "25K": 13, "30K": 9 }
};

// US States with tax rates
export const STATES = [
    { code: "AL", name: "Alabama", tax: 4.0 }, { code: "AK", name: "Alaska", tax: 0.0 },
    { code: "AZ", name: "Arizona", tax: 5.6 }, { code: "AR", name: "Arkansas", tax: 6.5 },
    { code: "CA", name: "California", tax: 7.25 }, { code: "CO", name: "Colorado", tax: 2.9 },
    { code: "CT", name: "Connecticut", tax: 6.35 }, { code: "DE", name: "Delaware", tax: 0.0 },
    { code: "FL", name: "Florida", tax: 6.0 }, { code: "GA", name: "Georgia", tax: 4.0 },
    { code: "HI", name: "Hawaii", tax: 4.0 }, { code: "ID", name: "Idaho", tax: 6.0 },
    { code: "IL", name: "Illinois", tax: 6.25 }, { code: "IN", name: "Indiana", tax: 7.0 },
    { code: "IA", name: "Iowa", tax: 6.0 }, { code: "KS", name: "Kansas", tax: 6.5 },
    { code: "KY", name: "Kentucky", tax: 6.0 }, { code: "LA", name: "Louisiana", tax: 4.45 },
    { code: "ME", name: "Maine", tax: 5.5 }, { code: "MD", name: "Maryland", tax: 6.0 },
    { code: "MA", name: "Massachusetts", tax: 6.25 }, { code: "MI", name: "Michigan", tax: 6.0 },
    { code: "MN", name: "Minnesota", tax: 6.875 }, { code: "MS", name: "Mississippi", tax: 7.0 },
    { code: "MO", name: "Missouri", tax: 4.225 }, { code: "MT", name: "Montana", tax: 0.0 },
    { code: "NE", name: "Nebraska", tax: 5.5 }, { code: "NV", name: "Nevada", tax: 6.85 },
    { code: "NH", name: "New Hampshire", tax: 0.0 }, { code: "NJ", name: "New Jersey", tax: 6.625 },
    { code: "NM", name: "New Mexico", tax: 5.125 }, { code: "NY", name: "New York", tax: 4.0 },
    { code: "NC", name: "North Carolina", tax: 4.75 }, { code: "ND", name: "North Dakota", tax: 5.0 },
    { code: "OH", name: "Ohio", tax: 5.75 }, { code: "OK", name: "Oklahoma", tax: 4.5 },
    { code: "OR", name: "Oregon", tax: 0.0 }, { code: "PA", name: "Pennsylvania", tax: 6.0 },
    { code: "RI", name: "Rhode Island", tax: 7.0 }, { code: "SC", name: "South Carolina", tax: 6.0 },
    { code: "SD", name: "South Dakota", tax: 4.0 }, { code: "TN", name: "Tennessee", tax: 7.0 },
    { code: "TX", name: "Texas", tax: 6.25 }, { code: "UT", name: "Utah", tax: 5.95 },
    { code: "VT", name: "Vermont", tax: 6.0 }, { code: "VA", name: "Virginia", tax: 5.3 },
    { code: "WA", name: "Washington", tax: 6.5 }, { code: "WV", name: "West Virginia", tax: 6.0 },
    { code: "WI", name: "Wisconsin", tax: 5.0 }, { code: "WY", name: "Wyoming", tax: 4.0 }
];

// Money factors by manufacturer and tier
export const MONEY_FACTORS = {
    'Acura': { 2024: { tier1: 0.00125, tier2: 0.00150, tier3: 0.00200, tier4: 0.00250, tier5: 0.00300 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Alfa Romeo': { 2024: { tier1: 0.00167, tier2: 0.00188, tier3: 0.00229, tier4: 0.00271, tier5: 0.00313 }, 2025: { tier1: 0.00188, tier2: 0.00208, tier3: 0.00250, tier4: 0.00292, tier5: 0.00333 } },
    'Audi': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'BMW': { 2024: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 }, 2025: { tier1: 0.00146, tier2: 0.00167, tier3: 0.00208, tier4: 0.00250, tier5: 0.00292 } },
    'Cadillac': { 2024: { tier1: 0.00083, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00104, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Chevrolet': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Ford': { 2024: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 }, 2025: { tier1: 0.00146, tier2: 0.00167, tier3: 0.00208, tier4: 0.00250, tier5: 0.00292 } },
    'Genesis': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Honda': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Hyundai': { 2024: { tier1: 0.00083, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00104, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Infiniti': { 2024: { tier1: 0.00146, tier2: 0.00167, tier3: 0.00208, tier4: 0.00250, tier5: 0.00292 }, 2025: { tier1: 0.00167, tier2: 0.00188, tier3: 0.00229, tier4: 0.00271, tier5: 0.00313 } },
    'Kia': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Lexus': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Mercedes-Benz': { 2024: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 }, 2025: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 } },
    'Nissan': { 2024: { tier1: 0.00125, tier2: 0.00146, tier3: 0.00188, tier4: 0.00229, tier5: 0.00271 }, 2025: { tier1: 0.00146, tier2: 0.00167, tier3: 0.00208, tier4: 0.00250, tier5: 0.00292 } },
    'Tesla': { 2024: { tier1: 0.00208, tier2: 0.00250, tier3: 0.00292, tier4: 0.00333, tier5: 0.00375 }, 2025: { tier1: 0.00229, tier2: 0.00271, tier3: 0.00313, tier4: 0.00354, tier5: 0.00396 } },
    'Toyota': { 2024: { tier1: 0.00083, tier2: 0.00104, tier3: 0.00146, tier4: 0.00188, tier5: 0.00229 }, 2025: { tier1: 0.00104, tier2: 0.00125, tier3: 0.00167, tier4: 0.00208, tier5: 0.00250 } }
};

// EV incentives data structure
export const EV_INCENTIVES = {
    federal: {
        eligible: {
            'Tesla': { 'Model 3': 7500, 'Model Y': 7500 },
            'Ford': { 'Mustang Mach-E': 7500, 'F-150 Lightning': 7500 },
            'Chevrolet': { 'Bolt EV': 7500, 'Bolt EUV': 7500 },
            'BMW': { 'i4': 7500, 'iX': 7500 },
            'Mercedes-Benz': { 'EQB': 7500, 'EQE': 7500 }
        }
    },
    state: {
        'CA': { rebate: 2000, program: 'CVRP' },
        'CO': { rebate: 2500, program: 'Colorado EV Tax Credit' },
        'CT': { rebate: 2250, program: 'CHEAPR' },
        'GA': { rebate: 2500, program: 'Georgia EV Tax Credit' },
        'IL': { rebate: 4000, program: 'Illinois EV Rebate' },
        'MA': { rebate: 2500, program: 'MOR-EV' },
        'MN': { rebate: 2500, program: 'Minnesota EV Rebate' },
        'NJ': { rebate: 5000, program: 'Charge Up New Jersey' },
        'NY': { rebate: 2000, program: 'Drive Clean Rebate' },
        'OR': { rebate: 2500, program: 'Oregon Clean Vehicle Rebate' },
        'PA': { rebate: 1750, program: 'Alternative Fuel Vehicle Rebate' },
        'TX': { rebate: 2500, program: 'Texas EV Rebate' },
        'VT': { rebate: 3000, program: 'Incentive Program for New PEVs' }
    }
};

// VIN mapping for manufacturer and year decoding
export const VIN_MAPPING = {
    wmi: {
        manufacturers: {
            // Updated with new codes from request
            'W1N': 'Mercedes-Benz', '7YA': 'Hyundai', '3GP': 'Honda', '4W5': 'Acura',
            '3GW': 'Cadillac', '2GW': 'Cadillac', 'KM8': 'Hyundai',
            // Existing codes
            'JHM': 'Honda', 'JTD': 'Toyota', 'WBA': 'BMW', '1FA': 'Ford', 'WDC': 'Mercedes-Benz',
            '1G1': 'Chevrolet', '1G2': 'Pontiac', '1G3': 'Oldsmobile', '1G4': 'Buick', '1G6': 'Cadillac',
            '1H8': 'Acura', '1HG': 'Honda', 'JF1': 'Subaru', 'JF2': 'Subaru', 'JM1': 'Mazda',
            'JN1': 'Nissan', 'JT1': 'Toyota', 'JT2': 'Lexus', 'KMH': 'Hyundai', 'KNA': 'Kia',
            'WAU': 'Audi', 'WBS': 'BMW', 'WDD': 'Mercedes-Benz', 'WP0': 'Porsche', 'WVW': 'Volkswagen'
        }
    },
    modelYears: {
        'A': 1980, 'B': 1981, 'C': 1982, 'D': 1983, 'E': 1984, 'F': 1985, 'G': 1986, 'H': 1987,
        'J': 1988, 'K': 1989, 'L': 1990, 'M': 1991, 'N': 1992, 'P': 1993, 'R': 1994, 'S': 1995,
        'T': 1996, 'V': 1997, 'W': 1998, 'X': 1999, 'Y': 2000, '1': 2001, '2': 2002, '3': 2003,
        '4': 2004, '5': 2005, '6': 2006, '7': 2007, '8': 2008, '9': 2009,
        // 2010-2025 cycle (same codes repeat)
        'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014, 'F': 2015, 'G': 2016, 'H': 2017,
        'J': 2018, 'K': 2019, 'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025
    }
};

// ZIP code to state mapping with lookup functionality
export const ZIP_TO_STATE = {
    ranges: [
        { start: '00501', end: '00544', state: 'NY' }, { start: '01001', end: '02999', state: 'MA' },
        { start: '03001', end: '03999', state: 'NH' }, { start: '04001', end: '04999', state: 'ME' },
        { start: '05001', end: '05999', state: 'VT' }, { start: '06001', end: '06999', state: 'CT' },
        { start: '07001', end: '08999', state: 'NJ' }, { start: '10001', end: '14999', state: 'NY' },
        { start: '15001', end: '19699', state: 'PA' }, { start: '19701', end: '19999', state: 'DE' },
        { start: '20001', end: '20599', state: 'DC' }, { start: '20601', end: '21999', state: 'MD' },
        { start: '22001', end: '24699', state: 'VA' }, { start: '24701', end: '26999', state: 'WV' },
        { start: '27001', end: '28999', state: 'NC' }, { start: '29001', end: '29999', state: 'SC' },
        { start: '30001', end: '31999', state: 'GA' }, { start: '32001', end: '34999', state: 'FL' },
        { start: '35001', end: '36999', state: 'AL' }, { start: '37001', end: '38599', state: 'TN' },
        { start: '38601', end: '39799', state: 'MS' }, { start: '39801', end: '42799', state: 'KY' },
        { start: '43001', end: '45999', state: 'OH' }, { start: '46001', end: '47999', state: 'IN' },
        { start: '48001', end: '49999', state: 'MI' }, { start: '50001', end: '52999', state: 'IA' },
        { start: '53001', end: '54999', state: 'WI' }, { start: '55001', end: '56799', state: 'MN' },
        { start: '57001', end: '57999', state: 'SD' }, { start: '58001', end: '58999', state: 'ND' },
        { start: '59001', end: '59999', state: 'MT' }, { start: '60001', end: '62999', state: 'IL' },
        { start: '63001', end: '65999', state: 'MO' }, { start: '66001', end: '67999', state: 'KS' },
        { start: '68001', end: '69999', state: 'NE' }, { start: '70001', end: '71599', state: 'LA' },
        { start: '71601', end: '72999', state: 'AR' }, { start: '73001', end: '74999', state: 'OK' },
        { start: '75001', end: '79999', state: 'TX' }, { start: '80001', end: '81999', state: 'CO' },
        { start: '82001', end: '83199', state: 'WY' }, { start: '83201', end: '83999', state: 'ID' },
        { start: '84001', end: '84999', state: 'UT' }, { start: '85001', end: '86599', state: 'AZ' },
        { start: '87001', end: '88499', state: 'NM' }, { start: '89001', end: '89999', state: 'NV' },
        { start: '90001', end: '96199', state: 'CA' }, { start: '96701', end: '96898', state: 'HI' },
        { start: '97001', end: '97999', state: 'OR' }, { start: '98001', end: '99499', state: 'WA' },
        { start: '99501', end: '99999', state: 'AK' }
    ],
    lookup(zip) {
        const zipCode = zip.toString().padStart(5, '0');
        for (const range of this.ranges) {
            if (zipCode >= range.start && zipCode <= range.end) return range.state;
        }
        return null;
    }
};

// Derived constants
export const MAKES = Object.keys(FEES);