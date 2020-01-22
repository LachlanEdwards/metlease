var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Users = require('../services/user');
const Apartments = require('../services/apartment');
const Apartment = sequelize.import('../models/apartment');
const Media = require('../services/media');
const session = require('../security/session');
const permission = require('../security/permission');
const errors = require('../errors/errors');
const entity = require('../helpers/entity');
const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer();


/* GET home page. */
router.post('/create', async (req, res, next) => {
  try {
    permission.create.apartment(req.session.user.id, req.body.building_id).then(async () => {
      let apartment = await Apartments.create(req.body);
      res.json(apartment);
    }).catch(() => {
      res.status(403);
      res.json(errors.Forbidden);
    })
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/update/:id', session, async (req, res, next) => {
  try {
    permission.update.apartment(req.params.id, req.session.user.id).then(async () => {
      let apartment = await Apartments.update(req.body, req.params.id);
      res.json(apartment);
    }).catch(() => {
      res.status(403);
      res.json(errors.Forbidden);
    })
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/upload/:id', session, upload.array('images', 12), async (req, res, next) => {
  try {
    permission.update.apartment(req.params.id, req.session.user.id).then(async () => {
      for (let i in req.files) {
        await cloudinary.uploader.upload_stream( async (err, res) => {
          if (err) throw err;
          let body = {
            public_id: res.public_id,
            url: res.secure_url,
            entity: entity.Apartment,
            entity_id: req.params.id
          }
          await Media.create(body);
        }).end(req.files[i].buffer);
      }
      res.status(202);
      res.json(errors.Accepted);
    }).catch((err) => {
      console.log(err);
      res.status(err.status_code || 400);
      res.json(err);
    })
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/media/:id', session, async (req, res, next) => {
  try {
    let media = await Media.entity.apartment.get(req.params.id, req.query.page);
    res.json(media);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/get/:id', session, async (req, res, next) => {
  try {
    let building = await Apartments.get(req.params.id);
    res.json(building);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});



module.exports = router;
