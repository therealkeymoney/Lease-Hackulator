# Lease Hackulator - Modular Structure Documentation

## Overview

The Lease Hackulator codebase has been refactored into a modular structure to improve maintainability, readability, and reusability. The original monolithic `hackulator values.js` file (~1800 lines) has been split into focused, well-documented modules.

## Directory Structure

```
lease calculator/
├── data/
│   └── constants.js          # All data constants and mappings
├── utils/
│   ├── api.js               # API utility functions with error handling
│   └── helpers.js           # General utility functions
├── core/
│   ├── calculations.js      # Core calculation logic
│   ├── eventHandlers.js     # Event listener management
│   └── domUtils.js          # DOM manipulation utilities
├── main.js                  # Entry point for application initialization
└── test-modular.html        # Test page for module validation
```

## Module Descriptions

### 📊 `data/constants.js`
Contains all static data constants used throughout the application:
- `FEES` - Acquisition and disposition fees by manufacturer
- `RESIDUAL_MATRIX` - Residual values by term and mileage
- `STATES` - US states with tax rates
- `MONEY_FACTORS` - Money factors by manufacturer and tier
- `VIN_MAPPING` - VIN decoding data
- `EV_INCENTIVES` - Electric vehicle incentive data
- `ZIP_TO_STATE` - ZIP code to state mapping with lookup function
- `WMI_MAPPING` - World Manufacturer Identifier mapping

### 🔌 `utils/api.js`
API utility functions with proper error handling:
- `xml2json()` - Convert XML to JSON
- `fetchJSON()` - Fetch JSON with error handling
- `decodeVINFromAPI()` - Decode VIN using NHTSA API
- `loadFederalCredits()` - Load federal tax credit data
- `loadStateCredits()` - Load state incentive data

### 🛠️ `utils/helpers.js`
General utility functions for common operations:
- `formatCurrency()` - Format numbers as currency
- `formatNumber()` - Format numbers with commas
- `validateZip()` - Validate ZIP code format
- `parseNumericInput()` - Parse and clean numeric input
- `calculatePercentage()` - Calculate percentage values
- `debounce()` - Function debouncing
- `deepClone()` - Deep object cloning

### 🧮 `core/calculations.js`
Core calculation logic for lease computations:
- `getFederalCredit()` - Calculate federal tax credits
- `getStateCredit()` - Calculate state incentives
- `calculateLeasePayment()` - Lease payment calculations
- `calculateResidualPercentage()` - Residual percentage calculations
- `moneyFactorToAPR()` / `aprToMoneyFactor()` - Conversion utilities
- `calculateTotalLeaseCost()` - Total lease cost calculation

### 🎯 `core/eventHandlers.js`
Event listener management for user interactions:
- `attachListeners()` - Attach all form event listeners
- `detachListeners()` - Remove event listeners for cleanup
- Custom handlers for VIN decoding, ZIP lookup, form changes

### 🖥️ `core/domUtils.js`
DOM manipulation and form update utilities:
- `updateFees()` - Update fee displays based on manufacturer
- `updateCapCost()` - Update capitalized cost calculations
- `updateResidual()` - Update residual values
- `updateTax()` - Update tax rates based on state
- `updateEVCredits()` - Update EV credit displays
- `initDropdowns()` - Initialize dropdown options
- Helper functions for element manipulation

### 🚀 `main.js`
Application entry point and orchestration:
- Module imports and initialization
- Live data preloading
- Global API exposure for external access
- Application startup coordination

## Usage Examples

### Import Individual Modules
```javascript
// Import specific constants
import { FEES, STATES } from './data/constants.js';

// Import utility functions
import { formatCurrency, validateZip } from './utils/helpers.js';

// Import calculation functions
import { getFederalCredit, calculateLeasePayment } from './core/calculations.js';
```

### Use the Global API
```javascript
// Access through window.LeaseHackulator
const federalCredit = window.LeaseHackulator.getFederalCredit('Tesla', 'Model 3', 2024);
const fees = window.LeaseHackulator.FEES['BMW'];
```

### Initialize the Application
```html
<!-- Include main.js as module -->
<script type="module" src="main.js"></script>
```

## Benefits of Modular Structure

### 🎯 **Improved Maintainability**
- Each module has a single, clear responsibility
- Easy to locate and modify specific functionality
- Reduced code duplication

### 📚 **Better Documentation**
- Each file is clearly documented with JSDoc comments
- Function purposes and parameters are well-defined
- Module boundaries are explicit

### 🔄 **Enhanced Reusability**
- Functions can be imported individually as needed
- Modules can be used independently in other projects
- Clear separation of concerns

### 🧪 **Easier Testing**
- Individual modules can be tested in isolation
- Smaller, focused units are easier to test
- Better error isolation and debugging

### 👥 **Team Collaboration**
- Multiple developers can work on different modules simultaneously
- Clear module boundaries reduce merge conflicts
- Easier code reviews with focused changes

## Migration from Original Structure

The original `hackulator values.js` file functionality is preserved:

### Before (Monolithic)
```javascript
// All code in one large file
const FEES = { ... };
function getFederalCredit() { ... }
function updateFees() { ... }
// ... 1800+ lines
```

### After (Modular)
```javascript
// Organized into focused modules
import { FEES } from './data/constants.js';
import { getFederalCredit } from './core/calculations.js';
import { updateFees } from './core/domUtils.js';
```

## Testing

Run the test page to verify all modules are working correctly:
1. Serve the files via HTTP server: `python3 -m http.server 8000`
2. Open `http://localhost:8000/test-modular.html`
3. Verify module loading, constants, and form functionality

## Future Enhancements

The modular structure makes it easy to:
- Add new calculation methods to `core/calculations.js`
- Extend API functionality in `utils/api.js`
- Add new data sources to `data/constants.js`
- Implement additional UI features in `core/domUtils.js`
- Create unit tests for individual modules
- Add TypeScript definitions for better type safety

## Backward Compatibility

The global `window.LeaseHackulator` API maintains backward compatibility with any existing code that depends on the original structure.