# Vercel Deployment Guide for Zapex

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Project Directory
```bash
cd /Users/apple/Documents/YOUNUZBN/zapex.in
vercel
```

### 4. Set Environment Variables
In your Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add all variables from `vercel-env.example`

## 🔧 Required Environment Variables

Copy these to Vercel dashboard:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-cert-url
FIREBASE_STORAGE_BUCKET=your-storage-bucket
ADMIN_EMAIL=your-admin-email@gmail.com
SESSION_SECRET=your-session-secret
```

## 📁 Project Structure for Vercel

```
zapex.in/
├── app.js                 # Main server file
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── config/
│   └── firebase.js       # Firebase config
├── middleware/
│   └── auth.js           # Auth middleware
├── services/
│   └── userService.js    # User service
├── views/                # EJS templates
├── public/               # Static assets
└── .env.example          # Environment template
```

## ✅ Features That Work on Vercel

- ✅ **Home Page**: Custom design with animations
- ✅ **Admin Dashboard**: Full authentication and user management
- ✅ **API Endpoints**: `/api/user/:businessNumber`
- ✅ **Dynamic Review Pages**: `/review?BIS=BIS00001`
- ✅ **File Uploads**: Firebase Storage integration
- ✅ **Database Operations**: Firestore integration
- ✅ **Authentication**: Firebase Admin SDK

## 🔄 Automatic Deployments

Connect your GitHub repository to Vercel for automatic deployments:

1. Go to Vercel Dashboard
2. Click "New Project"
3. Import from GitHub
4. Select `shammazp/zapex.in`
5. Deploy automatically

## 🌐 Custom Domain

After deployment, you can add a custom domain:
1. Go to Project Settings
2. Click "Domains"
3. Add your domain (e.g., `zapex.in`)

## 📊 Monitoring

Vercel provides built-in monitoring:
- Function logs
- Performance metrics
- Error tracking
- Analytics

## 🚨 Troubleshooting

### Common Issues:
1. **Environment Variables**: Make sure all Firebase variables are set
2. **Firebase Permissions**: Ensure service account has proper permissions
3. **CORS Issues**: Vercel handles CORS automatically
4. **File Uploads**: Check Firebase Storage bucket permissions

### Debug Commands:
```bash
# Check deployment logs
vercel logs

# Check function logs
vercel logs --follow

# Redeploy
vercel --prod
```

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Firebase project connected
- [ ] Admin email set correctly
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled

## 📈 Scaling

Vercel automatically scales your application:
- **Serverless Functions**: Auto-scaling based on demand
- **Global CDN**: Fast content delivery worldwide
- **Edge Functions**: Reduced latency
- **Automatic HTTPS**: SSL certificates included

Your Zapex application will run perfectly on Vercel! 🚀
