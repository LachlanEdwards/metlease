const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const User = sequelize.import('../models/user');

class Review extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Review.init( {
    building_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    body: {
      type: Sequelize.STRING,
      validate: {
        len: [0, 999]
      }
    },
    rating: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'review',
  });
  Review.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  return Review;
};
