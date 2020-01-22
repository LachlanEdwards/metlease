const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Users = require('../services/user');
const Buildings = require('../services/building');
const Building = sequelize.import('../models/building');
const Apartment = sequelize.import('../models/apartment');
const error = require('../errors/errors');
const entity = require('../helpers/entity');
const Media = require('../services/media');
const Reviews = require('../services/review');

module.exports = {
  create: {
    apartment: (user_id, building_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let building = await Buildings.get(building_id);
          if (building.admin_id === user_id) {
            resolve();
          } else {
            reject(error.Forbidden);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    review: (user_id, building_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let review = await Reviews.get.exists(building_id, user_id);
          if (review) {
            reject(error.Forbidden);
          } else {
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  },
  update: {
    building: (building_id, admin_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let building = await Buildings.get(building_id);
          if (building.admin_id === admin_id) {
            resolve();
          } else {
            reject(error.Forbidden);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    review: (review_id, user_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let review = await Reviews.get(review_id);
          if (review.user_id === user_id) {
            resolve();
          } else {
            reject(error.Forbidden);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    user: (user_id, id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let user = await Users.get(id);
          if (user.id === user_id) {
            resolve();
          } else {
            reject(error.Forbidden);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    apartment: (user_id, id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let apartment = await Apartment.get(id);
          let building = await Building.get(apartment.building_id);
          if (building.admin_id === user_id) {
            resolve();
          } else {
            reject(error.Forbidden);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
  },
  delete: {
    media: (user_id, media_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let media = await Media.get(media_id);
          switch (media.entity) {
            case entity.Building:
              let building = await Building.get(media.entity_id);
              if (building.admin_id === user_id) {
                resolve();
              } else {
                reject(error.Forbidden);
              }
            case entity.User:
              let user = await Users.get(media.entity_id);
              if (user.id === user_id) {
                resolve();
              } else {
                reject(error.Forbidden);
              }
            default:
              reject('The media model does not support the provided value of entity.');
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  }
}
