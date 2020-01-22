const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Building = sequelize.import('../models/building');
const constant = require('../helpers/constant');

module.exports = {
  query: async (query, page) => {
    if (!page || isNaN(page)) page = 0;
    let limit = constant.limit.default;
    let offset = constant.limit.default * page;
    return new Promise((resolve, reject) => {
      if (!query) reject('The query parameter is required.');
      Building.findAndCountAll({
        where: {
          [Sequelize.Op.or]: {
            name: {
              [Sequelize.Op.like]: '%' + query + '%'
            },
            suburb: {
              [Sequelize.Op.like]: '%' + query + '%'
            },
            management: {
              [Sequelize.Op.like]: '%' + query + '%'
            },
            developer: {
              [Sequelize.Op.like]: '%' + query + '%'
            },
          }
        },
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
    })
  },
}
