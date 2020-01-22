const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Review = sequelize.import('../models/review');
const User = sequelize.import('../models/user');
const constant = require('../helpers/constant');

module.exports = {
  create: async (review) => {
    return new Promise((resolve, reject) => {
      let model = Review.build(review);
      model.save().then(() => {
        resolve(model.toJSON());
      }).catch((err) => {
        reject(err);
      });
    })
  },
  update: async (apartment, id) => {
    return new Promise((resolve, reject) => {
      Review.update(apartment, {
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
  get: {
    id: async (id) => {
      return new Promise((resolve, reject) => {
        let response = Review.findOne({
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
    building: async (building_id, page, sort) => {
      if (!sort || isNaN(sort)) sort = Sequelize.literal('');
      if (!page || isNaN(page)) page = 0;
      let limit = constant.limit.default;
      let offset = constant.limit.default * page;
      return new Promise((resolve, reject) => {
        Review.findAndCountAll({
          where: {
            building_id: building_id,
            rating: sort
          },
          include: [
            {
              model: User,
              as: 'user'
            }
          ],
          limit: limit,
          offset: offset
        }).then((response) => {
          response.limit = limit;
          response.offset = offset;
          response.return = response.rows.length;
          resolve(response);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    },
    user: async (user_id, page, filter) => {
      if (!sort || isNaN(sort)) filter = Sequelize.literal('');
      if (!page || isNaN(page)) page = 0;
      let limit = constant.limit.default;
      let offset = constant.limit.default * page;
      return new Promise((resolve, reject) => {
        Review.findAndCountAll({
          where: {
            user_id: user_id,
            rating: filter
          },
          limit: limit,
          offset: offset
        }).then((response) => {
          response.limit = limit;
          response.offset = offset;
          response.return = response.rows.length;
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    exists: async (building_id, user_id) => {
      return new Promise((resolve, reject) => {
        let response = Review.findOne({
          where: {
            building_id: building_id,
            user_id: user_id
          }
        });
        response.then(() => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      })
    },
  },
}
