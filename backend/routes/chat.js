const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const Conversation = require('../models/Conversation');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
const openai = new OpenAI();

const router = express.Router();

router.post('/prompt', async (req, res) => {
  const { username, message } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    await Conversation.create({
      userId: user.userId,
      message,
      isUserMessage: true
    });
    const conversations = await Conversation.findAll({ where: { userId: user.userId } });
    let messages = [];
    conversations.forEach((conv) => {
      messages.push({ role: conv.isUserMessage ? "user" : "system", content: conv.message });
    });

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });
    let responseMsg = completion.choices[0].message.content;
    await Conversation.create({
      userId: user.userId,
      message: responseMsg,
      isUserMessage: false
    });
    res.status(201).json({ response: completion.choices[0] });
    
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/retrieve/:username', async (req, res) => {
  console.log('req.body:', req.body);
  const { username } = req.params;
  let userid = null;
  try {
    // if (!userid) {
      const user = await Users.findOne({ where: { username } });
      if (!user)
        return res.status(404).json({ message: 'User not found' });
      else
        userid = user.userId;
    // }
    const conversation = await Conversation.findAll({ where: { userid } });
    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/retrieve/sec', async (req, res) => {
  const { username, userId } = req.body;
  let userid = userId;
  try {
    if (!userid) {
      const user = await Users.findOne({ where: { username } });
      if (!user)
        return res.status(404).json({ message: 'User not found' });
      else
        userid = user.userId;
    }
    const conversation = await Conversation.findAll({ where: { userid } });

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
