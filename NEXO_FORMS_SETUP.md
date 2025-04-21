# NEXO Forms to Google Sheets Integration

This document provides instructions for setting up the Google Sheets integration for the NEXO forms. The integration allows form submissions from the Join Us and Contact pages to be stored in a Google Sheet.

## Overview

The integration uses:
1. A Google Sheet to store the form submissions
2. A Google Apps Script to process the form data and append it to the Sheet
3. The `submitToGoogleSheets` utility function in the NEXO codebase that sends the form data to the Google Apps Script

## Setup Instructions

### Step 1: Prepare Your Google Sheet

1. Open the Google Sheet you want to use for form submissions:
   https://docs.google.com/spreadsheets/d/1AQ7E-V8kN57NIs4JFq9m3t0z8myka3nUFuEknSACu9I/edit?usp=sharing

2. Create two separate sheets (tabs) in the document:
   - `JoinUs` - For storing Join Us form submissions
   - `ContactForm` - For storing Contact form submissions

3. You can optionally add headers to each sheet, but the script will automatically create them based on the first submission.

### Step 2: Create and Deploy the Google Apps Script

1. In your Google Sheet, click on **Extensions > Apps Script**
2. Delete any code in the script editor and paste the entire script from the `scripts/GoogleAppsScript.js` file
3. Save the project (give it a name like "NEXO Form Handler")
4. Click on **Deploy > New deployment**
5. Select type as **Web app**
6. Set "Execute as" to **Me**
7. Set "Who has access" to **Anyone**
8. Click **Deploy**
9. Copy the Web app URL that is provided after deployment

### Step 3: Update the Script URL in the Code

1. Open the file `src/utils/googleSheets.ts`
2. Replace the `SCRIPT_URL` value with the URL you copied from the Apps Script deployment
3. Save the file

```typescript
// Replace this line:
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQnASQrZNZ6FWugc4GWOUVuJTCDlQLhxgT3LlC1RFRoLv4gGRi3XK3dQUjYoG1rMwp/exec";

// With your own script URL:
const SCRIPT_URL = "your-deployed-script-url-here";
```

## How It Works

1. User submits a form on the Join Us or Contact page
2. The form data is processed by the `handleSubmit` function
3. The `submitToGoogleSheets` utility sends the data to the Google Apps Script with the appropriate sheet name
4. The Google Apps Script adds the data as a new row in the corresponding sheet
5. A success or error message is displayed to the user

## Troubleshooting

If form submissions are not being recorded in your Google Sheet:

1. Check the browser console for errors
2. Verify that your Apps Script deployment is set to "Anyone" can access
3. Make sure the Google Sheet is accessible (the URL is correct)
4. If using a test environment, ensure CORS is properly configured

## Security Considerations

- The current setup uses `no-cors` mode which means you can't get a proper response from the Google Apps Script
- For better security in a production environment, consider implementing CORS properly in your Apps Script
- The Google Sheet should be restricted to only those who need access to the form data

## Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Web Apps in Google Apps Script](https://developers.google.com/apps-script/guides/web) 