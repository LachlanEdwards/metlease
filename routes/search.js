var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Search = require('../services/search');

router.get('/', async (req, res, next) => {
  try {
    Search.query(req.query.q, req.query.page).then((response) => {
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
