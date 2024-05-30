const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conversation = sequelize.define('Conversation', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isUserMessage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  timeStamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }
}, {
  timestamps: true,
});

module.exports = Conversation;
