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
      const result = await user.addUserToCloudDB(sub, nickname, name, picture, updated_at);

      const storedUser = result.rows[0];
      client.release();
  
      res.status(200).json({ message: 'User data stored in Cloud DB', user: storedUser });
    } catch (error) {
      console.error('Error storing user data:', error);
      res.status(500).json({ message: 'Error storing user data', error: error.message });
    }
  });

router.post('/register', async (req, res) => {
    const { token, fullName, email, password, receiveUpdates } = req.body;
    const user = new User();
    try {
        const result = await user.createUser(token, fullName, email, password, receiveUpdates);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send(error);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new User();
    try {
        const result = await user.verifyUser(email, password);
        const JWTToken = await user.generateJWTToken(result.user_id);

        const cookieOptions = {
            expires: new Date(Date.now() + 86400 * 1000),
            httpOnly: false, // Setting to false until SSO integration is complete
            secure: process.env.NODE_ENV === 'development' ? false : true,
            sameSite: 'None',
            domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.frim.io',
            path: '/'
        };

        // Set the token ID in a cookie and send the user's full name in the response
        res.cookie('token', JWTToken.token, cookieOptions);
        res.cookie('user_id', result.user_id, cookieOptions);
        // Temporarily sending token and user_id until SSO integration is complete
        res.status(200).send({ full_name: result.full_name, token: JWTToken.token, user_id: result.user_id });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send(error);
    }
});

router.post('/verify', async (req, res) => {
    const token = req.cookies.token;
    const user_id = req.cookies.user_id;
    if ((!token || token === 'undefined') || (!user_id || user_id === 'undefined')) {
        console.log("Token and user ID is required");
        return res.status(400).send({ error: 'Token and user ID is required' });
    }
    try {
        await Auth.verifyJWTTokenByCookie(token, user_id, async () => {
            console.log("Token is valid");
            res.status(200).send({ message: 'Token is valid' });
        });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).send(error);
    }
});

// For other apps to verify the session
router.post('/verify-session', async (req, res) => {
    // Unable to get these values from the cookies
    const token = req.cookies.token;
    const user_id = req.cookies.user_id;
    console.log("Cookies:", req.cookies);
    if ((!token || token === 'undefined') || (!user_id || user_id === 'undefined')) {
        console.log("Token and user ID is required");
        return res.status(400).send({ error: 'Token and user ID is required' });
    }
    try {
        const verified = await Auth.verifySessionToken(user_id, token);
        res.status(200).send(verified);
    } catch (error) {
        console.error("Error verifying session:", error, token);
        res.status(500).send({ error: 'Error verifying session', message: error.message, token });
    }
});

// Admin for testing
router.post('/admin-verify-session', async (req, res) => {
    const { token_id } = req.body;
    if (!token_id) {
        return res.status(400).send({ error: 'Token ID is required' });
    }
    try {
        const { user_id, token } = await Auth.verifyTokenId(token_id);
        if (!user_id || !token) {
            throw new Error("Invalid session token");
        } else {
            const verified = await Auth.verifySessionToken(user_id, token);
            res.status(200).send(verified);
        }
    } catch (error) {
        console.error("Error verifying session:", error, token_id);
        res.status(500).send({ error: 'Error verifying session', message: error.message, token_id });
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie("token", { httpOnly: true, path: "/", maxAge: -1 })
    res.clearCookie("user_id", { httpOnly: true, path: "/", maxAge: -1 })
    res.status(200).send({ message: "User logged out" });
});

module.exports = router;