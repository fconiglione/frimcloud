const express = require('express');
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
        res.status(200).send(result);
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send(error);
    }
});

module.exports = router;