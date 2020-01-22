const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');

class Media extends Sequelize.Model {
}

module.exports = (sequelize, DataTypes) => {
  Media.init( {
    public_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    entity: {
      type: Sequelize.STRING,
      allowNull: false,
      values: ['User', 'Building', 'Review', 'Update', 'Post']
    },
    entity_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'media',
  });
  return Media;
};
