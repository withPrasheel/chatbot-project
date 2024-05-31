const express = require('express');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth');
const bcrypt = require('bcryptjs');
const Users = require('./models/Users.js'); // Ensure the path to your User model is correct
// const sequelize = require('./config/database'); 
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  const maxUser = await Users.max('userId');
  // const userId = maxUser ? maxUser + 1 : 1;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Create the user
    const user = await Users.create({
      email,
      userName: username,
      // userId,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  res.send(`Username: ${username}, Password: ${password}`);
});


// Database synchronization
// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.log('Error: ' + err));



// // const { Configuration, OpenAIApi } = require("openai");

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // app.post('/api/conversations', authenticateToken, async (req, res) => {
// //   const { message } = req.body;
// //   const userId = req.user.id;

// //   try {
// //     const response = await openai.createCompletion({
// //       model: "text-davinci-002",
// //       prompt: message,
// //       max_tokens: 150,
// //     });

// //     const conversation = await Conversation.create({
// //       userId,
// //       message,
// //       response: response.data.choices[0].text.trim(),
// //     });

// //     res.status(201).json(conversation);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

