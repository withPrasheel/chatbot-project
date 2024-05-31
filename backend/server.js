const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
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

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/conversations', authenticateToken, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: message,
      max_tokens: 150,
    });

    const conversation = await Conversation.create({
      userId,
      message,
      response: response.data.choices[0].text.trim(),
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
