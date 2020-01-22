var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Users = require('../services/user');
const Buildings = require('../services/building');
const User = sequelize.import('../models/user');
const session = require('../security/session');
const permission = require('../security/permission');
const Media = require('../services/media');
const entity = require('../helpers/entity');

router.delete('/delete/:id', async (req, res, next) => {
  try {
    permission.delete.media(req.session.user.id, req.params.id).then(async () => {
      let media = await Media.delete(req.params.id);
      res.json(media);
    }).catch((err) => {
      res.status(err.status_code || 400);
      res.json(err);
    })
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

module.exports = router;
