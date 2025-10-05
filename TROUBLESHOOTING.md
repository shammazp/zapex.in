# Zapex Admin Authentication Troubleshooting

## 🔍 **Current Issue: Login Loop**

You're experiencing a login loop where after Google authentication, you're redirected back to the login page. This is likely due to Firebase Console configuration.

## ✅ **Step-by-Step Fix:**

### 1. **Enable Google Authentication in Firebase Console**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `zapex-675b8`
3. Click **Authentication** in the left sidebar
4. Click **Get started** if you haven't set up authentication yet
5. Go to **Sign-in method** tab
6. Click on **Google** provider
7. Toggle **Enable** to ON
8. Set **Project support email** to your email
9. Click **Save**

### 2. **Add Authorized Domains**

1. In Firebase Console → Authentication → Settings
2. Scroll down to **Authorized domains**
3. Add these domains:
   - `localhost`
   - `zapex.in`
   - `admin.zapex.in`

### 3. **Test the Authentication Flow**

1. Open browser developer tools (F12)
2. Go to http://localhost:3000/admin/login
3. Click "Sign in with Google"
4. Check the **Console** tab for any errors
5. Check the **Network** tab for failed requests

### 4. **Common Issues & Solutions**

#### **Issue: "Access denied" error**
- **Cause:** Email not matching `younuzbn@gmail.com`
- **Solution:** Make sure you're signing in with the correct Google account

#### **Issue: Firebase config errors**
- **Cause:** Environment variables not loaded
- **Solution:** Check that your `.env` file exists and has correct values

#### **Issue: "Invalid token" error**
- **Cause:** Firebase Admin SDK not configured properly
- **Solution:** Verify all Firebase credentials in `.env` file

#### **Issue: Page keeps refreshing**
- **Cause:** Session not being created properly
- **Solution:** Check server logs for authentication errors

## 🔧 **Debug Steps:**

### **Check Server Logs:**
Look for these messages in your terminal:
```
Received token verification request
Verifying token with Firebase...
Token verified, email: younuzbn@gmail.com
Session created for user: younuzbn@gmail.com
```

### **Check Browser Console:**
Look for these messages:
```
Firebase Config: {apiKey: "...", ...}
Sending token to server...
Server response: 200
Authentication successful, redirecting...
```

### **Check Network Tab:**
- Look for POST request to `/admin/verify-token`
- Check if it returns 200 status
- Verify the response contains `{"success": true}`

## 🚨 **If Still Not Working:**

### **Reset Everything:**
1. Stop the server (Ctrl+C)
2. Clear browser cache and cookies
3. Restart the server: `npm run dev`
4. Try again

### **Check Firebase Console:**
1. Go to Authentication → Users
2. See if your account appears after login attempt
3. If not, Google Auth isn't enabled properly

### **Manual Test:**
1. Open http://localhost:3000/admin/login
2. Open browser console (F12)
3. Look for any JavaScript errors
4. Check if Firebase is initialized correctly

## 📞 **Need Help?**

If you're still having issues:
1. Check the server terminal for error messages
2. Check browser console for JavaScript errors
3. Verify Firebase Console settings
4. Make sure you're using `younuzbn@gmail.com` for login

## 🎯 **Expected Flow:**

1. **Click "Sign in with Google"** → Google popup appears
2. **Select account** → Google redirects back
3. **Server verifies token** → Creates session
4. **Redirect to dashboard** → Admin panel loads

If any step fails, check the corresponding section above!
