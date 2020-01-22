var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Users = require('../services/user');
const User = sequelize.import('../models/user');
const session = require('../security/session');

router.post('/signin', async (req, res, next) => {
  try {
    let un = req.body.username;
    let pw = req.body.password;

    Users.exists(un).then((response) => {
      if (response) response.auth(pw).then((match) => {
        if (!match) {
          res.status(401);
          res.json();
        } else {
          req.session.user = response.dataValues;
          res.json(response);
        }
      }).catch((err) => {
        res.status(400);
        res.json(err);
      });
    });
  } catch (err) {
    res.status(401);
    res.json();
  }
});

router.post('/signout', async (req, res, next) => {
  res.status(200);
  res.clearCookie('session_id');
  res.json();
});
module.exports = router;
