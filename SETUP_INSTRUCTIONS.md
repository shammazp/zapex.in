# Zapex Admin Setup Instructions

## 🚀 Quick Setup Guide

Your Firebase configuration is ready! Here's what you need to do:

### 1. Create Environment File
Create a `.env` file in your project root with these contents:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=zapex-675b8
FIREBASE_PRIVATE_KEY_ID=71b873ee10832c19102f004d8c81f69ae6065f86
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCOK24Rp8ItMymk\n5NHRSHjFfaSyDYUzNmDqYt9FZjAAwwmddZUpFteQmKhUgz1b4T2rhSZYUczFW7mT\nI7GDtv+V0cUMcCVafJCfpMu7FvNFyxLVSDtX5YWdSG0ZyZqYVpfv+k2Tc8RxtmQt\n64O753SxQZWiHAzR6nml7tok2Lh8rk9vbLJY1oRyc69vVrQHtYvlggMqmGbzIgiy\nIcuihzuJ3dyB5M4xHRmzdjh/9UEX9k8d3bNJ/Vzh5i0w5c9Eufs9v7tyrnH4G5zK\nFgFv1SGMGxKPef22qsCS3b+w/oDYbnzlF86cs1WYrHaESnGsQrptFZHFQcwnfUH4\nGbvEI0SRAgMBAAECggEADmme9ZV+EQa9J6kmT6sDClNd00qdWKcgPVazZ4XP4z3i\nf0bcrZ8SEKe3NeUdnu9HSRh9HgpB4faV6jGdxPpz7+hli2ihksoqv7JtUGzH0gkf\nokVZtcQQDvU5ETqPzHaH3eVQQLzlWvlIb+LOtqmE2hTp4lapYoz8ktqzXPWnA0Wi\nUaXXHulDcYFVGfjO8ozrFnX2xQHx8cQbjI6WD3U3M9XyNM/52/vGtk3CLrswFRO2\nWY2sJV5Q186YZUW+8oZsDL5K9L3lG+8B/OamhZRFUmA7qDXm5egMrxkoTZG+VrCh\n72tE7UF/KL7CJr/Lc5i7Q1rPiVcMZAHkDT4VbQ8uuQKBgQDHp8mLX01DhJZZ3ybZ\nITglAy3rkLTX48MZFY2yE0oQEHKN6gn7ZUXpS+3SErUimgMv0076JjvPpe5LwKEZ\nagrjlXLnwaf+CiqfqHB1v2XpTO7vH2DbbrS4wSV61Vr/Z1nU4U6n4ne+TByR4b0L\n4cEVkh1T3fJk7B43+NawHG2IyQKBgQC2So1nui4UJlYvVTU8+U7iSpuZJB43MdrQ\nH/ds4LzEKzLnkZJn8wbl9UIqu1v5oE3H1BOO+E2qCDBXT+zZfFMkp89hEp4MF9Ij\nNYiIxDHcm5ug881baWnWyCpMPNj+/EhRVe6tcDEzSk+nsl3rNhqigaQCxVOkedgr\nwCa+BwYJiQKBgQCSMj21rZpRB2Rk+K9krRuElrhoVvTlZSU2V/8C13cTHkgTvL2E\ndVrlAzFo80Ppy2br/UpGh/qiCXndxHbyuiCxF30lUTvnHKCrelanEfjZBfmr5Yky\nBPWWl/AO6u4QOSihZj4HVyChmvAMroSUj8GoPu70u3/EANX73F2wZZCbaQKBgQCU\nLcv+SmhUdslOFox9MQc/iXgsJyDsqvj8f0+oUJMBP0BU3o9NMk8kNJaBl+Vu6DDx\nw+HWMN8o3Rk2kECulZIcVNCNTw3sNJzbhBOlYR5K/q6mSihfKzQepH1FlZyqwTaj\n7x9iGrXTxI81eRdBMKy79nf0zKRuKaFgBwU3KQxuSQKBgQCGcFzS56j1UUImkU8N\niUVSkHuvmdK2z3RxwgYLFHhW2Rp5ItOa874KfCyEvWLW3UncQ/irHBmGuh1kINQ8\nSvh3PCt0jxip5HAnsXAm3+4aNNMZ0uDsUAYMoUi3jGaR3/nUZOdx7MJYFMw2qgCn\nSCbXGRF+YIngLXV9pvUha+A+eA==\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@zapex-675b8.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=108913790269553487342
FIREBASE_API_KEY=AIzaSyAQmjZbt5oIxOM-kNKI9DH9upE2N6UUStQ
FIREBASE_AUTH_DOMAIN=zapex-675b8.firebaseapp.com
FIREBASE_STORAGE_BUCKET=zapex-675b8.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=215244647697
FIREBASE_APP_ID=1:215244647697:web:1a24d626b1c81152d3b0b0

# Server Configuration
PORT=3000
SESSION_SECRET=zapex-admin-super-secret-key-2024-nfc-service

# Admin Configuration
ADMIN_EMAIL=younuzbn@gmail.com
```

### 2. Install Dependencies
Run this command in your terminal:
```bash
npm install
```

If you get disk space errors, try:
```bash
npm cache clean --force
npm install
```

### 3. Start the Server
```bash
npm run dev
```

### 4. Access Your Sites
- **Main Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard (after login)

## 🔐 Firebase Console Setup

### Enable Google Authentication:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `zapex-675b8`
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** provider
5. Add authorized domains:
   - `localhost`
   - `zapex.in`
   - `admin.zapex.in`

### Test the Setup:
1. Open http://localhost:3000/admin/login
2. Click "Sign in with Google"
3. Use your `younuzbn@gmail.com` account
4. You should be redirected to the admin dashboard

## 🚨 Important Security Notes

- Only `younuzbn@gmail.com` can access the admin panel
- Keep your `.env` file secure and never commit it to git
- The private key is sensitive - don't share it
- Use HTTPS in production

## 🛠️ Troubleshooting

### If npm install fails:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Try again: `npm install`

### If authentication fails:
1. Check Firebase Console settings
2. Verify authorized domains
3. Make sure you're using the correct email
4. Check browser console for errors

## 📁 Project Structure
```
zapex.in/
├── .env                    # Environment variables (create this)
├── app.js                  # Main server file
├── package.json           # Dependencies
├── config/
│   └── firebase.js        # Firebase configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── views/
│   ├── admin/
│   │   ├── login.ejs      # Admin login page
│   │   └── dashboard.ejs  # Admin dashboard
│   └── ...                # Other pages
└── public/
    └── css/
        └── admin.css      # Admin styles
```

## 🎉 You're All Set!

Once you complete these steps, you'll have:
- ✅ Main Zapex website (zapex.in)
- ✅ Admin login with Google authentication
- ✅ Protected admin dashboard
- ✅ Email-restricted access (only younuzbn@gmail.com)

The system is ready to use! 🚀
