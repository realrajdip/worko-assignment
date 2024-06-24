const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(userRoutes);

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.log('Failed to connect to the database', err);
});

module.exports = app;
