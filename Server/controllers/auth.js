const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Auth = {
    async verifyJWTToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.getUserById(decoded.user_id);
            if (!user) {
                throw new Error("User not found.");
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).send("Invalid token or user not found.");
        }
    }
}

export default Auth;