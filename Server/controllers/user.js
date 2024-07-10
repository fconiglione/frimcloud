const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Auth = require('../controllers/auth');

// Adding users to Frim Cloud database
router.post('/auth/callback', async (req, res) => {
    try {
        const { sub, nickname, name, picture, updated_at } = req.body;
        const user = new User();
        // Check if the user already exists
        const userExists = await user.userExists(sub);

        if (userExists) {
            return res.status(200).json({ message: 'User already exists in Cloud DB' });
        }

        // Add the user to the cloud database if they don't exist
        const result = await user.addUserToCloudDB(sub, nickname, name, picture, updated_at);
        const storedUser = result.rows[0];

        res.status(200).json({ message: 'User data stored in Cloud DB', user: storedUser });
    } catch (error) {
        console.error('Error storing user data:', error);
        res.status(500).json({ message: 'Error storing user data', error: error.message });
    }
  });

module.exports = router;