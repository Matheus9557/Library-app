const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const parser = require('../config/parser');
const middleware = require('../middleware');
const booksController = require('../controllers/booksController');

router.get('/', middleware.isAuthenticated, booksController.index);

router.get('/create', middleware.isAuthenticated, booksController.getCreateForm);

router.get(
  '/delete/:id',
  middleware.isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  booksController.getDeleteForm
);

router.get(
  '/update/:id',
  middleware.isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  booksController.getUpdateForm
);

router.post(
  '/create',
  middleware.isAuthenticated,
  parser.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.string().required(),
      isbn: Joi.string().required(),
      category_id: Joi.number().integer().required(),
    }),
  }),
  booksController.create
);

router.post(
  '/update/:id',
  middleware.isAuthenticated,
  parser.single('image'),
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().integer().required(),
      },
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        isbn: Joi.string().required(),
        category_id: Joi.number().integer().required(),
      }),
    },
    { allowUnknown: true }
  ),
  booksController.update
);

router.post(
  '/delete/:id',
  middleware.isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  booksController.destroy
);

module.exports = router;
