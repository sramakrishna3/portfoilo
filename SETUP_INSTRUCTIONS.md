# Contact Form Setup Instructions

This guide will help you set up the contact form to save submissions to Google Sheets and send email notifications.

## Prerequisites
- A Google account
- Access to Google Drive and Google Sheets

## Step-by-Step Setup

### Part 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Contact Form Submissions"
4. In the first row (Row 1), add these headers:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Email
   - **D1**: Message
5. Copy the **Sheet ID** from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - Your Sheet ID is: `1a2b3c4d5e6f7g8h9i0j`

### Part 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"** (or the **"+"** button)
3. Delete all default code in the editor
4. Open the file `google-apps-script.js` from your project
5. Copy **ALL** the code from `google-apps-script.js`
6. Paste it into the Google Apps Script editor
7. **Update the configuration** at the top of the script:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Paste your Sheet ID here
   const RECIPIENT_EMAIL = 'your-email@gmail.com'; // Your email address
   const SHEET_NAME = 'Sheet1'; // Usually 'Sheet1', change if different
   ```
8. Click **"Save"** (💾 icon) or press `Ctrl+S` / `Cmd+S`
9. Name your project: "Contact Form Handler"

### Part 3: Deploy as Web App

1. Click **"Deploy"** in the top right
2. Select **"New deployment"**
3. Click the **gear icon (⚙️)** next to "Select type"
4. Choose **"Web app"**
5. Configure the deployment:
   - **Description**: "Contact Form Handler v1"
   - **Execute as**: **"Me"** (your email)
   - **Who has access**: **"Anyone"** (important!)
6. Click **"Deploy"**
7. **Copy the Web App URL** that appears
   - It will look like: `https://script.google.com/macros/s/AKfycby.../exec`
8. Click **"Done"**

### Part 4: Authorize the Script

1. In the Apps Script editor, click **"Run"** (▶️ icon)
2. You'll be prompted to authorize the script
3. Click **"Review Permissions"**
4. Choose your Google account
5. Click **"Advanced"** > **"Go to [Project Name] (unsafe)"**
6. Click **"Allow"** to grant permissions:
   - Access to Google Sheets (to save data)
   - Access to Gmail (to send emails)

### Part 5: Update Your Website

1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL (from Part 3, Step 7)
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

### Part 6: Test the Form

1. Open your website in a browser
2. Go to the Contact section
3. Fill out the form with test data
4. Submit the form
5. Check:
   - ✅ You should see a success message
   - ✅ Check your email inbox for the notification
   - ✅ Check your Google Sheet - a new row should appear

## Troubleshooting

### Form shows error message
- **Check**: Is the Google Script URL correct in `script.js`?
- **Check**: Did you deploy the script as "Web app" with "Anyone" access?
- **Check**: Browser console for errors (F12 > Console tab)

### Email not received
- **Check**: Is `RECIPIENT_EMAIL` correct in the script?
- **Check**: Check spam/junk folder
- **Check**: Did you authorize Gmail permissions?

### Data not saving to Sheet
- **Check**: Is `SHEET_ID` correct in the script?
- **Check**: Is `SHEET_NAME` correct? (usually "Sheet1")
- **Check**: Did you authorize Google Sheets permissions?
- **Check**: Does the sheet have headers in Row 1?

### CORS Errors
- The script uses `mode: 'no-cors'` which is normal
- You won't see the response, but data should still be saved
- Check your Sheet and email to verify it's working

## Security Notes

- The Web App URL is public, but only you can modify the script
- Consider adding rate limiting or CAPTCHA for production use
- The script validates input before processing
- Email addresses are visible in the Sheet - keep it private

## Exporting to Excel

To export your Google Sheet data to Excel:
1. Open your Google Sheet
2. Go to **File** > **Download** > **Microsoft Excel (.xlsx)**
3. The file will download with all your form submissions

## Alternative: Using Formspree (Easier but Limited)

If you prefer a simpler solution:
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Get your form endpoint URL
4. Update the form action in `index.html`

However, Formspree free tier has limitations. Google Apps Script is free and unlimited.

## Need Help?

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)

