// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes');
const profileRoutes = require('./routes/profileroutes');
const adminRoutes = require('./routes/adminroutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/authentication_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
