const { Sequelize } = require('sequelize');
const config = require("../config/config.json")
const sequelize = new Sequelize(config.development);

// Database connection
async function dbConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, dbConnection };
