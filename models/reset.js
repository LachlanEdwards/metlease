const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');

class Reset extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Reset.init( {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    expiry: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'reset',
  });
  return Reset;
};
