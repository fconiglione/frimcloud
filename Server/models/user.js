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

    // Add user to cloud database from Auth0 by Okta
    async addUserToCloudDB(sub, nickname, name, picture, updated_at) {
        try {
          const query = `INSERT INTO cloud.users (sub, nickname, name, picture, updated_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (sub) DO UPDATE SET nickname = $2, name = $3, picture = $4, updated_at = $5 RETURNING *`;
          const values = [sub, nickname, name, picture, updated_at];
          const result = await this.pool.query(query, values);
          return result;
        } catch (error) {
          throw error;
        }
      }

    // Check if user already exists in cloud database
    async userExists(sub) {
    try {
        const result = await this.pool.query('SELECT sub FROM cloud.users WHERE sub = $1', [sub]);
        return result.rows.length > 0;
    } catch (error) {
        throw error;
    }
    }
    
}

module.exports = User;