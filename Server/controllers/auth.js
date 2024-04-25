const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Auth = {
    async verifyJWTToken(req, res, next) {
        const { user_id, token } = req.body;
        console.log("User Id (from body):", user_id);
        console.log("Token:", token);
        if (!user_id || !token) {
            return res.status(401).send("Access denied. User ID or token not provided.");
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
            if (String(decoded.user_id) !== String(user_id)) {
                console.log("Invalid user ID in token.");
                throw new Error("Invalid user ID in token.");
            }
            const user = new User();
            const userData = await user.getUserById(user_id);
            if (!userData) {
                throw new Error("User not found.");
            }
            req.user = userData;
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(400).send("Invalid token or user not found.");
        }
    }
}

module.exports = Auth;