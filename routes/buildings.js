var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../orm/sequelize');
const Users = require('../services/user');
const Buildings = require('../services/building');
const Building = sequelize.import('../models/building');
const Media = require('../services/media');
const Reviews = require('../services/review');
const Apartments = require('../services/apartment');
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
    let building = await Buildings.create(req.body);
    res.json(building);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/update/:id', session, async (req, res, next) => {
  try {
    permission.update.building(req.params.id, req.session.user.id).then(async () => {
      let building = await Buildings.update(req.body, req.params.id);
      res.json(building);
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
    permission.update.building(req.params.id, req.session.user.id).then(async () => {
      for (let i in req.files) {
        await cloudinary.uploader.upload_stream( async (err, res) => {
          if (err) throw err;
          let body = {
            public_id: res.public_id,
            url: res.secure_url,
            entity: entity.Building,
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
    let media = await Media.entity.building.get(req.params.id, req.query.page);
    res.json(media);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/get/:id', session, async (req, res, next) => {
  try {
    let building = await Buildings.get(req.params.id);
    res.json(building);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/apartments/:id', session, async (req, res, next) => {
  try {
    let filter = {
      bedroom: {
        operator: Sequelize.Op.gte,
        value: req.query.bedroom
      },
      bathroom: {
        operator: Sequelize.Op.gte,
        value: req.query.bathroom
      },
      garage: {
        operator: Sequelize.Op.gte,
        value: req.query.garage
      },
      state: {
        value: req.query.state
      },
      price: {
        operator: Sequelize.Op.lte,
        value: req.query.price
      }
    }
    let apartments = await Apartments.get.building(req.params.id, req.query.page, filter);
    res.json(apartments);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
});

router.get('/reviews/:id', session, async (req, res, next) => {
  try {
    let reviews = await Reviews.get.building(req.params.id, req.query.page, req.query.filter);
    res.json(reviews);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

module.exports = router;
