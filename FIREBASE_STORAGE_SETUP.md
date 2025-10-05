# Firebase Storage Setup Guide

## 🔧 **Required Firebase Console Setup:**

### **1. Enable Firebase Storage**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `zapex-675b8`
3. In the left sidebar, click **"Storage"**
4. Click **"Get started"**
5. Choose **"Start in test mode"** (for now)
6. Select a location (choose **asia-south1** for India)
7. Click **"Done"**

### **2. Update Storage Rules (Important!)**
1. In Storage section, go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### **3. Verify Storage Bucket**
- Your storage bucket should be: `zapex-675b8.firebasestorage.app`
- This should match your `FIREBASE_STORAGE_BUCKET` in `.env`

### **4. Test Storage Access**
After setup, the image upload should work without errors.

## 🚨 **If Still Having Issues:**

### **Check Your .env File:**
Make sure you have:
```
FIREBASE_STORAGE_BUCKET=zapex-675b8.firebasestorage.app
```

### **Alternative: Use Cloud Storage Rules**
If the above doesn't work, try these more permissive rules (for testing only):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## ✅ **After Setup:**
1. Restart your server: `npm run dev`
2. Try uploading an image
3. Check the server logs for any remaining errors

The image upload should now work perfectly! 🎉
