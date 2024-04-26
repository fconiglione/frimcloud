const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Auth = require('../controllers/auth');

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
        res.status(200).send({ user_id: result.user_id, token: JWTToken.token, full_name: result.full_name, token_id: JWTToken.token_id });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send(error);
    }
});

router.post('/verify', async (req, res) => {
    const { user_id, token } = req.body;
    console.log("User ID:", user_id);
    if (!user_id || !token) {
        console.log("User ID and token are required");
        return res.status(400).send({ error: 'User ID and token are required' });
    }
    try {
        await Auth.verifyJWTToken(req, res, async () => {
            res.status(200).send({ message: 'Token is valid' });
        });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).send(error);
    }
});

module.exports = router;