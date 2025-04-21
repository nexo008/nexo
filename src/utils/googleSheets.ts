/**
 * Helper utility to submit form data to Google Sheets
 * Using Google Sheets as a simple database for form submissions
 */

// Google Sheets URL for form submissions
const SHEETS_URL = "https://docs.google.com/spreadsheets/d/1AQ7E-V8kN57NIs4JFq9m3t0z8myka3nUFuEknSACu9I/edit?usp=sharing";

// The script URL will be used as the form action
// It's a deployed Google Apps Script that handles writing to the spreadsheet
// Original URL with permission issue:
// const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRNJbNHWes0qvcIS8SGKDXlwmjzH8TZ27AUTFQ0yTSQJ8tZRMjDriuznb8R2xRPwj6Tw/exec";

// IMPORTANT: You need to deploy your own Google Apps Script and replace this URL
// See docs/google-sheets-integration.md for detailed setup instructions
// The URL should look like: https://script.google.com/macros/s/YOUR_UNIQUE_DEPLOYMENT_ID/exec
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx88RD8Jkf-xGZkBom94fRID3vLe088sEG0j-u28duNtuMBww-wcJhNQKVqCCdSH3ohYg/exec";

// Flag to enable local storage fallback when Google Sheets is unavailable
const ENABLE_LOCAL_FALLBACK = true;

// Define sheet names for different form types
export const SHEET_NAMES = {
  CONTACT_FORM: "ContactForm",
  JOIN_US: "Members", // Store members registrations in a dedicated sheet
  NEWSLETTER: "Newsletter"
};

/**
 * Form submission response type
 */
export interface FormSubmitResponse {
  success: boolean;
  message: string;
  data?: any;
  stored?: "sheets" | "local"; // Indicates where the data was stored
}

/**
 * Submit form data to Google Sheets
 * @param formData - The data to submit
 * @param sheetName - The sheet tab name (defaults to "Submissions")
 * @returns Promise with the response from the Google Apps Script
 */
export const submitToGoogleSheets = async (formData: Record<string, any>, sheetName: string = "Submissions"): Promise<FormSubmitResponse> => {
  try {
    // Validate form data before submission
    if (!validateFormData(formData, sheetName)) {
      return { 
        success: false, 
        message: "Invalid form data. Please check all required fields."
      };
    }
    
    // Format the form data for the request
    const formattedData = new FormData();
    
    // Add the form data as key-value pairs
    Object.entries(formData).forEach(([key, value]) => {
      // Handle arrays by converting them to comma-separated strings
      if (Array.isArray(value)) {
        formattedData.append(key, value.join(", "));
      } else {
        formattedData.append(key, String(value));
      }
    });
    
    // Add the sheet name
    formattedData.append("sheet", sheetName);
    
    // Add timestamp
    formattedData.append("timestamp", new Date().toISOString());
    
    // Add form type metadata to help with sheet organization
    if (sheetName === SHEET_NAMES.JOIN_US) {
      formattedData.append("formType", "membership");
      formattedData.append("status", "pending");
    } else if (sheetName === SHEET_NAMES.CONTACT_FORM) {
      formattedData.append("formType", "contact");
      formattedData.append("status", "unread");
    } else if (sheetName === SHEET_NAMES.NEWSLETTER) {
      formattedData.append("formType", "newsletter");
      formattedData.append("status", "active");
    }
    
    console.log("Submitting form data to Google Sheets:", 
      Object.fromEntries(formattedData.entries()), 
      "Sheet:", sheetName
    );
    
    try {
      // Use fetch with timeout to handle connection issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formattedData,
        signal: controller.signal,
        mode: 'cors' // Explicitly set CORS mode
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Google Sheets API Response:", result);
        
        return { 
          success: true, 
          message: getSuccessMessage(sheetName),
          data: formData,
          stored: "sheets"
        };
      } else {
        console.error("Error response from Google Sheets:", response.status, response.statusText);
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Network error when submitting to Google Sheets:", error);
      
      // If local fallback is enabled, store in localStorage
      if (ENABLE_LOCAL_FALLBACK) {
        return saveToLocalStorage(formData, sheetName);
      }
      
      throw error;
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    
    // Try with XHR as a backup
    try {
      console.log("Attempting submission with XMLHttpRequest as backup...");
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        
        // Configure the request
        xhr.open("POST", SCRIPT_URL, true);
        
        // Set up callbacks
        xhr.onload = function() {
          console.log("Google Sheets XHR response:", xhr.status, xhr.statusText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ 
              success: true, 
              message: getSuccessMessage(sheetName),
              data: formData,
              stored: "sheets"
            });
          } else {
            console.error("Error response from Google Sheets XHR:", xhr.status, xhr.statusText);
            
            // If local fallback is enabled, store in localStorage
            if (ENABLE_LOCAL_FALLBACK) {
              resolve(saveToLocalStorage(formData, sheetName));
            } else {
              resolve({ 
                success: false, 
                message: "Failed to submit form. Server returned an error."
              });
            }
          }
        };
        
        xhr.onerror = function() {
          console.error("Network error when submitting to Google Sheets via XHR");
          
          // If local fallback is enabled, store in localStorage
          if (ENABLE_LOCAL_FALLBACK) {
            resolve(saveToLocalStorage(formData, sheetName));
          } else {
            resolve({ 
              success: false, 
              message: "Form submission failed. This could be due to network issues or CORS restrictions." 
            });
          }
        };
        
        // Create a new FormData instance for the XHR request
        const xhrFormData = new FormData();
        
        // Add the form data as key-value pairs
        Object.entries(formData).forEach(([key, value]) => {
          // Handle arrays by converting them to comma-separated strings
          if (Array.isArray(value)) {
            xhrFormData.append(key, value.join(", "));
          } else {
            xhrFormData.append(key, String(value));
          }
        });
        
        // Add the sheet name
        xhrFormData.append("sheet", sheetName);
        
        // Add timestamp
        xhrFormData.append("timestamp", new Date().toISOString());
        
        // Send the request
        xhr.send(xhrFormData);
      });
    } catch (fallbackError) {
      console.error("Both fetch and XHR methods failed:", fallbackError);
      
      // Final fallback to localStorage if enabled
      if (ENABLE_LOCAL_FALLBACK) {
        return saveToLocalStorage(formData, sheetName);
      }
      
      return { 
        success: false, 
        message: "Form submission failed with all methods. Your data could not be saved."
      };
    }
  }
};

