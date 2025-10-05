# Firebase Setup Guide for Zapex Admin

This guide will help you set up Firebase Authentication for the Zapex admin panel.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `zapex-admin` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google" provider
5. Toggle "Enable" to ON
6. Set "Project support email" to your email
7. Click "Save"

## Step 3: Configure Authorized Domains

1. In Authentication > Settings > Authorized domains
2. Add your domains:
   - `localhost` (for development)
   - `zapex.in` (your main domain)
   - `admin.zapex.in` (your admin subdomain)

## Step 4: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. Enter app nickname: `zapex-admin`
6. Check "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. Copy the Firebase configuration object

## Step 5: Create Service Account

1. In Firebase Console, go to Project Settings
2. Click on "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file (keep it secure!)
5. Copy the contents of this JSON file

## Step 6: Configure Environment Variables

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Server Configuration
PORT=3000
SESSION_SECRET=your-session-secret-key

# Admin Configuration
ADMIN_EMAIL=younuzbn@gmail.com
```

## Step 7: Install Dependencies

```bash
npm install
```

## Step 8: Test the Setup

1. Start the server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin/login`
3. Try signing in with `younuzbn@gmail.com`
4. You should be redirected to the admin dashboard

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- The service account JSON file contains sensitive information
- Only `younuzbn@gmail.com` will be able to access the admin panel
- Consider using HTTPS in production

## Troubleshooting

### Common Issues:

1. **"Access denied" error**: Make sure you're signing in with `younuzbn@gmail.com`
2. **Firebase config errors**: Double-check all environment variables
3. **Session issues**: Ensure SESSION_SECRET is set in `.env`
4. **CORS errors**: Make sure your domain is in authorized domains

### Debug Steps:

1. Check browser console for JavaScript errors
2. Check server logs for authentication errors
3. Verify Firebase project settings
4. Ensure all environment variables are correctly set

## Production Deployment

When deploying to production:

1. Update authorized domains in Firebase Console
2. Set `secure: true` in session cookie settings (for HTTPS)
3. Use environment variables for all configuration
4. Enable HTTPS for your domain
5. Consider using a more secure session secret

## Support

If you encounter issues:
1. Check the Firebase Console for authentication logs
2. Verify your Google account has access to the Firebase project
3. Ensure all environment variables are correctly set
4. Check that the service account has proper permissions
