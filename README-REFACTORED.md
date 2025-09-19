# Lease Hackulator - Refactored

This repository contains a refactored and improved version of the Lease Hackulator application. The code has been modularized, optimized, and made more maintainable while preserving all original functionality.

## 🔧 Improvements Made

### 1. **Modular Architecture**
- **`js/utils.js`**: Core utilities for validation, DOM manipulation, and accessibility
- **`js/data-service.js`**: Centralized data management and API interactions
- **`js/lease-hackulator.js`**: Main application logic with improved structure
- **`hackulator values.js`**: Enhanced original file with better error handling

### 2. **Configuration-Driven Design**
- **`config/zip-state-mapping.json`**: ZIP code to state mappings
- **`config/state-tax-rates.json`**: State tax rates data
- **`config/ev-incentives.json`**: EV incentives and rebates data

### 3. **Error Handling & Resilience**
- Robust error handling for all network requests
- Fallback mechanisms when APIs are unavailable
- User-friendly error messages
- Graceful degradation of functionality

### 4. **Performance Optimizations**
- DOM element caching to reduce query overhead
- Debounced input handlers to prevent excessive API calls
- Throttled event handlers for better performance
- Efficient event listener management

### 5. **Accessibility Improvements**
- ARIA attributes for screen readers
- Keyboard navigation support
- Live announcements for dynamic content
- Proper focus management

### 6. **Testing Infrastructure**
- Comprehensive unit tests for core functions
- Browser-based test runner
- Automated validation of key functionality

## 📁 Project Structure

```
lease calculator/
├── config/                     # Configuration files
│   ├── ev-incentives.json      # EV incentives data
│   ├── state-tax-rates.json   # State tax rates
│   └── zip-state-mapping.json # ZIP to state mappings
├── js/                         # JavaScript modules
│   ├── utils.js               # Core utilities
│   ├── data-service.js        # Data management
│   └── lease-hackulator.js    # Main application
├── tests/                      # Testing infrastructure
│   ├── unit-tests.js          # Unit tests
│   └── test-runner.html       # Browser test runner
├── hackulator values.js       # Enhanced original file
└── lease-hack-enhanced-mobile.html # HTML interface
```

## 🚀 Getting Started

### Using the Refactored Version

Include the modular files in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Your existing styles -->
</head>
<body>
    <!-- Your existing HTML -->
    
    <!-- Load the new modular JavaScript -->
    <script src="js/utils.js"></script>
    <script src="js/data-service.js"></script>
    <script src="js/lease-hackulator.js"></script>
</body>
</html>
```

### Using the Enhanced Original File

If you prefer to keep using a single file, use the enhanced `hackulator values.js` which includes improved error handling while maintaining the original structure.

## 🧪 Running Tests

### Browser Tests
1. Open `tests/test-runner.html` in your browser
2. Click "Run Tests" to execute the test suite
3. View results in the output panel

### Node.js Tests (if available)
```bash
cd "lease calculator/tests"
node unit-tests.js
```

## 🔑 Key Features

### Error Handling
```javascript
// Robust API calls with fallbacks
const data = await fetchJSON(url, options, fallbackData);

// VIN validation with user feedback
const isValid = validateVIN(vin);
if (!isValid) {
    showError("Invalid VIN format");
}
```

### Performance Optimization
```javascript
// DOM caching
const cache = new DOMCache();
const element = cache.getElementById('myElement');

// Debounced inputs
const handler = debounce(myFunction, 300);
```

### Accessibility
```javascript
// Screen reader announcements
AccessibilityUtils.announce("Calculation completed", "polite");

// ARIA attribute management
AccessibilityUtils.updateARIA(element, {
    'aria-label': 'Vehicle information input',
    'aria-describedby': 'help-text'
});
```

## 📊 Configuration

### Adding New State Tax Rates
Edit `config/state-tax-rates.json`:
```json
{
  "code": "XX",
  "name": "New State",
  "tax": 7.5
}
```

### Adding ZIP Code Ranges
Edit `config/zip-state-mapping.json`:
```json
{
  "start": "90000",
  "end": "90999",
  "state": "CA"
}
```

### Adding EV Incentives
Edit `config/ev-incentives.json`:
```json
{
  "stateIncentives": {
    "XX": {
      "rebate": 3000,
      "program": "State EV Program"
    }
  }
}
```

## 🔧 API Reference

### Utilities (`window.LeaseHackulator`)
- `validateZipCode(zip)` - Validates ZIP code format
- `validateVIN(vin)` - Validates VIN format
- `normalizeZipCode(zip)` - Normalizes ZIP to 5-digit format
- `fetchJSON(url, options, fallback)` - Fetch with error handling
- `DOMCache` - DOM element caching class
- `EventManager` - Event listener management
- `AccessibilityUtils` - Accessibility helpers

### Data Service
- `getStateFromZip(zip)` - Get state code from ZIP
- `getStateTaxRate(stateCode)` - Get tax rate for state
- `getFederalCredit(make, model, year)` - Get federal EV credit
- `getStateCredit(stateCode)` - Get state EV incentives
- `decodeVIN(vin)` - Decode VIN using NHTSA API

## 🐛 Troubleshooting

### Common Issues

**Configuration files not loading:**
- Ensure server supports serving JSON files
- Check browser console for CORS errors
- Verify file paths are correct

**API calls failing:**
- Check network connectivity
- Verify API endpoints are accessible
- Review console for specific error messages

**Tests not running:**
- Ensure browser supports modern JavaScript features
- Check that all script files are loaded correctly
- Review console for JavaScript errors

## 📈 Performance Benefits

The refactored code provides significant performance improvements:

1. **Reduced DOM Queries**: DOM caching reduces repeated element lookups
2. **Debounced Inputs**: Prevents excessive API calls during user typing
3. **Efficient Event Handling**: Proper event listener management
4. **Modular Loading**: Only load required functionality
5. **Error Recovery**: Graceful handling of network failures

## 🔒 Security Considerations

- All user inputs are validated before processing
- API responses are validated before use
- XSS prevention through proper DOM manipulation
- Safe JSON parsing with error handling

## 📝 Migration Guide

### From Original to Refactored

1. **Replace single file with modules**:
   ```html
   <!-- Old -->
   <script src="hackulator values.js"></script>
   
   <!-- New -->
   <script src="js/utils.js"></script>
   <script src="js/data-service.js"></script>
   <script src="js/lease-hackulator.js"></script>
   ```

2. **Update API calls** (if customized):
   ```javascript
   // Old
   const data = await fetch(url).then(r => r.json());
   
   // New
   const data = await window.LeaseHackulator.fetchJSON(url, {}, fallback);
   ```

3. **Update event handlers**:
   ```javascript
   // Old
   element.addEventListener('input', handler);
   
   // New
   const manager = new window.LeaseHackulator.EventManager();
   manager.addListener(element, 'input', handler);
   ```

## 🤝 Contributing

When making changes:

1. **Update tests** for any new functionality
2. **Maintain backward compatibility** where possible
3. **Follow error handling patterns** established in the codebase
4. **Update configuration files** rather than hardcoding values
5. **Test accessibility features** with screen readers

## 📄 License

Same license as the original Lease Hackulator project.

---

**Note**: This refactored version maintains 100% compatibility with the original functionality while providing significant improvements in maintainability, performance, and accessibility.