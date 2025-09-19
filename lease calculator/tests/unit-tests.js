/**
 * Simple unit tests for Lease Hackulator core functions
 * Run with: node tests/unit-tests.js (if Node.js environment)
 * Or open in browser with HTML test runner
 */

// Mock DOM and window for Node.js environment
if (typeof window === 'undefined') {
    global.window = {
        LeaseHackulator: {},
        DOMParser: class {
            parseFromString() {
                return { 
                    documentElement: { childNodes: [] },
                    querySelector: () => null
                };
            }
        },
        fetch: () => Promise.reject(new Error('Mock fetch')),
        document: {
            createElement: () => ({ 
                setAttribute: () => {}, 
                textContent: '', 
                appendChild: () => {},
                style: {}
            }),
            body: { appendChild: () => {}, removeChild: () => {} },
            querySelector: () => null,
            addEventListener: () => {}
        }
    };
    global.document = window.document;
    global.setTimeout = setTimeout;
}

// Simple test framework
class SimpleTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    test(name, fn) {
        this.tests.push({ name, fn });
    }
    
    async run() {
        console.log('Running tests...\n');
        
        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`✓ ${test.name}`);
                this.passed++;
            } catch (error) {
                console.log(`✗ ${test.name}: ${error.message}`);
                this.failed++;
            }
        }
        
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }
    
    assertEquals(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`${message} - Expected: ${expected}, Actual: ${actual}`);
        }
    }
    
    assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`${message} - Expected true, got false`);
        }
    }
    
    assertFalse(condition, message = '') {
        if (condition) {
            throw new Error(`${message} - Expected false, got true`);
        }
    }
}

const test = new SimpleTest();

// Load our utilities for testing
if (typeof require !== 'undefined') {
    try {
        require('../js/utils.js');
    } catch (e) {
        console.log('Loading utilities in browser mode');
    }
}

// Test utility functions
test.test('validateZipCode - valid ZIP codes', () => {
    const { validateZipCode } = window.LeaseHackulator;
    test.assertTrue(validateZipCode('12345'), 'Valid 5-digit ZIP');
    test.assertTrue(validateZipCode('12345-6789'), 'Valid ZIP+4');
    test.assertTrue(validateZipCode(12345), 'Numeric ZIP');
});

test.test('validateZipCode - invalid ZIP codes', () => {
    const { validateZipCode } = window.LeaseHackulator;
    test.assertFalse(validateZipCode('1234'), 'Too short');
    test.assertFalse(validateZipCode('123456'), 'Too long without dash');
    test.assertFalse(validateZipCode('ABCDE'), 'Non-numeric');
    test.assertFalse(validateZipCode(''), 'Empty string');
    test.assertFalse(validateZipCode(null), 'Null value');
});

test.test('normalizeZipCode - various formats', () => {
    const { normalizeZipCode } = window.LeaseHackulator;
    test.assertEquals(normalizeZipCode('12345'), '12345', 'Already normalized');
    test.assertEquals(normalizeZipCode('12345-6789'), '12345', 'ZIP+4 truncated');
    test.assertEquals(normalizeZipCode('1234'), '01234', 'Padded with zeros');
    test.assertEquals(normalizeZipCode(123), '00123', 'Numeric padded');
    test.assertEquals(normalizeZipCode(''), '', 'Empty string');
});

test.test('validateVIN - valid VINs', () => {
    const { validateVIN } = window.LeaseHackulator;
    test.assertTrue(validateVIN('1HGBH41JXMN109186'), 'Valid VIN format');
    test.assertTrue(validateVIN('JH4KA8260MC000000'), 'Another valid VIN');
});

test.test('validateVIN - invalid VINs', () => {
    const { validateVIN } = window.LeaseHackulator;
    test.assertFalse(validateVIN('1HGBH41JXMN10918'), 'Too short');
    test.assertFalse(validateVIN('1HGBH41JXMN1091866'), 'Too long');
    test.assertFalse(validateVIN('1HGBH41JXMN10918I'), 'Contains I');
    test.assertFalse(validateVIN('1HGBH41JXMN10918O'), 'Contains O');
    test.assertFalse(validateVIN('1HGBH41JXMN10918Q'), 'Contains Q');
    test.assertFalse(validateVIN(''), 'Empty string');
    test.assertFalse(validateVIN(null), 'Null value');
});

test.test('xml2json - basic conversion', () => {
    const { xml2json } = window.LeaseHackulator;
    
    // Mock DOMParser for this test
    const originalDOMParser = window.DOMParser;
    window.DOMParser = class {
        parseFromString(xmlStr) {
            // Simple mock for testing
            return {
                documentElement: {
                    childNodes: [
                        {
                            nodeType: 1,
                            nodeName: 'test',
                            textContent: 'value',
                            childNodes: []
                        }
                    ]
                },
                querySelector: () => null
            };
        }
    };
    
    const result = xml2json('<test>value</test>');
    test.assertTrue(typeof result === 'object', 'Returns object');
    
    // Restore original DOMParser
    window.DOMParser = originalDOMParser;
});

