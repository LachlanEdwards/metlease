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
const Reviews = require('../services/review');
const entity = require('../helpers/entity');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const errors = require('../errors/errors');
const reset = require('../security/reset');
let upload = multer();

/* GET home page. */
router.post('/create', async (req, res, next) => {
  try {
    let user = await Users.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/update/me', session, async (req, res, next) => {
  try {
    let user = await Users.update(req.body, req.session.user.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/get/:id', session, async (req, res, next) => {
  try {
    let user = await Users.get.id(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/me', session, async (req, res, next) => {
  try {
    let user = await Users.get.id(req.session.user.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/upload/me', session, upload.array('images', 12), async (req, res, next) => {
  try {
    let response = []
    let promises = req.files.map(file => new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(async (err, res) => {
        if (err) {
          reject(err)
        } else {
          let body = {
            public_id: res.public_id,
            url: res.secure_url,
            entity: entity.User,
            entity_id: req.session.user.id
          }
          await Media.create(body);
          response.push(res);
          resolve();
        }
      }).end(file.buffer);
    }));
    Promise.all(promises).then(() => {
      res.status(200);
      res.json(response);
    }).catch((err) => {
      res.status(400);
      res.json(err);
    });
  } catch (err) {
    console.log(err)
    res.status(400);
    res.json(err);
  }
});

router.get('/media/me', session, async (req, res, next) => {
  try {
    let media = await Media.entity.user.get(req.session.user.id, req.query.page);
    res.json(media);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/buildings/me', session, async (req, res, next) => {
  try {
    let buildings = await Buildings.admin(req.session.user.id);
    res.json(buildings);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/reviews/me', session, async (req, res, next) => {
  try {
    let reviews = await Reviews.get.user(req.session.user.id, req.query.page);
    res.json(reviews);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/reset/email', async (req, res, next) => {
  try {
    reset.request(req.body.email).then(() => {
      res.status(200);
      res.json();
    }).catch((err) => {
      res.status(400);
      res.json(err);
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/reset/validate', async (req, res, next) => {
  try {
    reset.confirm(req.body.user_id, req.body.token, req.body.password).then(() => {
      res.status(200);
      res.json();
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
