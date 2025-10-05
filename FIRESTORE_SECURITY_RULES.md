# Firestore Security Rules

## Current Rule (Development - NOT SECURE)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 11, 1);
    }
  }
}
```

## Recommended Secure Rules

### Option 1: Admin-Only Access (Recommended for your use case)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow authenticated users with specific email
    match /{document=**} {
      allow read, write: if request.auth != null 
        && request.auth.token.email == "younuzbn@gmail.com";
    }
  }
}
```

### Option 2: User Collection with Admin Access
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only admin can read/write
    match /users/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.token.email == "younuzbn@gmail.com";
    }
    
    // Deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Option 3: Public Read, Admin Write (if you want public access)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.email == "younuzbn@gmail.com";
    }
  }
}
```

## How to Update Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `zapex-675b8`
3. Go to **Firestore Database** → **Rules** tab
4. Replace the current rules with one of the recommended options above
5. Click **Publish**

## Security Benefits

- ✅ **Authentication Required**: Only logged-in users can access
- ✅ **Email Verification**: Only your specific email can access
- ✅ **No Expiration**: Rules won't suddenly deny access
- ✅ **Data Protection**: Prevents unauthorized access
- ✅ **Audit Trail**: Firebase logs all access attempts

## Testing

After updating rules:
1. Test admin access (should work)
2. Test without login (should be denied)
3. Test with different email (should be denied)
