# Quick Setup Guide - Contact Form

## 🚀 Quick Start (5 Minutes)

### 1. Create Google Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new sheet → Name it "Contact Form Submissions"
- Add headers in Row 1: `Timestamp | Name | Email | Message`
- Copy Sheet ID from URL (the long string between `/d/` and `/edit`)

### 2. Create Google Apps Script
- Go to [script.google.com](https://script.google.com)
- New Project → Delete default code
- Copy ALL code from `google-apps-script.js`
- Paste into editor
- **Update these 3 lines:**
  ```javascript
  const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
  const RECIPIENT_EMAIL = 'your-email@gmail.com';
  const SHEET_NAME = 'Sheet1';
  ```
- Save (Ctrl+S)

### 3. Deploy Script
- Click **Deploy** → **New deployment**
- Click ⚙️ → Select **Web app**
- Set:
  - Execute as: **Me**
  - Who has access: **Anyone** ⚠️ (Important!)
- Click **Deploy**
- **Copy the Web App URL**

### 4. Update Your Website
- Open `script.js`
- Find: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
- Replace with your Web App URL:
  ```javascript
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_URL/exec';
  ```

### 5. Authorize Permissions
- Go back to Apps Script
- Click **Run** ▶️
- Click **Review Permissions** → **Allow**

### 6. Test It!
- Open your website
- Fill out contact form
- Submit
- Check your email and Google Sheet! ✅

---

## 📋 What You Need

- ✅ Google account
- ✅ Sheet ID (from Google Sheets URL)
- ✅ Your email address
- ✅ 5 minutes

## 🆘 Troubleshooting

**Form not working?**
- Check browser console (F12) for errors
- Verify Web App URL is correct in `script.js`
- Make sure script is deployed with "Anyone" access

**No email received?**
- Check spam folder
- Verify `RECIPIENT_EMAIL` in script
- Check Apps Script execution log

**Data not saving?**
- Verify `SHEET_ID` is correct
- Check `SHEET_NAME` matches your sheet tab name
- Make sure headers exist in Row 1

---

For detailed instructions, see `SETUP_INSTRUCTIONS.md`


