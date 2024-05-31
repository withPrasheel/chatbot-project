const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
  userId: {     // Need to store last max count somewhere to generate unique userId
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
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

module.exports = Users;
