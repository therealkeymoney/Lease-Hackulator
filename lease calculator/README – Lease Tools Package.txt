README – Lease Tools Package
============================

This package contains:
- lease-calculator.html (offline browser-based lease calculator)
- lease-sync-tester.csv (Apple Numbers multi-scenario calculator sync tester)

INSTALLATION:
-------------
1. Save both files in the same folder.
2. You can compress them together into a ZIP for storage/sharing:
   - Mac: Select both files → Right-click → "Compress 2 items"

USING THE WEB APP:
------------------
1. Double-click lease-calculator.html
2. It will open in your default browser
3. Enter data (VIN, MSRP, Cap Cost, etc.) → Click "Calculate" → Get results offline

USING THE SYNC TESTER:
----------------------
1. Open lease-sync-tester.csv in Apple Numbers
2. Enter test scenarios (columns VIN → Tax Method)
3. Paste your web app results into "Web App" columns
4. "Match?" columns show ✅ for perfect match, ❌ for mismatch

ADDING COLOR-CODING (in Numbers):
---------------------------------
1. Format → Cell → Conditional Highlighting
2. For each Match? column:
   - Rule: Text is "✅" → Fill green
   - Rule: Text is "❌" → Fill red

OVERALL MATCH %:
----------------
- Located at top left in cell B1
- Uses COUNTIF formulas to measure match rate

NOTES:
------
- The calculator formulas in HTML and Numbers are mathematically identical
- The sync tester ensures they stay in agreement after updates
