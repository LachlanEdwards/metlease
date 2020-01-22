const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');

class Apartment extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Apartment.init( {
    number: {
      type: Sequelize.STRING
    },
    bedroom: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 99
      }
    },
    bathroom: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 99
      }
    },
    garage: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 99
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        len: [0,999]
      }
    },
    building_id: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER,
    },
    features: {
      type: Sequelize.STRING,
      validate: {
        len: [0,999]
      }
    },
    contribution_entitlements: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 99
      },
      allowNull: true
    },
    size: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 10000
      },
    },
    state: {
      type: Sequelize.STRING,
      values: ['Sale', 'Lease', 'Off-Market']
    }

  }, {
    sequelize,
    modelName: 'apartment',
  });
  return Apartment;
};
