const { admin } = require('../config/firebase');

class UserService {
    constructor() {
        this.db = admin.firestore();
        this.usersCollection = this.db.collection('users');
    }

    // Generate business number with BIS prefix
    async generateBusinessNumber() {
        try {
            const snapshot = await this.usersCollection
                .orderBy('businessNumber', 'desc')
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return 'BIS00001';
            }
            
            const lastUser = snapshot.docs[0].data();
            const lastNumber = parseInt(lastUser.businessNumber.replace('BIS', ''));
            const nextNumber = (lastNumber + 1).toString().padStart(5, '0');
            
            return `BIS${nextNumber}`;
        } catch (error) {
            console.error('Error generating business number:', error);
            return 'BIS00001';
        }
    }

    // Create a new user
    async createUser(userData) {
        try {
            const businessNumber = await this.generateBusinessNumber();
            
            const user = {
                ...userData,
                businessNumber,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                status: 'active'
            };

            const docRef = await this.usersCollection.add(user);
            return { id: docRef.id, ...user };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            const snapshot = await this.usersCollection
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

    // Get user by ID
    async getUserById(userId) {
        try {
            const doc = await this.usersCollection.doc(userId).get();
            
            if (!doc.exists) {
                return null;
            }
            
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    }

    // Update user
    async updateUser(userId, userData) {
        try {
            const updateData = {
                ...userData,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            };

            await this.usersCollection.doc(userId).update(updateData);
            return { id: userId, ...updateData };
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Delete user
    async deleteUser(userId) {
        try {
            console.log('Attempting to delete user from Firestore with ID:', userId);
            
            // Check if document exists first
            const docRef = this.usersCollection.doc(userId);
            const doc = await docRef.get();
            
            if (!doc.exists) {
                console.log('Document does not exist for user ID:', userId);
                throw new Error('User not found');
            }
            
            console.log('Document exists, proceeding with deletion...');
            await docRef.delete();
            console.log('User successfully deleted from Firestore');
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Search users
    async searchUsers(query) {
        try {
            const snapshot = await this.usersCollection
                .where('email', '>=', query)
                .where('email', '<=', query + '\uf8ff')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    // Get user by business number (public API)
    async getUserByBusinessNumber(businessNumber) {
        try {
            const snapshot = await this.usersCollection
                .where('businessNumber', '==', businessNumber)
                .where('status', '==', 'active')
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return null;
            }
            
            const doc = snapshot.docs[0];
            const userData = doc.data();
            
            // Return public data only (exclude sensitive information)
            return {
                id: doc.id,
                name: userData.name,
                email: userData.email,
                mobileNumber: userData.mobileNumber,
                businessNumber: userData.businessNumber,
                bannerImage: userData.bannerImage,
                logo: userData.logo,
                reviewUrl: userData.reviewUrl,
                buttons: userData.buttons || [],
                socialLinks: userData.socialLinks || [],
                createdAt: userData.createdAt,
                status: userData.status
            };
        } catch (error) {
            console.error('Error getting user by business number:', error);
            throw error;
        }
    }
}

module.exports = new UserService();
