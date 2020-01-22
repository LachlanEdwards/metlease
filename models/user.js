const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const bcrypt = require('bcrypt');
const Building = sequelize.import('../models/building')
const constants = require('../helpers/constant');

class User extends Sequelize.Model {
  toJSON() {
    const obj = Object.assign({}, this.dataValues);
    delete obj.password;
    return obj
  }
  auth(input) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(input, this.password).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    })
  }
}

module.exports = (sequelize, DataTypes) => {
  User.init( {
    first: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [0,255]
      }
    },
    last: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [0,255]
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [0,255]
      }
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    gender: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Male", "Female", "Non-binary"]
    },
    role: {
      type: Sequelize.ENUM,
      values: ["Admin", "Moderator", "User"]
    },
    building_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Building',
        key: 'id',
      }
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0,255]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6,999]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, constants.security.saltRounds);
      },
      beforeUpdate: async (user, options) => {
        if (user.password) {
          console.log(user.password);
          user.password = await bcrypt.hash(user.password, constants.security.saltRounds);
          console.log(user.password);
        }
      },
    }
  });
  User.belongsTo(Building, {
    foreignKey: 'building_id',
    as: 'building'
  });
  return User;
};
