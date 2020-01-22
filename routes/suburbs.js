var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Suburb = require('../services/suburb');

router.get('/', async (req, res, next) => {
  try {
    Suburb.query(req.query.q, req.query.page).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.status(400);
      res.json(err);
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

module.exports = router;
