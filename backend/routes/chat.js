const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const Conversation = require('../models/Conversation');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/prompt', async (req, res) => {
  const { username, message } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if(!user) 
      return res.status(404).json({ message: 'User not found' });

    const conversation = await Conversation.create({
      userId: user.userId,
      message,
      isUserMessage: true
    });

    res.status(201).json({ message: 'Message added to db', conversation });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/retrieve', async (req, res) => {
  const { username, userId } = req.body;
  let userid = userId;
  try {
    if(!userid){
      const user = await Users.findOne({ where: { username } });
      if(!user) 
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

router.get('/retrieve/sec', async (req, res) => {
  const { username, userId } = req.body;
  let userid = userId;
  try {
    if(!userid){
      const user = await Users.findOne({ where: { username } });
      if(!user) 
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
