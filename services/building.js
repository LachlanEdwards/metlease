const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Building = sequelize.import('../models/building');

const controller = {
  create: async (building) => {
    return new Promise((resolve, reject) => {
      let model = Building.build(building);
      model.save().then(() => {
        resolve(model.toJSON());
      }).catch((err) => {
        reject(err);
      });
    })
  },
  update: async (building, id) => {
    return new Promise((resolve, reject) => {
      Building.update(building, {
        where: {
          id: id
        }
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  get: async (id) => {
    return new Promise((resolve, reject) => {
      let response = Building.findOne({
        where: {
          id: id
        }
      });
      response.then(() => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    })
  },
  admin: async (admin_id) => {
    return new Promise((resolve, reject) => {
      let response = Building.findAll({
        where: {
          admin_id: admin_id
        }
      });
      response.then(() => {
        resolve(response.toJSON());
      }).catch((err) => {
        reject(err);
      });
    })
  }
}

module.exports = controller;
