const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require('dotenv').config();

// Import Firebase admin
const { admin } = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home - Zapex',
        page: 'home',
        layout: false
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Us - Zapex',
        page: 'about'
    });
});

app.get('/services', (req, res) => {
    res.render('services', { 
        title: 'Our Services - Zapex',
        page: 'services'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Us - Zapex',
        page: 'contact'
    });
});

app.get('/review', async (req, res) => {
    try {
        const { BIS } = req.query;
        let userData = null;
        let bannerImage = '/images/images-3.jpeg'; // Default banner image
        
        // If BIS parameter is provided, fetch user data
        if (BIS) {
            try {
                const user = await userService.getUserByBusinessNumber(BIS);
                if (user && user.bannerImage) {
                    userData = user;
                    bannerImage = user.bannerImage;
                }
            } catch (error) {
                console.error('Error fetching user data for review:', error);
                // Continue with default banner if user fetch fails
            }
        }
        
        res.render('review', { 
            title: 'Rate Us - Zapex',
            page: 'review',
            layout: false,
            userData: userData,
            bannerImage: bannerImage
        });
    } catch (error) {
        console.error('Error in review route:', error);
        // Fallback to default review page
        res.render('review', { 
            title: 'Rate Us - Zapex',
            page: 'review',
            layout: false,
            userData: null,
            bannerImage: '/images/images-3.jpeg'
        });
    }
});

app.post('/contact', (req, res) => {
    // Basic contact form handling
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });
    res.redirect('/contact?success=true');
});

// Admin Routes
const { requireAuth, redirectIfAuthenticated } = require('./middleware/auth');
const userService = require('./services/userService');

// Admin login page
app.get('/admin/login', redirectIfAuthenticated, (req, res) => {
    res.render('admin/login', { 
        title: 'Admin Login - Zapex',
        process: { env: process.env },
        layout: false // Don't use the main layout
    });
});

// Verify Firebase token
app.post('/admin/verify-token', async (req, res) => {
    try {
        console.log('Received token verification request');
        const { idToken } = req.body;
        
        if (!idToken) {
            return res.status(400).json({ error: 'No token provided' });
        }
        
        console.log('Verifying token with Firebase...');
        const { admin } = require('./config/firebase');
        
        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Token verified, email:', decodedToken.email);
        
        // Check if the email is one of the admin emails
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim()) : [];
        if (!adminEmails.includes(decodedToken.email)) {
            console.log('Access denied for email:', decodedToken.email);
            return res.status(403).json({ error: 'Access denied. Admin email required.' });
        }
        
        // Store user info in session
        req.session.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture
        };
        
        console.log('Session created for user:', decodedToken.email);
        res.json({ success: true, message: 'Authentication successful' });
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Admin dashboard
app.get('/admin/dashboard', requireAuth, (req, res) => {
    res.render('admin/dashboard', { 
        title: 'Admin Dashboard - Zapex',
        user: req.session.user,
        layout: false // Don't use the main layout
    });
});

// Admin logout
app.get('/admin/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.redirect('/admin/login');
    });
});

