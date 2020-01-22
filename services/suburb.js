const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Subrub = sequelize.import('../models/suburb');
const constant = require('../helpers/constant');

module.exports = {
  query: async (query, page) => {
    if (!page || isNaN(page)) page = 0;
    let limit = constant.limit.default;
    let offset = constant.limit.default * page;
    return new Promise((resolve, reject) => {
      if (!query) reject('The query parameter is required.');
      Subrub.findAndCountAll({
        where: {
          [Sequelize.Op.or]: {
            suburb: {
              [Sequelize.Op.like]: '%' + query + '%'
            },
            postcode: {
              [Sequelize.Op.like]: '%' + query + '%'
            }
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
