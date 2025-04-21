# Google Sheets Integration Guide

## Problem

If you're experiencing a `403 Forbidden` error or your form data is not being stored in Google Sheets, the issue is likely with the Google Apps Script deployment and permissions.

## Solution: Setting Up Google Apps Script Correctly

Follow these steps to properly configure your Google Apps Script for form submissions:

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Create separate sheets (tabs) for each form type:
   - `ContactForm` - For contact form submissions
   - `Members` - For join us form submissions
   - `Newsletter` - For newsletter signups
3. In each sheet, add appropriate column headers matching your form fields

### 2. Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with this script:

```javascript
// Google Apps Script to handle form submissions to Google Sheets
function doPost(e) {
  try {
    // Parse the request
    const data = e.parameter;
    const sheetName = data.sheet || "Submissions";
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    // Get the headers from the sheet
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    let nextRow = sheet.getLastRow() + 1;
    
    // If headers don't exist (empty sheet), create them based on the submitted data
    if (headers.length === 0 || headers[0] === "") {
      // Extract keys from data, excluding "sheet" which is used internally
      const dataKeys = Object.keys(data).filter(key => key !== "sheet");
      
      // Add timestamp as first column if not present
      if (!dataKeys.includes("timestamp")) {
        dataKeys.unshift("timestamp");
      }
      
      // Set headers in the first row
      sheet.getRange(1, 1, 1, dataKeys.length).setValues([dataKeys]);
      headers = dataKeys;
      nextRow = 2; // Start data from row 2
    }
    
    // Prepare row data based on headers
    const rowData = headers.map(header => {
      if (header === "timestamp" && !data.timestamp) {
        return new Date().toISOString();
      }
      return data[header] || "";
    });
    
    // Insert the data
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Data saved to Google Sheets" 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        message: error.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  
  try {
    var output = ContentService.createTextOutput("");
    output.setHeader("Access-Control-Allow-Origin", "*");
    output.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    output.setHeader("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type");
    
    return output;
  } finally {
    lock.releaseLock();
  }
}
```

### 3. Deploy the Script Correctly

1. Click on **Deploy > New deployment**
2. For deployment type, select **Web app**
3. Set the following:
   - Description: "Form Submission Handler"
   - Execute as: **Me** (or your Google account)
   - Who has access: **Anyone** (This is crucial - it must be set to Anyone)
4. Click **Deploy**
5. Copy the **Web app URL** that appears

### 4. Update Your Frontend Code

1. Open `src/utils/googleSheets.ts`
2. Replace the `SCRIPT_URL` constant with your new web app URL:

```typescript
const SCRIPT_URL = "YOUR_NEW_WEB_APP_URL";
```

### 5. Test the Integration

1. Try submitting a form on your website
2. Check the browser console for any errors
3. Verify that data appears in your Google Sheet

### Troubleshooting

#### 403 Forbidden Error
- Ensure your script is deployed with "Anyone" access
- Try redeploying the script with a new version
- Make sure your Google account has edit access to the sheet

#### CORS Issues
- The doOptions function in the Apps Script handles CORS, but you may need to modify it if you're still having issues
- Try adding your website's domain to the "Access-Control-Allow-Origin" header

#### Script Taking Too Long
- If the script times out, try simplifying the Apps Script code
- Consider using batch operations for inserting data

#### Data Not Appearing
- Check that you're using the correct sheet name in your form submission
- Verify the column headers in your sheet match the field names in your form data

Remember that the local storage fallback will continue to work even if the Google Sheets integration fails, so your users' form submissions won't be lost. 