const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();
const usersController = require('../controllers/userController');

router.get('/create', usersController.create);

router.post(
  '/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.store
);

router.get('/signin', usersController.signin);

router.post(
  '/authenticate',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.authenticate
);

router.get('/signout', usersController.signout);

module.exports = router;
