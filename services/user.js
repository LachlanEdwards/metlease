const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const User = sequelize.import('../models/user');
const Building = sequelize.import('../models/building');

const controller = {
  create: async (user) => {
    return new Promise((resolve, reject) => {
      let model = User.build(user);
      model.save().then(() => {
        resolve(model);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  update: async (body, id) => {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({
        where: {
          id: id
        }
      });
      user.update(body).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  get: {
    id: async (id) => {
      return new Promise((resolve, reject) => {
        let response = User.findOne({
          where: {
            id: id
          },
          include: [
            {
              model: Building,
              as: 'building'
            }
          ]
        });
        response.then(() => {
          resolve(response);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      })
    },
    email: async (email) => {
      return new Promise((resolve, reject) => {
        let response = User.findOne({
          where: {
            email: email
          }
        });
        response.then(() => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      })
    }
  },
  exists: async (un) => {
    return new Promise((resolve, reject) => {
      let response = User.findOne({
        where: {
          username: un
        }
      });
      response.then(() => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    })
  }
}

module.exports = controller;
