/**
 * This is a Google Apps Script file to process form submissions and store data in Google Sheets
 * 
 * How to use:
 * 1. Go to your Google Sheet
 * 2. Click on Extensions > Apps Script
 * 3. Delete any code in the script editor and paste this entire script
 * 4. Save the project (give it a name like "NEXO Form Handler")
 * 5. Click on Deploy > New deployment
 * 6. Select type as "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web app URL and use it in your application
 * 
 * Note: You may need to authorize the script to access your Google Sheets
 */

// Process the form submission
function doPost(e) {
  // Create a log object for debugging
  let log = { 
    steps: [],
    receivedData: {},
    errors: []
  };
  
  try {
    // Log received data
    log.steps.push("Received form submission");
    log.receivedData = e.parameter ? e.parameter : "No parameters received";
    
    // Check if data is being received properly
    if (!e.parameter) {
      throw new Error("No form data received. Make sure data is being submitted correctly.");
    }
    
    // Get the sheet name from the form data, or use "Submissions" as default
    const sheetName = e.parameter.sheet || "Submissions";
    log.steps.push(`Using sheet name: ${sheetName}`);
    
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Could not access the active spreadsheet. Check permissions.");
    }
    log.steps.push("Accessed spreadsheet successfully");
    
    // Check if the sheet exists, create it if not
    let sheet;
    try {
      sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        // Create a new sheet if it doesn't exist
        log.steps.push(`Sheet "${sheetName}" not found, creating it`);
        sheet = ss.insertSheet(sheetName);
      } else {
        log.steps.push(`Found existing sheet: ${sheetName}`);
      }
    } catch (err) {
      log.errors.push(`Error accessing/creating sheet: ${err.toString()}`);
      // If there's an error, create a new sheet
      sheet = ss.insertSheet(sheetName);
    }
    
    // Get all form data
    const formData = e.parameter;
    log.steps.push(`Form data keys: ${Object.keys(formData).join(", ")}`);
    
    // Check if headers already exist
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    log.steps.push(`Current headers: ${headers.join(", ") || "None"}`);
    
    // If no headers (empty sheet), create them based on form data
    if (headers.length === 0 || headers[0] === "") {
      // Define headers from form parameters (excluding 'sheet' parameter)
      const newHeaders = Object.keys(formData).filter(key => key !== "sheet");
      log.steps.push(`Creating new headers: ${newHeaders.join(", ")}`);
      
      // Add timestamp as first column if not already included
      if (!newHeaders.includes("timestamp")) {
        newHeaders.unshift("timestamp");
        log.steps.push("Added timestamp to headers");
      }
      
      // Set the headers in the first row
      sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
      log.steps.push("Headers set in sheet");
    }
    
    // Get the updated headers after ensuring they exist
    const updatedHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    log.steps.push(`Using headers for data: ${updatedHeaders.join(", ")}`);
    
    // Prepare the row data according to the headers
    const rowData = updatedHeaders.map(header => {
      // Return empty string if the header doesn't exist in form data
      return formData[header] || "";
    });
    log.steps.push(`Prepared row data with ${rowData.length} values`);
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    log.steps.push("Row appended to sheet");
    
    // Return success response with log data for debugging
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Form data stored in Google Sheet",
      debug: log
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    log.errors.push(`Fatal error: ${error.toString()}`);
    log.steps.push("Script execution failed");
    
    // Return error response with detailed log
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString(),
      debug: log
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (Optional - for testing)
function doGet() {
  try {
    // Test access to the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets().map(sheet => sheet.getName());
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      message: "The Google Apps Script is running correctly!",
      spreadsheetAccess: "success",
      availableSheets: sheets
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      message: "The Google Apps Script is running, but there was an error accessing the spreadsheet",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
} 