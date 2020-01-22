const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');

class Suburb extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Suburb.init( {
    postcode: {
      type: Sequelize.STRING,
      validate: {
        len: [3, 4]
      }
    },
    suburb: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
      validate: {
        len: [3,4]
      }
    },
    latitude: {
      type: Sequelize.DECIMAL
    },
    longitude: {
      type: Sequelize.DECIMAL
    },
  }, {
    sequelize,
    modelName: 'suburb',
  });
  return Suburb;
};
