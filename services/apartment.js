const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Apartment = sequelize.import('../models/apartment');
const constant = require('../helpers/constant');

module.exports = {
  create: async (apartment) => {
    return new Promise((resolve, reject) => {
      let model = Apartment.build(apartment);
      model.save().then(() => {
        resolve(model.toJSON());
      }).catch((err) => {
        reject(err);
      });
    })
  },
  update: async (apartment, id) => {
    return new Promise((resolve, reject) => {
      Apartment.update(apartment, {
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
        let response = Apartment.findOne({
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
    building: async (building_id, page, filter) => {
      let where = {
        building_id: building_id,
      }
      if (!page || isNaN(page)) page = 0;
      for (let i in filter) {
        if (filter[i].value) {
          if (filter[i].operator) {
            where[i] = { [filter[i].operator] : filter[i].value }
          } else {
            where[i] = filter[i].value
          }
        }
      }
      let limit = constant.limit.default;
      let offset = constant.limit.default * page;
      return new Promise((resolve, reject) => {
        Apartment.findAndCountAll({
          where: where,
          limit: limit,
          offset: offset
        }).then((response) => {
          response.limit = limit;
          response.offset = offset;
          response.return = response.rows.length;
          resolve(response);
        }).catch((err) => {
          console.log(err)
          reject(err);
        });
      });
    }
  },
}
