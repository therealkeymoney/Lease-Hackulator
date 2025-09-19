const wmiMapping = {
  // Complete country codes by first character
  countryRegions: {
    'A': 'Africa',     'B': 'Africa',     'C': 'Africa',
    'D': 'Europe',     'E': 'Europe',     'F': 'Europe', 
    'G': 'Europe',     'H': 'Asia',       'J': 'Asia',
    'K': 'Asia',       'L': 'Asia',       'M': 'Asia',
    'N': 'Asia',       'P': 'Asia',       'R': 'Asia',
    'S': 'Europe',     'T': 'Europe',     'U': 'Europe',
    'V': 'Europe',     'W': 'Europe',     'X': 'Europe',
    'Y': 'Europe',     'Z': 'Europe',     '1': 'North America',
    '2': 'North America', '3': 'North America', '4': 'North America',
    '5': 'North America', '6': 'Oceania',  '7': 'Oceania/North America',
    '8': 'South America', '9': 'South America', '0': 'Special'
  },

  // Complete country assignments
  countries: {
    // Africa (A-C)
    'AA': 'South Africa', 'AB': 'South Africa', 'AC': 'South Africa',
    'AD': 'South Africa', 'AE': 'South Africa', 'AF': 'South Africa',
    'AG': 'South Africa', 'AH': 'South Africa', 'AJ': 'Ivory Coast',
    'AK': 'Ivory Coast', 'AL': 'Lesotho', 'AM': 'Lesotho',
    'AN': 'Botswana', 'AP': 'Botswana', 'AR': 'Namibia',
    'AS': 'Namibia', 'AT': 'Madagascar', 'AU': 'Madagascar',
    'AV': 'Mauritius', 'AW': 'Mauritius', 'AX': 'Tunisia',
    'AY': 'Tunisia', 'AZ': 'Cyprus', 'A1': 'Cyprus',
    'A2': 'Zimbabwe', 'A3': 'Zimbabwe', 'A4': 'Mozambique',
    'A5': 'Mozambique',

    'BA': 'Angola', 'BB': 'Angola', 'BC': 'Ethiopia',
    'BF': 'Kenya', 'BG': 'Kenya', 'BH': 'Rwanda',
    'BL': 'Nigeria', 'BR': 'Algeria', 'BT': 'Swaziland',
    'BU': 'Uganda', 'B3': 'Libya', 'B4': 'Libya',

    'CA': 'Egypt', 'CB': 'Egypt', 'CF': 'Morocco',
    'CG': 'Morocco', 'CL': 'Zambia', 'CM': 'Zambia',

    // Asia (H-R)
    'H': 'China',
    'J': 'Japan',
    'K': 'South Korea',
    'L': 'China',
    'MA': 'India',
    'MF': 'Indonesia',

    // Europe (S-Z)
    'S': 'United Kingdom',
    'T': 'Switzerland',
    'U': 'Spain',
    'V': 'France',
    'W': 'Germany',
    'X': 'Russia',
    'Y': 'Sweden',
    'Z': 'Italy',

    // North America
    '1': 'United States',
    '2': 'Canada',
    '3': 'Mexico',
    '4': 'United States',
    '5': 'United States',

    // Oceania
    '6': 'Australia',
    '7': 'New Zealand',

    // South America
    '8': 'Argentina',
    '9': 'Brazil'
  },

  // Manufacturer assignments from vinMapping
  manufacturers: {
    'JHM': 'Honda',
    'JTD': 'Toyota',
    'WBA': 'BMW',
    '1FA': 'Ford',
    'WDC': 'Mercedes-Benz',
    '5YJ': 'Tesla',
    'SAL': 'Land Rover',
    'ZAM': 'Maserati',
    'ZFA': 'Fiat'
  },

  // Additional mappings for descriptive purposes
  descriptors: {
    bodyTypes: {
      'SED': 'Sedan',
      'SUV': 'Sport Utility Vehicle',
      'TRK': 'Truck',
      'VAN': 'Van',
      'CPE': 'Coupe',
      'CNV': 'Convertible'
    },
    engines: {
      'A': '1.4L I4',
      'B': '1.6L I4',
      'C': '2.0L I4',
      'D': '2.5L I4',
      'E': '3.0L V6',
      'F': '4.0L V8',
      'G': 'Electric',
      'H': 'Hybrid'
    },
    transmissions: {
      'M': 'Manual',
      'A': 'Automatic',
      'C': 'Continuously Variable Transmission (CVT)',
      'D': 'Dual-Clutch Transmission (DCT)'
    }
  },

  // Model years
  modelYears: {
    'A': 1980, 'B': 1981, 'C': 1982, 'D': 1983, 'E': 1984,
    'F': 1985, 'G': 1986, 'H': 1987, 'J': 1988, 'K': 1989,
    'L': 1990, 'M': 1991, 'N': 1992, 'P': 1993, 'R': 1994,
    'S': 1995, 'T': 1996, 'V': 1997, 'W': 1998, 'X': 1999,
    'Y': 2000, '1': 2001, '2': 2002, '3': 2003, '4': 2004,
    '5': 2005, '6': 2006, '7': 2007, '8': 2008, '9': 2009,
    'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
    'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
    'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024,
    'S': 2025
  }
};
const evIncentivesAndStateMappings = {
  // State-specific EV incentives
  stateIncentives: {
    'AL': { // Alabama
      rebate: 0,
      taxCredit: 0,
      otherIncentives: []
    },
    'AK': { // Alaska
      rebate: 0,
      taxCredit: 0,
      otherIncentives: []
    },
    'AZ': { // Arizona
      rebate: 0,
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'Reduced vehicle registration fees'
      ]
    },
    'CA': { // California
      rebate: 2000, // CVRP rebate (income qualified)
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'CVRP up to $7000 for low income',
        'Local utility rebates'
      ],
      additionalPrograms: {
        'CVRP': {
          standard: 2000,
          lowIncome: 4500,
          veryLowIncome: 7000
        }
      }
    },
    // Additional states from the existing mapping...
    'WA': { // Washington
      rebate: 0,
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'Sales tax exemption on EVs under $45k'
      ]
    }
  },

  // Income eligibility limits for federal credits
  incomeEligibility: {
    federal: {
      newEV: {
        singleFiler: 150000,
        headOfHousehold: 225000,
        jointFilers: 300000
      },
      usedEV: {
        singleFiler: 75000,
        headOfHousehold: 112500,
        jointFilers: 150000
      }
    }
  },

  // Used EV federal credit eligibility
  usedEVCredit: {
    maxCredit: 4000,
    maxVehiclePrice: 25000,
    ageRequirement: '2+ years old',
    requirements: [
      'Vehicle must be at least 2 years old',
      'Sale price under $25,000',
      'Must meet income requirements',
      'One credit per 3-year period per taxpayer'
    ]
  },

  // State registration details
  stateRegistrationMapping: {
    'AL': { // Alabama
      registrationFee: 23,
      titleFee: 15,
      salesTax: 0.04, // 4% state + local avg
      personalPropertyTax: true,
      inspectionRequired: false,
      emissionsTesting: false
    },
    'CA': { // California
      registrationFee: 64,
      titleFee: 23,
      salesTax: 0.0725, // 7.25% base + local
      vehicleLiceFee: function(value) {
        return value * 0.0065; // 0.65% of vehicle value
      },
      inspectionRequired: false,
      emissionsTesting: true,
      additionalFees: {
        smogAbatement: 20,
        airQuality: 1,
        serviceAuthority: 1
      }
    },
    // Additional states from the existing mapping...
    'WA': { // Washington
      registrationFee: 30,
      titleFee: 12,
      salesTax: 0.065, // 6.5% state + local avg ~10%
      rtaExciseTax: function(value, location) {
        // Regional Transit Authority tax in some areas
        if (location === 'Seattle Metro') return value * 0.008;
        return 0;
      },
      inspectionRequired: false,
      emissionsTesting: true // Some counties
    }
  },

  // ZIP code to state and metropolitan area mapping
  zipToStateMapping: {
    ranges: [
      { start: '00501', end: '00544', state: 'NY', region: 'Holtsville' },
      { start: '90001', end: '96199', state: 'CA', region: 'California' },
      { start: '98001', end: '99499', state: 'WA', region: 'Washington' }
    ],
    metropolitanAreas: {
      'Seattle': {
        state: 'WA',
        zips: ['98101-98199', '98201-98299']
      },
      'San Francisco': {
        state: 'CA',
        zips: ['94101-94199', '94201-94299']
      }
    },
    lookup: function(zip) {
      const zipCode = zip.toString().padStart(5, '0');
      for (const range of this.ranges) {
        if (zipCode >= range.start && zipCode <= range.end) {
          return { state: range.state, region: range.region, type: 'general' };
        }
      }
      for (const [metro, data] of Object.entries(this.metropolitanAreas)) {
        for (const range of data.zips) {
          const [start, end] = range.split('-');
          if (zipCode >= start && zipCode <= end) {
            return { state: data.state, metro, type: 'metropolitan' };
          }
        }
      }
      return null;
    }
  }
};
const zipToStateMapping = {
  // ZIP code ranges by state with major cities
  ranges: [
    // Northeast
    { start: '00501', end: '00544', state: 'NY', region: 'Holtsville' },
    { start: '00601', end: '00988', state: 'PR', region: 'Puerto Rico' },
    { start: '01001', end: '01299', state: 'MA', region: 'Western MA' },
    { start: '01301', end: '01499', state: 'MA', region: 'Central MA' },
    { start: '01501', end: '01699', state: 'MA', region: 'Worcester Area' },
    { start: '01701', end: '02799', state: 'MA', region: 'Greater Boston' },
    { start: '02801', end: '02999', state: 'RI', region: 'Rhode Island' },
    { start: '03031', end: '03897', state: 'NH', region: 'New Hampshire' },
    { start: '03901', end: '04992', state: 'ME', region: 'Maine' },
    { start: '05001', end: '05907', state: 'VT', region: 'Vermont' },
    { start: '06001', end: '06999', state: 'CT', region: 'Connecticut' },
    { start: '07001', end: '08999', state: 'NJ', region: 'New Jersey' },
    { start: '10001', end: '14999', state: 'NY', region: 'New York' },
    { start: '15001', end: '19699', state: 'PA', region: 'Pennsylvania' },

    // Southeast
    { start: '19701', end: '19999', state: 'DE', region: 'Delaware' },
    { start: '20001', end: '20599', state: 'DC', region: 'Washington DC' },
    { start: '20601', end: '21999', state: 'MD', region: 'Maryland' },
    { start: '22001', end: '24699', state: 'VA', region: 'Virginia' },
    { start: '24701', end: '26999', state: 'WV', region: 'West Virginia' },
    { start: '27001', end: '28999', state: 'NC', region: 'North Carolina' },
    { start: '29001', end: '29999', state: 'SC', region: 'South Carolina' },
    { start: '30001', end: '31999', state: 'GA', region: 'Georgia' },
    { start: '32001', end: '34999', state: 'FL', region: 'Florida' },
    { start: '35001', end: '36999', state: 'AL', region: 'Alabama' },
    { start: '37001', end: '38599', state: 'TN', region: 'Tennessee' },
    { start: '38601', end: '39799', state: 'MS', region: 'Mississippi' },
    { start: '39801', end: '42799', state: 'KY', region: 'Kentucky' },

    // Midwest
    { start: '43001', end: '45999', state: 'OH', region: 'Ohio' },
    { start: '46001', end: '47999', state: 'IN', region: 'Indiana' },
    { start: '48001', end: '49799', state: 'MI', region: 'Michigan' },
    { start: '49801', end: '49999', state: 'MI', region: 'Upper Peninsula' },
    { start: '50001', end: '52899', state: 'IA', region: 'Iowa' },
    { start: '53001', end: '54999', state: 'WI', region: 'Wisconsin' },
    { start: '55001', end: '56799', state: 'MN', region: 'Minnesota' },
    { start: '57001', end: '57799', state: 'SD', region: 'South Dakota' },
    { start: '58001', end: '58899', state: 'ND', region: 'North Dakota' },
    { start: '59001', end: '59999', state: 'MT', region: 'Montana' },
    { start: '60001', end: '62999', state: 'IL', region: 'Illinois' },
    { start: '63001', end: '65899', state: 'MO', region: 'Missouri' },
    { start: '66001', end: '67999', state: 'KS', region: 'Kansas' },
    { start: '68001', end: '69399', state: 'NE', region: 'Nebraska' },

    // Southwest
    { start: '70001', end: '71499', state: 'LA', region: 'Louisiana' },
    { start: '71601', end: '72999', state: 'AR', region: 'Arkansas' },
    { start: '73001', end: '74999', state: 'OK', region: 'Oklahoma' },
    { start: '75001', end: '79999', state: 'TX', region: 'Texas' },
    { start: '80001', end: '81699', state: 'CO', region: 'Colorado' },
    { start: '82001', end: '83199', state: 'WY', region: 'Wyoming' },
    { start: '83201', end: '83899', state: 'ID', region: 'Idaho' },
    { start: '84001', end: '84799', state: 'UT', region: 'Utah' },
    { start: '85001', end: '86599', state: 'AZ', region: 'Arizona' },
    { start: '87001', end: '88499', state: 'NM', region: 'New Mexico' },
    { start: '88501', end: '88599', state: 'TX', region: 'West Texas' },
    { start: '89001', end: '89899', state: 'NV', region: 'Nevada' },

    // West Coast
    { start: '90001', end: '96199', state: 'CA', region: 'California' },
    { start: '96701', end: '96898', state: 'HI', region: 'Hawaii' },
    { start: '97001', end: '97999', state: 'OR', region: 'Oregon' },
    { start: '98001', end: '99499', state: 'WA', region: 'Washington' },
    { start: '99501', end: '99999', state: 'AK', region: 'Alaska' }
  ],

  // Major metropolitan area ZIP code ranges
  metropolitanAreas: {
    'New York': {
      state: 'NY',
      zips: ['10001-10299', '10301-10314', '10451-10475', '11001-11499', '11501-11899']
    },
    'Los Angeles': {
      state: 'CA',
      zips: ['90001-90084', '90086-90089', '90091', '90093-90097', '90099', '90101-90103']
    },
    'Chicago': {
      state: 'IL',
      zips: ['60601-60661', '60664', '60666-60668', '60670', '60673-60674', '60675-60699']
    }
    // ... Include additional metropolitan areas
  },

  // Lookup function
  lookup: function(zip) {
    const zipCode = zip.toString().padStart(5, '0');

    // First check metropolitan areas
    for (const [metro, data] of Object.entries(this.metropolitanAreas)) {
      for (const range of data.zips) {
        const [start, end] = range.split('-');
        if (zipCode >= start && zipCode <= (end || start)) {
          return {
            state: data.state,
            metro,
            type: 'metropolitan'
          };
        }
      }
    }

    // Then check general ranges
    for (const range of this.ranges) {
      if (zipCode >= range.start && zipCode <= range.end) {
        return {
          state: range.state,
          region: range.region,
          type: 'general'
        };
      }
    }

    return null;
  },

  // Validate ZIP code format
  validate: function(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip.toString());
  }
};
const completeResidualValues = {
  'Acura': {
    'Sedan': { 
      24: { base: 69, luxury: 67, sport: 65 }, 
      36: { base: 62, luxury: 60, sport: 58 }, 
      48: { base: 55, luxury: 53, sport: 51 } 
    },
    'SUV': { 
      24: { base: 67, luxury: 65, sport: 63 }, 
      36: { base: 60, luxury: 58, sport: 56 }, 
      48: { base: 53, luxury: 51, sport: 49 } 
    },
    'Coupe': { 
      24: { base: 68, luxury: 66, sport: 64 }, 
      36: { base: 61, luxury: 59, sport: 57 }, 
      48: { base: 54, luxury: 52, sport: 50 } 
    }
  },
  'Alfa Romeo': {
    'Sedan': { 
      24: { base: 58, luxury: 56, sport: 54 }, 
      36: { base: 51, luxury: 49, sport: 47 }, 
      48: { base: 44, luxury: 42, sport: 40 } 
    },
    'SUV': { 
      24: { base: 60, luxury: 58, sport: 56 }, 
      36: { base: 53, luxury: 51, sport: 49 }, 
      48: { base: 46, luxury: 44, sport: 42 } 
    }
  },
  'Audi': {
    'Sedan': { 
      24: { base: 66, luxury: 63, sport: 61 }, 
      36: { base: 59, luxury: 56, sport: 53 }, 
      48: { base: 52, luxury: 49, sport: 46 } 
    },
    'SUV': { 
      24: { base: 63, luxury: 60, sport: 58 }, 
      36: { base: 56, luxury: 53, sport: 50 }, 
      48: { base: 49, luxury: 46, sport: 43 } 
    },
    'Coupe': { 
      24: { base: 65, luxury: 62, sport: 60 }, 
      36: { base: 58, luxury: 55, sport: 52 }, 
      48: { base: 51, luxury: 48, sport: 45 } 
    }
  },
  'Bentley': {
    'Sedan': { 
      24: { base: 55, luxury: 53, sport: 51 }, 
      36: { base: 48, luxury: 46, sport: 44 }, 
      48: { base: 41, luxury: 39, sport: 37 } 
    },
    'SUV': { 
      24: { base: 57, luxury: 55, sport: 53 }, 
      36: { base: 50, luxury: 48, sport: 46 }, 
      48: { base: 43, luxury: 41, sport: 39 } 
    },
    'Coupe': { 
      24: { base: 56, luxury: 54, sport: 52 }, 
      36: { base: 49, luxury: 47, sport: 45 }, 
      48: { base: 42, luxury: 40, sport: 38 } 
    }
  },
  'BMW': {
    'Sedan': { 
      24: { base: 68, luxury: 65, sport: 63 }, 
      36: { base: 61, luxury: 58, sport: 55 }, 
      48: { base: 54, luxury: 51, sport: 48 } 
    },
    'SUV': { 
      24: { base: 65, luxury: 62, sport: 60 }, 
      36: { base: 58, luxury: 55, sport: 52 }, 
      48: { base: 51, luxury: 48, sport: 45 } 
    },
    'Coupe': { 
      24: { base: 66, luxury: 63, sport: 61 }, 
      36: { base: 59, luxury: 56, sport: 53 }, 
      48: { base: 52, luxury: 49, sport: 46 } 
    }
  },
  'Bugatti': {
    'Coupe': { 
      24: { base: 45, luxury: 43, sport: 41 }, 
      36: { base: 38, luxury: 36, sport: 34 }, 
      48: { base: 31, luxury: 29, sport: 27 } 
    }
  },
  'Cadillac': {
    'Sedan': { 
      24: { base: 65, luxury: 62, sport: 60 }, 
      36: { base: 58, luxury: 55, sport: 52 }, 
      48: { base: 51, luxury: 48, sport: 45 } 
    },
    'SUV': { 
      24: { base: 62, luxury: 59, sport: 57 }, 
      36: { base: 55, luxury: 52, sport: 49 }, 
      48: { base: 48, luxury: 45, sport: 42 } 
    },
    'Coupe': { 
      24: { base: 64, luxury: 61, sport: 59 }, 
      36: { base: 57, luxury: 54, sport: 51 }, 
      48: { base: 50, luxury: 47, sport: 44 } 
    }
  },
  'Chevrolet': {
    'Sedan': { 
      24: { base: 62, luxury: 60, sport: 58 }, 
      36: { base: 55, luxury: 53, sport: 51 }, 
      48: { base: 48, luxury: 46, sport: 44 } 
    },
    'SUV': { 
      24: { base: 60, luxury: 58, sport: 56 }, 
      36: { base: 53, luxury: 51, sport: 49 }, 
      48: { base: 46, luxury: 44, sport: 42 } 
    },
    'Coupe': { 
      24: { base: 61, luxury: 59, sport: 57 }, 
      36: { base: 54, luxury: 52, sport: 50 }, 
      48: { base: 47, luxury: 45, sport: 43 } 
    }
  },
  'Chrysler': {
    'Sedan': { 
      24: { base: 58, luxury: 56, sport: 54 }, 
      36: { base: 51, luxury: 49, sport: 47 }, 
      48: { base: 44, luxury: 42, sport: 40 } 
    },
    'SUV': { 
      24: { base: 57, luxury: 55, sport: 53 }, 
      36: { base: 50, luxury: 48, sport: 46 }, 
      48: { base: 43, luxury: 41, sport: 39 } 
    }
  }
};
const completeFeesMapping = {
  'Acura': {
    acquisitionFee: 595,
    dispositionFee: 350,
    wearProtection: 'Optional - $899',
    earlyTerminationFee: 'Variable'
  },
  'Alfa Romeo': {
    acquisitionFee: 795,
    dispositionFee: 395,
    wearProtection: 'Optional - $1200',
    earlyTerminationFee: 'Variable'
  },
  'Audi': {
    acquisitionFee: 895,
    dispositionFee: 395,
    wearProtection: 1500,
    earlyTerminationFee: 'Variable'
  },
  'Bentley': {
    acquisitionFee: 1295,
    dispositionFee: 595,
    wearProtection: 2500,
    earlyTerminationFee: 'Variable'
  },
  'BMW': {
    acquisitionFee: 925,
    dispositionFee: 350,
    wearProtection: 1200,
    earlyTerminationFee: 'Variable'
  },
  'Bugatti': {
    acquisitionFee: 2500,
    dispositionFee: 1500,
    wearProtection: 'Not Available',
    earlyTerminationFee: 'Variable'
  },
  'Cadillac': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1299',
    earlyTerminationFee: 'Variable'
  },
  'Chevrolet': {
    acquisitionFee: 595,
    dispositionFee: 400,
    wearProtection: 'Optional - $999',
    earlyTerminationFee: 'Variable'
  },
  'Chrysler': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1099',
    earlyTerminationFee: 'Variable'
  },
  'Dodge': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1199',
    earlyTerminationFee: 'Variable'
  },
  'Ford': {
    acquisitionFee: 645,
    dispositionFee: 395,
    wearProtection: 'Optional - $1199',
    earlyTerminationFee: 'Variable'
  },
  'Genesis': {
    acquisitionFee: 750,
    dispositionFee: 400,
    wearProtection: 'Optional - $1399',
    earlyTerminationFee: 'Variable'
  },
  'GMC': {
    acquisitionFee: 595,
    dispositionFee: 400,
    wearProtection: 'Optional - $999',
    earlyTerminationFee: 'Variable'
  },
  'Honda': {
    acquisitionFee: 595,
    dispositionFee: 350,
    wearProtection: 'Optional - $899',
    earlyTerminationFee: 'Variable'
  },
  'Hyundai': {
    acquisitionFee: 595,
    dispositionFee: 400,
    wearProtection: 'Optional - $1199',
    earlyTerminationFee: 'Variable'
  },
  'Infiniti': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1299',
    earlyTerminationFee: 'Variable'
  },
  'Jaguar': {
    acquisitionFee: 895,
    dispositionFee: 595,
    wearProtection: 1800,
    earlyTerminationFee: 'Variable'
  },
  'Jeep': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1299',
    earlyTerminationFee: 'Variable'
  },
  'Kia': {
    acquisitionFee: 595,
    dispositionFee: 400,
    wearProtection: 'Optional - $1099',
    earlyTerminationFee: 'Variable'
  },
  'Land Rover': {
    acquisitionFee: 895,
    dispositionFee: 595,
    wearProtection: 1995,
    earlyTerminationFee: 'Variable'
  },
  'Lexus': {
    acquisitionFee: 695,
    dispositionFee: 350,
    wearProtection: 1000,
    earlyTerminationFee: 'Variable'
  },
  'Lincoln': {
    acquisitionFee: 645,
    dispositionFee: 395,
    wearProtection: 'Optional - $1199',
    earlyTerminationFee: 'Variable'
  },
  'Maserati': {
    acquisitionFee: 1095,
    dispositionFee: 595,
    wearProtection: 2200,
    earlyTerminationFee: 'Variable'
  },
  'Mazda': {
    acquisitionFee: 595,
    dispositionFee: 350,
    wearProtection: 'Optional - $999',
    earlyTerminationFee: 'Variable'
  },
  'Mercedes-Benz': {
    acquisitionFee: 895,
    dispositionFee: 395,
    wearProtection: 1500,
    earlyTerminationFee: 'Variable'
  },
  'MINI': {
    acquisitionFee: 925,
    dispositionFee: 350,
    wearProtection: 1200,
    earlyTerminationFee: 'Variable'
  },
  'Mitsubishi': {
    acquisitionFee: 595,
    dispositionFee: 400,
    wearProtection: 'Optional - $899',
    earlyTerminationFee: 'Variable'
  },
  'Nissan': {
    acquisitionFee: 595,
    dispositionFee: 395,
    wearProtection: 'Optional - $999',
    earlyTerminationFee: 'Variable'
  },
  'Polestar': {
    acquisitionFee: 795,
    dispositionFee: 400,
    wearProtection: 'Optional - $1299',
    earlyTerminationFee: 'Variable'
  },
  'Porsche': {
    acquisitionFee: 995,
    dispositionFee: 350,
    wearProtection: 1695,
    earlyTerminationFee: 'Variable'
  },
  'Ram': {
    acquisitionFee: 695,
    dispositionFee: 395,
    wearProtection: 'Optional - $1299',
    earlyTerminationFee: 'Variable'
  },
  'Rivian': {
    acquisitionFee: 995,
    dispositionFee: 595,
    wearProtection: 'Not Available',
    earlyTerminationFee: 'Variable'
  },
  'Rolls-Royce': {
    acquisitionFee: 2000,
    dispositionFee: 1200,
    wearProtection: 'Not Available',
    earlyTerminationFee: 'Variable'
  },
  'Subaru': {
    acquisitionFee: 595,
    dispositionFee: 350,
    wearProtection: 'Optional - $999',
    earlyTerminationFee: 'Variable'
  },
  'Tesla': {
    acquisitionFee: 1195,
    dispositionFee: 1000,
    wearProtection: 'Not Available',
    earlyTerminationFee: 'Variable'
  },
  'Toyota': {
    acquisitionFee: 650,
    dispositionFee: 350,
    wearProtection: 'Optional - $899',
    earlyTerminationFee: 'Variable'
  },
  'Volkswagen': {
    acquisitionFee: 645,
    dispositionFee: 395,
    wearProtection: 'Optional - $1199',
    earlyTerminationFee: 'Variable'
  },
  'Volvo': {
    acquisitionFee: 895,
    dispositionFee: 395,
    wearProtection: 1200,
    earlyTerminationFee: 'Variable'
  }
};
const expandedEvIncentives = {
  federalEligibility: {
    'Audi': {
      models: {
        'Q5 PHEV': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Brussels, Belgium', notes: 'Eligible under leasing loophole' },
        'Q6 e-tron': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Ingolstadt, Germany', notes: 'Eligible under leasing loophole' },
        'Q8 e-tron': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Brussels, Belgium', notes: 'Eligible under leasing loophole' },
        'SQ6 e-tron': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Ingolstadt, Germany', notes: 'Eligible under leasing loophole' },
        'SQ8 e-tron': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Brussels, Belgium', notes: 'Eligible under leasing loophole' },
        'A6 e-tron': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Neckarsulm, Germany', notes: 'Eligible under leasing loophole' },
        'S6 e-tron': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Neckarsulm, Germany', notes: 'Eligible under leasing loophole' },
        'e-tron': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'e-tron GT': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'Q4 e-tron': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' }
      }
    },
    'BMW': {
      models: {
        'i4': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Munich, Germany', notes: 'Eligible under leasing loophole' },
        'iX': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Dingolfing, Germany', notes: 'Eligible under leasing loophole' },
        'i7': { eligible: false, reason: 'MSRP exceeds sedan cap' },
        'i5': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Dingolfing, Germany', notes: 'Eligible under leasing loophole' },
        'iX3': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Shenyang, China', notes: 'Eligible under leasing loophole' },
        'iX5': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Spartanburg, SC' },
        '330e': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Munich, Germany', notes: 'Eligible under leasing loophole' }
      }
    },
    'Chevrolet': {
      models: {
        'Blazer EV': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Ramos Arizpe, Mexico' },
        'Equinox EV': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Ramos Arizpe, Mexico' }
      }
    },
    'Hyundai': {
      models: {
        'IONIQ 5': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'IONIQ 6': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'Kona Electric': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'IONIQ 9': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Ulsan, South Korea', notes: 'Eligible under leasing loophole' },
        'IONIQ 5 N': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Ulsan, South Korea', notes: 'Eligible under leasing loophole' }
      }
    },
    'Porsche': {
      models: {
        'Taycan': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'Macan EV': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' },
        'Cayenne PHEV': { eligible: false, reason: 'Final assembly outside North America', notes: 'Eligible under leasing loophole' }
      }
    },
    'Genesis': {
      models: {
        'Electrified G80': { eligible: true, msrpCap: 75000, creditAmount: 7500, assemblyLocation: 'Ulsan, South Korea', notes: 'Eligible under leasing loophole' }
      }
    },
    'Toyota': {
      models: {
        'RAV4 Prime': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Nagakusa, Japan', notes: 'Eligible under leasing loophole' },
        'bZ4x': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Motomachi, Japan', notes: 'Eligible under leasing loophole' }
      }
    },
    'Subaru': {
      models: {
        'Solterra': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Gunma, Japan', notes: 'Eligible under leasing loophole' }
      }
    },
    'Mercedes-Benz': {
      models: {
        'EQB': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Kecskemét, Hungary', notes: 'Eligible under leasing loophole' },
        'EQE': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Bremen, Germany', notes: 'Eligible under leasing loophole' },
        'EQS': { eligible: false, reason: 'MSRP exceeds sedan cap' },
        'EQS SUV': { eligible: false, reason: 'MSRP exceeds SUV cap' },
        'GLC350e': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Bremen, Germany', notes: 'Eligible under leasing loophole' },
        'GLE450e': { eligible: true, msrpCap: 80000, creditAmount: 7500, assemblyLocation: 'Tuscaloosa, AL' },
        'CLA-Class EV': { eligible: true, msrpCap: 55000, creditAmount: 7500, assemblyLocation: 'Kecskemét, Hungary', notes: 'Eligible under leasing loophole' }
      }
    },
    'Lucid': {
      models: {
        'Air': { eligible: false, reason: 'MSRP exceeds sedan cap' },
        'Gravity': { eligible: false, reason: 'MSRP exceeds SUV cap' }
      }
    }
  }
};
const stateIncentives = {
  'CA': {
    rebate: 2000,
    additionalPrograms: {
      'CVRP': {
        Tesla: { standard: 1000, lowIncome: 2500, veryLowIncome: 4500 },
        'BMW': { standard: 2000, lowIncome: 4500, veryLowIncome: 7000 },
        'Mercedes-Benz': { standard: 2000, lowIncome: 4500, veryLowIncome: 7000 },
        'Audi': { standard: 2000, lowIncome: 4500, veryLowIncome: 7000 },
        'Ford': { standard: 2000, lowIncome: 4500, veryLowIncome: 7000 },
        'General Motors': { standard: 2000, lowIncome: 4500, veryLowIncome: 7000 },
        'Hyundai': { standard: 1500, lowIncome: 3000, veryLowIncome: 5000 },
        'Kia': { standard: 1500, lowIncome: 3000, veryLowIncome: 5000 },
        'Volkswagen': { standard: 2000, lowIncome: 4000, veryLowIncome: 6000 }
      }
    }
  },
  'CO': {
    rebate: 2500,
    additionalPrograms: {
      'Colorado EV Tax Credit': {
        newEV: 5000,
        usedEV: 3500,
        incomeCapSingle: 100000,
        incomeCapJoint: 200000
      }
    }
  },
  'CT': {
    rebate: 2250,
    additionalPrograms: {
      'CHEAPR': {
        standard: 2250,
        usedEV: 3000,
        lowIncome: 5000
      }
    }
  },
  'GA': {
    taxCredit: 2500,
    requirements: ['Purchase new EV', 'Register in Georgia', 'Georgia resident']
  },
  'IL': {
    rebate: 4000,
    additionalPrograms: {
      'Illinois EV Rebate': {
        standard: 4000,
        lowIncome: 8000
      }
    }
  },
  'MA': {
    rebate: 2500,
    additionalPrograms: {
      'MOR-EV': {
        standard: 2500,
        lowIncome: 3500
      }
    }
  },
  'MN': {
    rebate: 2500,
    requirements: ['Income qualified', 'New vehicle purchase', 'Minnesota resident']
  },
  'NJ': {
    rebate: 5000,
    additionalPrograms: {
      'Charge Up New Jersey': {
        standard: 5000,
        usedEV: 2500
      }
    }
  },
  'NY': {
    rebate: 2000,
    additionalPrograms: {
      'Drive Clean Rebate': {
        standard: 2000,
        lowIncome: 6000
      }
    }
  },
  'OR': {
    rebate: 2500,
    additionalPrograms: {
      'Oregon Clean Vehicle Rebate': {
        standard: 2500,
        lowIncome: 5000,
        chargeAhead: 2500
      }
    }
  },
  'PA': {
    rebate: 1750,
    additionalPrograms: {
      'Alternative Fuel Vehicle Rebate': {
        standard: 1750,
        fleet: 2000
      }
    }
  },
  'TX': {
    rebate: 2500,
    additionalPrograms: {
      'Texas EV Rebate': {
        standard: 2500,
        lowIncome: 5000
      }
    }
  },
  'VT': {
    rebate: 3000,
    additionalPrograms: {
      'Incentive Program for New PEVs': {
        standard: 3000,
        lowIncome: 5000,
        usedEV: 1500
      }
    }
  },
  'WA': {
    rebate: 0,
    otherIncentives: [
      'HOV lane access',
      'Sales tax exemption on EVs under $45k',
      'Reduced ferry fares'
    ]
  }
};
const evIncentivesAndStateMappings = {
  // State-specific EV incentives
  stateIncentives: {
    'AL': { // Alabama
      rebate: 0,
      taxCredit: 0,
      otherIncentives: []
    },
    'AK': { // Alaska
      rebate: 0,
      taxCredit: 0,
      otherIncentives: []
    },
    'AZ': { // Arizona
      rebate: 0,
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'Reduced vehicle registration fees'
      ]
    },
    'CA': { // California
      rebate: 2000, // CVRP rebate (income qualified)
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'CVRP up to $7000 for low income',
        'Local utility rebates'
      ],
      additionalPrograms: {
        'CVRP': {
          standard: 2000,
          lowIncome: 4500,
          veryLowIncome: 7000
        }
      }
    },
    // Additional states from the existing mapping...
    'WA': { // Washington
      rebate: 0,
      taxCredit: 0,
      otherIncentives: [
        'HOV lane access',
        'Sales tax exemption on EVs under $45k'
      ]
    }
  },

  // Income eligibility limits for federal credits
  incomeEligibility: {
    federal: {
      newEV: {
        singleFiler: 150000,
        headOfHousehold: 225000,
        jointFilers: 300000
      },
      usedEV: {
        singleFiler: 75000,
        headOfHousehold: 112500,
        jointFilers: 150000
      }
    }
  },

  // Used EV federal credit eligibility
  usedEVCredit: {
    maxCredit: 4000,
    maxVehiclePrice: 25000,
    ageRequirement: '2+ years old',
    requirements: [
      'Vehicle must be at least 2 years old',
      'Sale price under $25,000',
      'Must meet income requirements',
      'One credit per 3-year period per taxpayer'
    ]
  },

  // State registration details
  stateRegistrationMapping: {
    'AL': { // Alabama
      registrationFee: 23,
      titleFee: 15,
      salesTax: 0.04, // 4% state + local avg
      personalPropertyTax: true,
      inspectionRequired: false,
      emissionsTesting: false
    },
    'CA': { // California
      registrationFee: 64,
      titleFee: 23,
      salesTax: 0.0725, // 7.25% base + local
      vehicleLiceFee: function(value) {
        return value * 0.0065; // 0.65% of vehicle value
      },
      inspectionRequired: false,
      emissionsTesting: true,
      additionalFees: {
        smogAbatement: 20,
        airQuality: 1,
        serviceAuthority: 1
      }
    },
    // Additional states from the existing mapping...
    'WA': { // Washington
      registrationFee: 30,
      titleFee: 12,
      salesTax: 0.065, // 6.5% state + local avg ~10%
      rtaExciseTax: function(value, location) {
        // Regional Transit Authority tax in some areas
        if (location === 'Seattle Metro') return value * 0.008;
        return 0;
      },
      inspectionRequired: false,
      emissionsTesting: true // Some counties
    }
  },

  // ZIP code to state and metropolitan area mapping
  zipToStateMapping: {
    ranges: [
      { start: '00501', end: '00544', state: 'NY', region: 'Holtsville' },
      { start: '90001', end: '96199', state: 'CA', region: 'California' },
      { start: '98001', end: '99499', state: 'WA', region: 'Washington' }
    ],
    metropolitanAreas: {
      'Seattle': {
        state: 'WA',
        zips: ['98101-98199', '98201-98299']
      },
      'San Francisco': {
        state: 'CA',
        zips: ['94101-94199', '94201-94299']
      }
    },
    lookup: function(zip) {
      const zipCode = zip.toString().padStart(5, '0');
      for (const range of this.ranges) {
        if (zipCode >= range.start && zipCode <= range.end) {
          return { state: range.state, region: range.region, type: 'general' };
        }
      }
      for (const [metro, data] of Object.entries(this.metropolitanAreas)) {
        for (const range of data.zips) {
          const [start, end] = range.split('-');
          if (zipCode >= start && zipCode <= end) {
            return { state: data.state, metro, type: 'metropolitan' };
          }
        }
      }
      return null;
    }
  }
};
const zipToStateMapping = {
  // ZIP code ranges by state with major cities
  ranges: [
    // Northeast
    { start: '00501', end: '00544', state: 'NY', region: 'Holtsville' },
    { start: '00601', end: '00988', state: 'PR', region: 'Puerto Rico' },
    { start: '01001', end: '01299', state: 'MA', region: 'Western MA' },
    { start: '01301', end: '01499', state: 'MA', region: 'Central MA' },
    { start: '01501', end: '01699', state: 'MA', region: 'Worcester Area' },
    { start: '01701', end: '02799', state: 'MA', region: 'Greater Boston' },
    { start: '02801', end: '02999', state: 'RI', region: 'Rhode Island' },
    { start: '03031', end: '03897', state: 'NH', region: 'New Hampshire' },
    { start: '03901', end: '04992', state: 'ME', region: 'Maine' },
    { start: '05001', end: '05907', state: 'VT', region: 'Vermont' },
    { start: '06001', end: '06999', state: 'CT', region: 'Connecticut' },
    { start: '07001', end: '08999', state: 'NJ', region: 'New Jersey' },
    { start: '10001', end: '14999', state: 'NY', region: 'New York' },
    { start: '15001', end: '19699', state: 'PA', region: 'Pennsylvania' },

    // Southeast
    { start: '19701', end: '19999', state: 'DE', region: 'Delaware' },
    { start: '20001', end: '20599', state: 'DC', region: 'Washington DC' },
    { start: '20601', end: '21999', state: 'MD', region: 'Maryland' },
    { start: '22001', end: '24699', state: 'VA', region: 'Virginia' },
    { start: '24701', end: '26999', state: 'WV', region: 'West Virginia' },
    { start: '27001', end: '28999', state: 'NC', region: 'North Carolina' },
    { start: '29001', end: '29999', state: 'SC', region: 'South Carolina' },
    { start: '30001', end: '31999', state: 'GA', region: 'Georgia' },
    { start: '32001', end: '34999', state: 'FL', region: 'Florida' },
    { start: '35001', end: '36999', state: 'AL', region: 'Alabama' },
    { start: '37001', end: '38599', state: 'TN', region: 'Tennessee' },
    { start: '38601', end: '39799', state: 'MS', region: 'Mississippi' },
    { start: '39801', end: '42799', state: 'KY', region: 'Kentucky' },

    // Midwest
    { start: '43001', end: '45999', state: 'OH', region: 'Ohio' },
    { start: '46001', end: '47999', state: 'IN', region: 'Indiana' },
    { start: '48001', end: '49799', state: 'MI', region: 'Michigan' },
    { start: '49801', end: '49999', state: 'MI', region: 'Upper Peninsula' },
    { start: '50001', end: '52899', state: 'IA', region: 'Iowa' },
    { start: '53001', end: '54999', state: 'WI', region: 'Wisconsin' },
    { start: '55001', end: '56799', state: 'MN', region: 'Minnesota' },
    { start: '57001', end: '57799', state: 'SD', region: 'South Dakota' },
    { start: '58001', end: '58899', state: 'ND', region: 'North Dakota' },
    { start: '59001', end: '59999', state: 'MT', region: 'Montana' },
    { start: '60001', end: '62999', state: 'IL', region: 'Illinois' },
    { start: '63001', end: '65899', state: 'MO', region: 'Missouri' },
    { start: '66001', end: '67999', state: 'KS', region: 'Kansas' },
    { start: '68001', end: '69399', state: 'NE', region: 'Nebraska' },

    // Southwest
    { start: '70001', end: '71499', state: 'LA', region: 'Louisiana' },
    { start: '71601', end: '72999', state: 'AR', region: 'Arkansas' },
    { start: '73001', end: '74999', state: 'OK', region: 'Oklahoma' },
    { start: '75001', end: '79999', state: 'TX', region: 'Texas' },
    { start: '80001', end: '81699', state: 'CO', region: 'Colorado' },
    { start: '82001', end: '83199', state: 'WY', region: 'Wyoming' },
    { start: '83201', end: '83899', state: 'ID', region: 'Idaho' },
    { start: '84001', end: '84799', state: 'UT', region: 'Utah' },
    { start: '85001', end: '86599', state: 'AZ', region: 'Arizona' },
    { start: '87001', end: '88499', state: 'NM', region: 'New Mexico' },
    { start: '88501', end: '88599', state: 'TX', region: 'West Texas' },
    { start: '89001', end: '89899', state: 'NV', region: 'Nevada' },

    // West Coast
    { start: '90001', end: '96199', state: 'CA', region: 'California' },
    { start: '96701', end: '96898', state: 'HI', region: 'Hawaii' },
    { start: '97001', end: '97999', state: 'OR', region: 'Oregon' },
    { start: '98001', end: '99499', state: 'WA', region: 'Washington' },
    { start: '99501', end: '99999', state: 'AK', region: 'Alaska' }
  ],

  // Major metropolitan area ZIP code ranges
  metropolitanAreas: {
    'New York': {
      state: 'NY',
      zips: ['10001-10299', '10301-10314', '10451-10475', '11001-11499', '11501-11899']
    },
    'Los Angeles': {
      state: 'CA',
      zips: ['90001-90084', '90086-90089', '90091', '90093-90097', '90099', '90101-90103']
    },
    'Chicago': {
      state: 'IL',
      zips: ['60601-60661', '60664', '60666-60668', '60670', '60673-60674', '60675-60699']
    }
    // ... Include additional metropolitan areas
  },

  // Lookup function
  lookup: function(zip) {
    const zipCode = zip.toString().padStart(5, '0');

    // First check metropolitan areas
    for (const [metro, data] of Object.entries(this.metropolitanAreas)) {
      for (const range of data.zips) {
        const [start, end] = range.split('-');
        if (zipCode >= start && zipCode <= (end || start)) {
          return {
            state: data.state,
            metro,
            type: 'metropolitan'
          };
        }
      }
    }

    // Then check general ranges
    for (const range of this.ranges) {
      if (zipCode >= range.start && zipCode <= range.end) {
        return {
          state: range.state,
          region: range.region,
          type: 'general'
        };
      }
    }

    return null;
  },

  // Validate ZIP code format
  validate: function(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip.toString());
  }
};
// Lease Hackulator JavaScript: Complete unified script for production
// All data structures and functionality merged into one file

