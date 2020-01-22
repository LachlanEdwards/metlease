const Sequelize = require('sequelize');

const sequelize = new Sequelize('ml', 'root', 'root1234', {
  dialect: 'mysql',
})

module.exports = sequelize;
