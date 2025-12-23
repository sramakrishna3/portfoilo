/**
 * Google Apps Script for Contact Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Delete the default code and paste this entire file
 * 4. Replace 'YOUR_EMAIL_HERE' with your actual email address
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
 * 7. Set:
 *    - Description: "Contact Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Paste the URL in script.js file, replacing 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
 * 
 * GOOGLE SHEETS SETUP:
 * 1. Create a new Google Sheet
 * 2. Name it "Contact Form Submissions"
 * 3. In the first row, add headers: Timestamp | Name | Email | Message
 * 4. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 * 5. Replace 'YOUR_SHEET_ID_HERE' in the script below with your Sheet ID
 * 6. Go back to Apps Script and click "Run" to authorize permissions
 * 7. Grant necessary permissions when prompted
 */

// Configuration - UPDATE THESE VALUES
const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Get from Google Sheets URL
const RECIPIENT_EMAIL = 'YOUR_EMAIL_HERE'; // Your email address
const SHEET_NAME = 'Sheet1'; // Default sheet name, change if different

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Save to Google Sheets
    const sheetResult = saveToSheet(data);
    
    // Send email notification
    const emailResult = sendEmail(data);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        sheetSaved: sheetResult,
        emailSent: emailResult 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save form data to Google Sheets
 */
function saveToSheet(data) {
  try {
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
      return saveToSheet(data); // Retry with new sheet
    }
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the form data
    const timestamp = data.timestamp || new Date().toLocaleString();
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.message
    ]);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 4).setFontSize(10);
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);
    
    return true;
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return false;
  }
}

/**
 * Send email notification
 */
function sendEmail(data) {
  try {
    const subject = `New Contact Form Submission from ${data.name}`;
    const body = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Timestamp: ${data.timestamp || new Date().toLocaleString()}</small></p>
    `;
    
    // Send email
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: body,
      replyTo: data.email // Allows you to reply directly to the sender
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Test function - Run this to test the script
 */
function test() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message',
    timestamp: new Date().toISOString()
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  console.log(result.getContent());
}