// ===============================================
// GLOBAL DATA STRUCTURES - PRODUCTION READY
// ===============================================

const FEES = {
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

const RESIDUAL_MATRIX = {
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

const STATES = [
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

const MAKES = Object.keys(FEES);

// ===============================================
// MONEY FACTORS BY MANUFACTURER AND TIER
// ===============================================

const MONEY_FACTORS = {
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

// ===============================================
// VIN MAPPING DATA
// ===============================================

const VIN_MAPPING = {
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

// ===============================================
// EV INCENTIVES DATA
// ===============================================

const EV_INCENTIVES = {
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

// ===============================================
// ZIP TO STATE MAPPING
// ===============================================

const ZIP_TO_STATE = {
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

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function xml2json(xmlStr) {
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

async function fetchJSON(url, options = {}, fallback = null) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`Failed to fetch data from ${url}:`, error);
        
        if (fallback !== null) {
            console.log('Using fallback data');
            return fallback;
        }
        
        throw new Error(`Network request failed: ${error.message}`);
    }
}

// ===============================================
// LIVE DATA VARIABLES
// ===============================================

let FED_CREDITS = [];
let STATE_CREDITS = {};

// ===============================================
// DATA PRELOADING FUNCTIONS
// ===============================================

async function preloadIncentiveData() {
    try {
        console.log('Loading live incentive data...');
        
        // Load federal credits with error handling
        try {
            const xmlResponse = await fetchJSON(
                'https://www.fueleconomy.gov/ws/rest/vehicles/taxcredit?format=json',
                { timeout: 10000 },
                null
            );
            
            if (xmlResponse && typeof xmlResponse === 'string') {
                const xmlData = xml2json(xmlResponse);
                
                if (xmlData?.vehicles?.vehicle) {
                    const vehicles = Array.isArray(xmlData.vehicles.vehicle) 
                        ? xmlData.vehicles.vehicle 
                        : [xmlData.vehicles.vehicle];
                        
                    FED_CREDITS = vehicles.map(v => ({
                        make: v.make || '',
                        model: v.model || '',
                        year: parseInt(v.year) || 0,
                        amount: parseInt(v.credit) || 0
                    })).filter(v => v.make && v.model && v.year && v.amount);
                    
                    console.log(`Loaded ${FED_CREDITS.length} federal credit entries`);
                }
            }
        } catch (federalError) {
            console.warn('Failed to load federal credits:', federalError);
            FED_CREDITS = [];
        }

        // Load state credits with error handling
        try {
            STATE_CREDITS = await fetchJSON(
                'https://evincentive.kbb.com/api/state/summary',
                { timeout: 10000 },
                EV_INCENTIVES?.state || {}
            );
        } catch (stateError) {
            console.warn('Failed to load state credits:', stateError);
            STATE_CREDITS = EV_INCENTIVES?.state || {};
        }
        
        console.log('Live incentive data loading completed');
        
    } catch (error) {
        console.error('Failed to load live incentive data:', error);
        // Use fallback static data
        FED_CREDITS = [];
        STATE_CREDITS = EV_INCENTIVES?.state || {};
    }
}

// ===============================================
// CREDIT LOOKUP FUNCTIONS
// ===============================================

function getFederalCredit(make, model, year) {
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

function getStateCredit(stateCode) {
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

// ===============================================
// VIN DECODING FUNCTIONS
// ===============================================

async function decodeVIN(vin, suffix) {
    // Validate VIN format first
    if (!vin || vin.length !== 17) {
        console.warn('Invalid VIN length');
        return;
    }
    
    // Additional VIN validation
    const cleanVin = vin.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (cleanVin.length !== 17 || /[IOQ]/.test(cleanVin)) {
        console.warn('Invalid VIN format');
        return;
    }
    
    try {
        console.log(`Decoding VIN: ${vin}`);
        
        const response = await fetchJSON(
            `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`,
            { timeout: 10000 },
            null
        );
        
        if (!response?.Results) {
            throw new Error('Invalid response from VIN decode API');
        }
        
        const results = response.Results;
        
        // Extract data with better error handling
        const make = extractVinValue(results, ['Make', 'Manufacturer']);
        const model = extractVinValue(results, ['Model']);
        const year = extractVinValue(results, ['Model Year']);
        
        if (!make || !model || !year) {
            throw new Error('Incomplete VIN data received');
        }
        
        // Update form fields safely
        updateFormField(`make${suffix}`, make);
        updateFormField(`model${suffix}`, model);
        updateFormField(`year${suffix}`, year);
        
        // Update dependent fields
        updateFees(suffix);
        updateEVCredits(suffix);
        
        console.log(`VIN decoded successfully: ${year} ${make} ${model}`);
        
    } catch (error) {
        console.error('VIN decode failed:', error);
        // Show user-friendly error message
        showVinDecodeError(suffix, error.message);
    }
}

// Helper function to extract values from VIN decode results
function extractVinValue(results, variables) {
    for (const variable of variables) {
        const result = results.find(r => r.Variable === variable);
        if (result && result.Value && result.Value !== 'Not Applicable') {
            return result.Value;
        }
    }
    return null;
}

// Helper function to safely update form fields
function updateFormField(fieldId, value) {
    const element = document.getElementById(fieldId);
    if (element && value) {
        element.value = value;
    }
}

// Helper function to show VIN decode errors
function showVinDecodeError(suffix, message) {
    // This would ideally show a user-friendly error message
    // For now, just log it
    console.warn(`VIN decode error for vehicle ${suffix}: ${message}`);
}

// ===============================================
// FORM UPDATE FUNCTIONS
// ===============================================

function updateFees(suffix) {
    const makeEl = document.getElementById(`make${suffix}`);
    const acqEl = document.getElementById(`acq${suffix}`);
    const dispEl = document.getElementById(`disp${suffix}`);
    
    if (makeEl && acqEl && dispEl) {
        const make = makeEl.value;
        if (FEES[make]) {
            acqEl.value = FEES[make].acq;
            dispEl.value = FEES[make].disp;
        }
    }
}

function updateCapCost(suffix) {
    const msrpEl = document.getElementById(`msrp${suffix}`);
    const sellEl = document.getElementById(`sellingPrice${suffix}`);
    const capEl = document.getElementById(`capCost${suffix}`);
    
    if (msrpEl && sellEl && capEl) {
        const msrp = parseFloat(msrpEl.value) || 0;
        const sell = parseFloat(sellEl.value) || 0;
        if (msrp > 0) {
            capEl.value = ((sell / msrp) * 100).toFixed(2);
        }
    }
}

function updateResidual(suffix) {
    const termEl = document.getElementById(`term${suffix}`);
    const mileEl = document.getElementById(`mileage${suffix}`);
    const resEl = document.getElementById(`residual${suffix}`);
    
    if (termEl && mileEl && resEl) {
        const term = termEl.value;
        const mile = mileEl.value;
        if (RESIDUAL_MATRIX[term] && RESIDUAL_MATRIX[term][mile]) {
            resEl.value = RESIDUAL_MATRIX[term][mile];
        }
    }
}

function updateTax(suffix) {
    const stateEl = document.getElementById(`state${suffix}`);
    const taxEl = document.getElementById(`taxRate${suffix}`);
    
    if (stateEl && taxEl) {
        const stateCode = stateEl.value;
        const state = STATES.find(s => s.code === stateCode);
        if (state) {
            taxEl.value = state.tax;
        }
    }
}

function updateEVCredits(suffix) {
    const make = document.getElementById(`make${suffix}`)?.value || '';
    const model = document.getElementById(`model${suffix}`)?.value || '';
    const year = parseInt(document.getElementById(`year${suffix}`)?.value) || 0;
    const state = document.getElementById(`state${suffix}`)?.value || '';
    
    const federalCredit = getFederalCredit(make, model, year);
    const stateCredit = getStateCredit(state);
    
    // Update display elements
    const fedNewEl = document.getElementById(`fedNew${suffix}`);
    const stateNewEl = document.getElementById(`stateNew${suffix}`);
    const stateUsedEl = document.getElementById(`stateUsed${suffix}`);
    const creditsEl = document.getElementById(`credits${suffix}`);
    
    if (fedNewEl) fedNewEl.textContent = `$${federalCredit.toLocaleString()}`;
    if (stateNewEl) stateNewEl.textContent = `$${stateCredit.new.toLocaleString()}`;
    if (stateUsedEl) stateUsedEl.textContent = `$${stateCredit.used.toLocaleString()}`;
    if (creditsEl) creditsEl.value = federalCredit + stateCredit.new;
}

// ===============================================
// DROPDOWN INITIALIZATION
// ===============================================

function initDropdowns() {
    // Initialize make dropdowns
    const makeSelects = [document.getElementById('makeA'), document.getElementById('makeB')];
    makeSelects.forEach(select => {
        if (select) {
            MAKES.forEach(make => {
                const option = document.createElement('option');
                option.value = make;
                option.textContent = make;
                select.appendChild(option);
            });
        }
    });
    
    // Initialize state dropdowns
    const stateSelects = [document.getElementById('stateA'), document.getElementById('stateB')];
    stateSelects.forEach(select => {
        if (select) {
            STATES.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                select.appendChild(option);
            });
        }
    });
}

// ===============================================
// EVENT LISTENERS
// ===============================================

function attachListeners() {
    ['A', 'B'].forEach(suffix => {
        // MSRP and selling price listeners
        const msrpEl = document.getElementById(`msrp${suffix}`);
        const sellEl = document.getElementById(`sellingPrice${suffix}`);
        if (msrpEl) msrpEl.addEventListener('input', () => updateCapCost(suffix));
        if (sellEl) sellEl.addEventListener('input', () => updateCapCost(suffix));
        
        // Term and mileage listeners
        const termEl = document.getElementById(`term${suffix}`);
        const mileEl = document.getElementById(`mileage${suffix}`);
        if (termEl) termEl.addEventListener('change', () => updateResidual(suffix));
        if (mileEl) mileEl.addEventListener('change', () => updateResidual(suffix));
        
        // Make listener
        const makeEl = document.getElementById(`make${suffix}`);
        if (makeEl) makeEl.addEventListener('change', () => {
            updateFees(suffix);
            updateEVCredits(suffix);
        });
        
        // Model and year listeners
        const modelEl = document.getElementById(`model${suffix}`);
        const yearEl = document.getElementById(`year${suffix}`);
        if (modelEl) modelEl.addEventListener('change', () => updateEVCredits(suffix));
        if (yearEl) yearEl.addEventListener('change', () => updateEVCredits(suffix));
        
        // State listener
        const stateEl = document.getElementById(`state${suffix}`);
        if (stateEl) stateEl.addEventListener('change', () => {
            updateTax(suffix);
            updateEVCredits(suffix);
        });
        
        // ZIP code listener
        const zipEl = document.getElementById(`zip${suffix}`);
        if (zipEl) zipEl.addEventListener('blur', async (e) => {
            const zip = e.target.value;
            if (zip.length === 5) {
                try {
                    const stateCode = ZIP_TO_STATE.lookup(zip);
                    if (stateCode) {
                        const stateEl = document.getElementById(`state${suffix}`);
                        if (stateEl) {
                            stateEl.value = stateCode;
                            updateTax(suffix);
                            updateEVCredits(suffix);
                        }
                    }
                } catch (error) {
                    console.warn('ZIP lookup failed:', error);
                }
            }
        });
        
        // VIN listener
        const vinEl = document.getElementById(`vin${suffix}`);
        if (vinEl) vinEl.addEventListener('blur', (e) => decodeVIN(e.target.value, suffix));
    });
}

// ===============================================
// INITIALIZATION
// ===============================================

window.addEventListener('DOMContentLoaded', async () => {
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
        ['A', 'B'].forEach(suffix => {
            updateCapCost(suffix);
            updateResidual(suffix);
            updateEVCredits(suffix);
        });
        
        console.log('Lease Hackulator ready with live incentives, VIN decoding, and comprehensive data mapping');
        
    } catch (error) {
        console.error('Initialization failed:', error);
    }
});

// ===============================================
// GLOBAL API FOR EXTERNAL ACCESS
// ===============================================

window.LeaseHackulator = {
    getFederalCredit,
    getStateCredit,
    decodeVIN,
    updateFees,
    updateCapCost,
    updateResidual,
    updateTax,
    updateEVCredits,
    FEES,
    RESIDUAL_MATRIX,
    STATES,
    MONEY_FACTORS,
    VIN_MAPPING,
    EV_INCENTIVES,
    ZIP_TO_STATE
};

