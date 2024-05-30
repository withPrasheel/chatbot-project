const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {     // Need to store last max count somewhere to generate unique userId
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  reqCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastLoginTimeStamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = User;