test.test('xml2json - invalid XML', () => {
    const { xml2json } = window.LeaseHackulator;
    
    test.assertEquals(xml2json(''), null, 'Empty string returns null');
    test.assertEquals(xml2json(null), null, 'Null returns null');
    test.assertEquals(xml2json(123), null, 'Number returns null');
});

test.test('DOMCache - caching functionality', () => {
    const { DOMCache } = window.LeaseHackulator;
    const cache = new DOMCache();
    
    // Mock document.querySelector
    let queryCount = 0;
    const originalQuerySelector = document.querySelector;
    document.querySelector = (selector) => {
        queryCount++;
        return { id: 'test-element', selector };
    };
    
    // First call should query DOM
    const element1 = cache.get('#test');
    test.assertEquals(queryCount, 1, 'First call queries DOM');
    
    // Second call should use cache
    const element2 = cache.get('#test');
    test.assertEquals(queryCount, 1, 'Second call uses cache');
    test.assertEquals(element1, element2, 'Same element returned');
    
    // Clear cache and try again
    cache.clear();
    const element3 = cache.get('#test');
    test.assertEquals(queryCount, 2, 'After clear, DOM is queried again');
    
    // Restore original querySelector
    document.querySelector = originalQuerySelector;
});

test.test('EventManager - listener management', () => {
    const { EventManager } = window.LeaseHackulator;
    const manager = new EventManager();
    
    // Mock element
    const element = {
        id: 'test-element',
        addEventListener: () => {},
        removeEventListener: () => {}
    };
    
    let addCount = 0;
    let removeCount = 0;
    
    element.addEventListener = () => addCount++;
    element.removeEventListener = () => removeCount++;
    
    // Add listener
    manager.addListener(element, 'click', () => {});
    test.assertEquals(addCount, 1, 'Listener added');
    
    // Add same listener again (should remove and re-add)
    manager.addListener(element, 'click', () => {});
    test.assertEquals(removeCount, 1, 'Previous listener removed');
    test.assertEquals(addCount, 2, 'New listener added');
    
    // Remove all listeners
    manager.removeAll();
    test.assertEquals(removeCount, 2, 'All listeners removed');
});

test.test('debounce - function execution timing', async () => {
    const { debounce } = window.LeaseHackulator;
    
    let callCount = 0;
    const testFunction = () => callCount++;
    const debouncedFunction = debounce(testFunction, 50);
    
    // Call multiple times quickly
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();
    
    test.assertEquals(callCount, 0, 'Function not called immediately');
    
    // Wait for debounce delay
    await new Promise(resolve => setTimeout(resolve, 60));
    test.assertEquals(callCount, 1, 'Function called once after delay');
});

test.test('throttle - function execution limiting', async () => {
    const { throttle } = window.LeaseHackulator;
    
    let callCount = 0;
    const testFunction = () => callCount++;
    const throttledFunction = throttle(testFunction, 50);
    
    // Call immediately
    throttledFunction();
    test.assertEquals(callCount, 1, 'First call executes immediately');
    
    // Call again immediately (should be throttled)
    throttledFunction();
    test.assertEquals(callCount, 1, 'Second call is throttled');
    
    // Wait for throttle limit
    await new Promise(resolve => setTimeout(resolve, 60));
    throttledFunction();
    test.assertEquals(callCount, 2, 'Call executes after throttle limit');
});

// Configuration loader tests (simplified for mock environment)
test.test('ConfigLoader - basic functionality', async () => {
    const { ConfigLoader } = window.LeaseHackulator;
    
    // Mock fetch for successful response
    window.fetch = () => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: 'data' })
    });
    
    const loader = new ConfigLoader('./config/');
    const data = await loader.load('test.json', { fallback: true });
    
    test.assertTrue(typeof data === 'object', 'Data loaded successfully');
});

test.test('ConfigLoader - fallback on error', async () => {
    const { ConfigLoader } = window.LeaseHackulator;
    
    // Mock fetch for error response
    window.fetch = () => Promise.reject(new Error('Network error'));
    
    const loader = new ConfigLoader('./config/');
    const fallbackData = { fallback: true };
    const data = await loader.load('nonexistent.json', fallbackData);
    
    test.assertEquals(data, fallbackData, 'Fallback data returned on error');
});

// Run tests
if (typeof window !== 'undefined' && window.document && window.document.addEventListener) {
    // Browser environment
    document.addEventListener('DOMContentLoaded', () => {
        test.run().then(success => {
            if (success) {
                console.log('All tests passed! ✓');
            } else {
                console.log('Some tests failed! ✗');
            }
        });
    });
} else {
    // Node.js environment
    test.run().then(success => {
        if (typeof process !== 'undefined') {
            process.exit(success ? 0 : 1);
        }
    });
}