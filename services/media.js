const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Media = sequelize.import('../models/media');
const entity = require('../helpers/entity');
const constant = require('../helpers/constant');

const controller = {
  create: async (media) => {
    return new Promise((resolve, reject) => {
      let model = Media.build(media);
      model.save().then(() => {
        resolve(model.toJSON());
      }).catch((err) => {
        reject(err);
      });
    })
  },
  entity: {
    building: {
      get: async(id, page) => {
        if (!page || isNaN(page)) page = 0;
        let limit = constant.limit.default;
        let offset = constant.limit.default * page;
        return new Promise((resolve, reject) => {
          Media.findAndCountAll({
            where: {
              entity_id: id,
              entity: entity.Building
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
        })
      }
    },
    user: {
      get: async(id, page) => {
        if (!page || isNaN(page)) page = 0;
        let limit = constant.limit.default;
        let offset = constant.limit.default * page;
        return new Promise((resolve, reject) => {
          Media.findAndCountAll({
            where: {
              entity_id: id,
              entity: entity.User
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
      }
    },
    apartment: {
      get: async(id, page) => {
        if (!page || isNaN(page)) page = 0;
        let limit = constant.limit.default;
        let offset = constant.limit.default * page;
        return new Promise((resolve, reject) => {
          Media.findAndCountAll({
            where: {
              entity_id: id,
              entity: entity.Apartment
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
      }
    },
    review: {
      get: async(id, page) => {
        if (!page || isNaN(page)) page = 0;
        let limit = constant.limit.default;
        let offset = constant.limit.default * page;
        return new Promise((resolve, reject) => {
          Media.findAndCountAll({
            where: {
              entity_id: id,
              entity: entity.Review
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
      }
    }
  },
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      Media.destroy( {
        where: {
          $or: [
            {
              id: id
            },
            {
              public_id: id
            }
          ]
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
      let response = Media.findOne({
        where: {
          $or: [
            {
              id: id
            },
            {
              public_id: id
            }
          ]
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
