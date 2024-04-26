const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config();

const connectionString = `postgres://${process.env.FRIM_CLOUD_DB_USER}:${process.env.FRIM_CLOUD_DB_PASSWORD}@${process.env.FRIM_CLOUD_DB_HOST}:${process.env.FRIM_CLOUD_DB_PORT}/${process.env.FRIM_CLOUD_DB_NAME}?ssl=true`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

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
    },

    verifyTokenId: async (token_id) => {
        console.log("Token ID:", token_id);
        if (!token_id) {
            console.log("Token ID is required.");
            throw new Error("Token ID is required.");
        }
        try {
            const query = 'SELECT user_id, token FROM jwt_cloud_tokens WHERE token_id = $1';
            const values = [token_id];
            const { rows } = await pool.query(query, values);

            if (rows.length === 0) {
                throw new Error("Session token not found.");
            }
            const { user_id, token } = rows[0];
            return { user_id, token };
        } catch (error) {
            console.error("Error verifying session token:", error);
            throw new Error("Invalid session token during verification.");
        }
    },

    verifySessionToken: async (user_id, token) => {
        if (!user_id || !token) {
            throw new Error("Access denied. User ID or token not provided.");
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
            return userData;
        } catch (error) {
            console.error("Error verifying token:", error);
            throw new Error("Invalid token or user not found.");
        }
    }
}

module.exports = Auth;