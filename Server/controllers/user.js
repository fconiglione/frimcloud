const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

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
        console.log("User:", result);
        console.log("Token:", JWTToken);
        res.status(200).send({ user_id: result, token: JWTToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send(error);
    }
});

module.exports = router;