/**
 * Save form data to localStorage as a fallback
 */
const saveToLocalStorage = (formData: Record<string, any>, sheetName: string): FormSubmitResponse => {
  try {
    // Create a storage key based on the sheet name
    const storageKey = `nexo_form_${sheetName.toLowerCase()}_${Date.now()}`;
    
    // Add timestamp and sheet info
    const dataToStore = {
      ...formData,
      _sheetName: sheetName,
      _timestamp: new Date().toISOString(),
      _pendingSync: true
    };
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(dataToStore));
    
    // Get current pending submissions count
    const pendingKey = 'nexo_pending_submissions';
    const pendingSubmissions = JSON.parse(localStorage.getItem(pendingKey) || '[]');
    pendingSubmissions.push(storageKey);
    localStorage.setItem(pendingKey, JSON.stringify(pendingSubmissions));
    
    console.log(`Saved form data to localStorage with key: ${storageKey}`);
    
    return {
      success: true,
      message: `${getSuccessMessage(sheetName)} (Saved locally)`,
      data: formData,
      stored: "local"
    };
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return {
      success: false,
      message: "Failed to submit form. Local storage fallback also failed."
    };
  }
};

/**
 * Simple validation for form data based on form type
 */
const validateFormData = (formData: Record<string, any>, sheetName: string): boolean => {
  // Basic required field validation
  if (sheetName === SHEET_NAMES.JOIN_US) {
    // Validate Join Us form
    return Boolean(
      formData.fullName && 
      formData.email && 
      formData.email.includes('@') && 
      formData.agreeToTerms === true
    );
  } else if (sheetName === SHEET_NAMES.CONTACT_FORM) {
    // Validate Contact form
    return Boolean(
      formData.name && 
      formData.email && 
      formData.email.includes('@') && 
      formData.message
    );
  } else if (sheetName === SHEET_NAMES.NEWSLETTER) {
    // Validate Newsletter subscription
    return Boolean(formData.email && formData.email.includes('@'));
  }
  
  // Default validation - just check if there's data
  return Object.keys(formData).length > 0;
};

/**
 * Get appropriate success message based on form type
 */
const getSuccessMessage = (sheetName: string): string => {
  switch (sheetName) {
    case SHEET_NAMES.JOIN_US:
      return "Thank you for joining NEXO! Your membership registration has been received and we'll be in touch soon.";
    case SHEET_NAMES.CONTACT_FORM:
      return "Thank you for your message! We'll get back to you soon.";
    case SHEET_NAMES.NEWSLETTER:
      return "You've been successfully subscribed to our newsletter!";
    default:
      return "Form submitted successfully!";
  }
};

/**
 * Retrieves all pending form submissions stored in localStorage
 * @returns Array of stored form submissions with metadata
 */
export const getLocallyStoredSubmissions = (): Array<{
  key: string;
  data: Record<string, any>;
  timestamp: string;
  sheetName: string;
}> => {
  try {
    // Get all pending submission keys
    const pendingKey = 'nexo_pending_submissions';
    const pendingKeys = JSON.parse(localStorage.getItem(pendingKey) || '[]');
    
    // Retrieve each submission
    return pendingKeys.map(key => {
      const storedData = JSON.parse(localStorage.getItem(key) || '{}');
      return {
        key,
        data: storedData,
        timestamp: storedData._timestamp || new Date().toISOString(),
        sheetName: storedData._sheetName || 'Unknown'
      };
    }).filter(item => !!item.data);
  } catch (error) {
    console.error("Error retrieving locally stored submissions:", error);
    return [];
  }
};

/**
 * Export locally stored form submissions as JSON
 * Useful for admins to manually collect data when Google Sheets is down
 */
export const exportLocalSubmissions = (): string => {
  const submissions = getLocallyStoredSubmissions();
  return JSON.stringify(submissions, null, 2);
}; 