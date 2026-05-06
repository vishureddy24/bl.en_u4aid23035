const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json"
    }
});

module.exports = apiClient;
