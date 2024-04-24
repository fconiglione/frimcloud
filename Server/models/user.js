const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const axios = require('axios');
const jwt = require('jsonwebtoken');

dotenv.config();

const connectionString = `postgres://${process.env.FRIM_CLOUD_DB_USER}:${process.env.FRIM_CLOUD_DB_PASSWORD}@${process.env.FRIM_CLOUD_DB_HOST}:${process.env.FRIM_CLOUD_DB_PORT}/${process.env.FRIM_CLOUD_DB_NAME}?ssl=true`;

class User {
  constructor() {
    this.pool = new Pool({
        connectionString: connectionString
      });
    }

    async createUser(token, fullName, email, password, receiveUpdates) {
        try {
            const response = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
            );
            if (!response.data.success) {
                throw new Error("Failed captcha verification");
            }
            else {
                console.log("Captcha verification successful");
                const hashedPassword = await bcrypt.hash(password, 10);
                const query = `INSERT INTO users (full_name, email, password, receive_updates) VALUES ($1, $2, $3, $4)`;
                const values = [fullName, email, hashedPassword, receiveUpdates];
                const result = await this.pool.query(query, values);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyUser(email, password) {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const result = await this.pool.query(query, [email]);
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
            else {
                const user = result.rows[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async generateJWTToken(user_id) {
        const token = jwt.sign( { user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    }

    async getUserById(userId) {
        try {
            const query = `SELECT * FROM users WHERE user_id = $1`;
            const result = await this.pool.query(query, [userId]);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = User;