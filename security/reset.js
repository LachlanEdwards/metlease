const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Reset = sequelize.import('../models/reset');
const Users = require('../services/user');
const uuid = require('uuid-random');

module.exports = {
  request: async (email) => {
    return new Promise(async (resolve, reject) => {
      let token = uuid();
      let date = new Date();
      let user = await Users.get.email(email);
      console.log(user);
      date.setDate(date.getDate() + 1);
      let model = Reset.build({
        token: token,
        user_id: user.id,
        expiry: date
      });
      model.save().then(() => {
        resolve(model.toJSON());
      }).catch((err) => {
        reject(err);
      });
    });
  },
  confirm: async (user_id, token, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        Reset.findOne({
          where: {
            user_id: user_id,
            token: token
          }
        }).then(async (res) => {
          if (res) {
            await Users.update({
              password: password
            }, user_id);
            Reset.destroy({
              where: {
                user_id: user_id
              }
            });
            resolve();
          } else {
            reject();
          }
        });
      } catch(err) {
        reject(err);
      }
    });
  }
}
