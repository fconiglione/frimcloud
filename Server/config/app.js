const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

    const cors = require('cors');
    app.use(cors({
        origin: process.env.CLIENT_URL,
        methods: "GET, POST, PUT, DELETE, HEAD, OPTIONS"
    }));
}

app.listen(3000);
module.exports = app;