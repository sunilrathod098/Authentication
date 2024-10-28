const express = require('express');
const connectDB = require('./confi/db.js');
const authRoutes = require('./routes/auth.routes.js');
const path = require("path");
const cors  = require("cors")
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

//


// Middleware
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});