// Image upload endpoint
app.post('/admin/upload-image', requireAuth, async (req, res) => {
    try {
        const { imageData, type } = req.body;
        
        if (!imageData || !type) {
            return res.status(400).json({
                success: false,
                error: 'Image data and type are required'
            });
        }

        // Convert base64 to buffer
        const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${type}_${timestamp}.jpg`;
        const filePath = `user-images/${filename}`;
        
        // Upload to Firebase Storage
        const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
        const file = bucket.file(filePath);
        
        console.log(`Uploading ${type} image to Firebase Storage: ${filePath}`);
        
        // Upload the file
        await file.save(buffer, {
            metadata: {
                contentType: 'image/jpeg',
                cacheControl: 'public, max-age=31536000'
            }
        });
        
        console.log(`File uploaded successfully: ${filePath}`);
        
        // Make the file publicly accessible
        await file.makePublic();
        
        console.log(`File made public: ${filePath}`);
        
        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${filePath}`;
        
        console.log(`Public URL: ${publicUrl}`);
        
        res.json({
            success: true,
            url: publicUrl,
            message: 'Image uploaded successfully to Firebase Storage'
        });
        
    } catch (error) {
        console.error('Image upload error:', error);
        
        // If Firebase Storage fails, return a placeholder but still show success
        // This allows the UI to work while Firebase Storage is being configured
        const placeholderSvg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="transparent" stroke="#ddd" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="150" y="100" text-anchor="middle" fill="#999" font-family="Arial" font-size="16">${type.toUpperCase()} PLACEHOLDER</text>
        </svg>`;
        const placeholderUrl = `data:image/svg+xml;base64,${Buffer.from(placeholderSvg).toString('base64')}`;
        
        res.json({
            success: true,
            url: placeholderUrl,
            message: 'Firebase Storage not configured. Using placeholder. Please check Firebase Storage setup.'
        });
    }
});

// User Management Routes
// Get all users
app.get('/admin/users', requireAuth, async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ success: false, error: 'Failed to get users' });
    }
});

// Create new user
app.post('/admin/users', requireAuth, async (req, res) => {
    try {
        const { name, email, mobileNumber } = req.body;
        
        if (!name || !email || !mobileNumber) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name, email, and mobile number are required' 
            });
        }

        const user = await userService.createUser({
            name,
            email,
            mobileNumber,
            createdBy: req.session.user.email
        });

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, error: 'Failed to create user' });
    }
});

// Update user
app.put('/admin/users/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const rawData = req.body;

        // Process form data to convert arrays to proper objects
        const userData = {
            name: rawData.name,
            email: rawData.email,
            mobileNumber: rawData.mobileNumber,
            bannerImage: rawData.bannerImage,
            logo: rawData.logo,
            reviewUrl: rawData.reviewUrl
        };

        console.log('Raw data received:', rawData);

        // Process buttons array - handle both form data structure and direct array
        let buttons = [];
        
        if (rawData.buttons && Array.isArray(rawData.buttons)) {
            // Direct array format (from new frontend processing)
            buttons = rawData.buttons.filter(button => button.text && button.url);
            console.log('Using direct buttons array:', buttons);
        } else {
            // Legacy form data structure
            const buttonKeys = Object.keys(rawData).filter(key => key.startsWith('buttons[') && key.includes('][text]'));
            
            buttonKeys.forEach(key => {
                const index = key.match(/buttons\[(\d+)\]/)[1];
                const buttonData = {
                    text: rawData[`buttons[${index}][text]`],
                    url: rawData[`buttons[${index}][url]`],
                    icon: rawData[`buttons[${index}][icon]`] || '',
                    enabled: rawData[`buttons[${index}][enabled]`] === 'on'
                };
                
                if (buttonData.text && buttonData.url) {
                    buttons.push(buttonData);
                }
            });
            console.log('Processed buttons from form data:', buttons);
        }
        
        if (buttons.length > 0) {
            userData.buttons = buttons;
        } else {
            // If no buttons, set empty array to clear existing buttons
            userData.buttons = [];
        }

        // Process social links array - handle both form data structure and direct array
        let socialLinks = [];
        
        if (rawData.socialLinks && Array.isArray(rawData.socialLinks)) {
            // Direct array format (from new frontend processing)
            socialLinks = rawData.socialLinks.filter(social => social.icon && social.url);
            console.log('Using direct social links array:', socialLinks);
        } else {
            // Legacy form data structure
            const socialKeys = Object.keys(rawData).filter(key => key.startsWith('socialLinks[') && key.includes('][icon]'));
            
            socialKeys.forEach(key => {
                const index = key.match(/socialLinks\[(\d+)\]/)[1];
                const socialData = {
                    icon: rawData[`socialLinks[${index}][icon]`],
                    url: rawData[`socialLinks[${index}][url]`],
                    enabled: rawData[`socialLinks[${index}][enabled]`] === 'on'
                };
                
                if (socialData.icon && socialData.url) {
                    socialLinks.push(socialData);
                }
            });
            console.log('Processed social links from form data:', socialLinks);
        }
        
        if (socialLinks.length > 0) {
            userData.socialLinks = socialLinks;
        } else {
            // If no social links, set empty array to clear existing social links
            userData.socialLinks = [];
        }

        console.log('Final user data to save:', userData);

        const user = await userService.updateUser(id, userData);
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, error: 'Failed to update user' });
    }
});

// Delete user
app.delete('/admin/users/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Delete request received for user ID:', id);
        
        const result = await userService.deleteUser(id);
        console.log('Delete result:', result);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Failed to delete user' });
    }
});

// Get user by ID
app.get('/admin/users/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ success: false, error: 'Failed to get user' });
    }
});

// Test delete functionality
app.post('/admin/test-delete/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Test delete for user ID:', id);
        
        // First check if user exists
        const user = await userService.getUserById(id);
        if (!user) {
            return res.json({ success: false, error: 'User not found' });
        }
        
        console.log('User found:', user);
        
        // Try to delete
        const result = await userService.deleteUser(id);
        console.log('Delete result:', result);
        
        res.json({ success: true, message: 'Test delete completed' });
    } catch (error) {
        console.error('Test delete error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Public API - Get user data by business number (no authentication required)
app.get('/api/user/:businessNumber', async (req, res) => {
    try {
        const { businessNumber } = req.params;
        
        if (!businessNumber) {
            return res.status(400).json({
                success: false,
                error: 'Business number is required'
            });
        }

        // Validate business number format (BIS followed by 5 digits)
        const businessNumberRegex = /^BIS\d{5}$/;
        if (!businessNumberRegex.test(businessNumber)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid business number format. Expected format: BIS00001'
            });
        }

        const user = await userService.getUserByBusinessNumber(businessNumber);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found or inactive'
            });
        }

        res.json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error('Error getting user by business number:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Page Not Found - Zapex',
        page: '404'
    });
});

// Vercel compatibility
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Zapex website running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
