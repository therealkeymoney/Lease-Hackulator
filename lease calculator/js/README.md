# Lease Hackulator - Modular Architecture

This directory contains the refactored, modular version of the Lease Hackulator application.

## 🏗️ Architecture Overview

The application has been refactored from a single 1,824-line monolithic file into a clean, modular architecture:

```
js/
├── data/
│   └── constants.js          # All data constants and mappings
├── utils/
│   ├── api.js               # API utilities with error handling
│   └── helpers.js           # General utility functions
├── core/
│   ├── calculations.js      # Core calculation logic
│   ├── domUtils.js          # DOM manipulation utilities
│   └── eventHandlers.js     # Event listener management
└── main.js                  # Main initialization and orchestration
```

## 📋 Module Descriptions

### `data/constants.js`
- **Purpose**: Centralized data management
- **Contains**: 
  - Manufacturer fees (FEES)
  - Residual value matrix (RESIDUAL_MATRIX)
  - State tax data (STATES)
  - Money factors (MONEY_FACTORS)
  - VIN mapping data (VIN_MAPPING)
  - EV incentives (EV_INCENTIVES)
  - ZIP to state mapping (ZIP_TO_STATE)

### `utils/api.js`
- **Purpose**: External API communication with robust error handling
- **Features**:
  - Timeout handling for API calls
  - VIN decoding via NHTSA API
  - Federal tax credit data loading
  - Comprehensive error handling and fallbacks
  - XML to JSON conversion utilities

### `utils/helpers.js`
- **Purpose**: Reusable utility functions
- **Features**:
  - Safe DOM element access
  - Field ID mapping for HTML compatibility
  - Number parsing and formatting
  - State and ZIP code lookups
  - EV credit calculations
  - Input validation

### `core/calculations.js`
- **Purpose**: Core lease calculation business logic
- **Functions**:
  - `updateFees()` - Updates manufacturer fees
  - `updateCapitalizedCost()` - Calculates cap cost percentage
  - `updateResidualValue()` - Updates residual based on term/mileage
  - `updateTaxRate()` - Updates tax rate by state
  - `updateEvCredits()` - Calculates EV incentives
  - `calculateLeasePayment()` - Complete lease payment calculation

### `core/domUtils.js`
- **Purpose**: DOM manipulation and form management
- **Features**:
  - Dropdown initialization
  - Form element validation
  - Element visibility control
  - Form reset functionality
  - CSS class management

### `core/eventHandlers.js`
- **Purpose**: Event listener management and user interactions
- **Features**:
  - Debounced input handlers
  - VIN decoding triggers
  - ZIP code state lookup
  - Manufacturer change handlers
  - Real-time calculation updates

### `main.js`
- **Purpose**: Application initialization and coordination
- **Features**:
  - Module loading and initialization
  - Error handling and status reporting
  - Global API exposure
  - Application state management

## 🚀 Usage

### Basic Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Lease Hackulator</title>
</head>
<body>
    <!-- Your form elements here -->
    
    <!-- Load modular scripts -->
    <script type="module" src="js/data/constants.js"></script>
    <script type="module" src="js/utils/api.js"></script>
    <script type="module" src="js/utils/helpers.js"></script>
    <script type="module" src="js/core/calculations.js"></script>
    <script type="module" src="js/core/domUtils.js"></script>
    <script type="module" src="js/core/eventHandlers.js"></script>
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

### Required Form Element IDs
The modular version expects specific form element IDs:

```html
<!-- Vehicle 1 -->
<select id="manufacturer1">...</select>
<input id="vin1" type="text">
<select id="state1">...</select>
<input id="zipCode1" type="text">
<input id="msrp1" type="number">
<input id="capcost1" type="number">
<select id="term1">...</select>
<select id="mileage1">...</select>

<!-- Vehicle 2 (for dual mode) -->
<select id="manufacturer2">...</select>
<input id="vin2" type="text">
<!-- etc... -->
```

## 🔧 API Access

The global `LeaseHackulator` object provides access to all functionality:

```javascript
// Access data
const fees = LeaseHackulator.getFees();
const states = LeaseHackulator.getStates();

// Trigger calculations
LeaseHackulator.updateCalculations('1'); // Update vehicle 1

// Get application state
const state = LeaseHackulator.getState();

// Debug information
console.log(LeaseHackulator.debug.state());
```

## 🎯 Key Improvements

1. **Modularity**: Clear separation of concerns
2. **Error Handling**: Comprehensive error handling throughout
3. **Performance**: Debounced event handlers, optimized DOM access
4. **Maintainability**: Consistent patterns and naming conventions
5. **Scalability**: Easy to extend and modify individual components
6. **Testing**: Each module can be tested independently
7. **Modern JavaScript**: ES6+ features, async/await, modules

## 🧪 Testing

Run the module validation test:
```bash
node test-modules.js
```

Open the test page in a browser:
```
test-modular.html
```

## 🔄 Migration from Legacy Version

The legacy monolithic file (`hackulator values.js`) has been preserved for reference. Key changes:

- **ID Mapping**: Form IDs changed from `makeA`/`makeB` to `manufacturer1`/`manufacturer2`
- **Module Imports**: Replace single script tag with multiple module imports
- **API Changes**: Global functions now accessed via `LeaseHackulator` object
- **Error Handling**: More robust error handling and user feedback

## 📚 Dependencies

- **Browser Support**: Modern browsers with ES6 module support
- **External APIs**: 
  - NHTSA VIN Decode API
  - Fuel Economy Federal Credits API
- **No Build Process**: Pure ES6 modules, no bundling required