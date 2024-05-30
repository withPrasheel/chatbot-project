const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./backend/routes/auth');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Database synchronization
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
