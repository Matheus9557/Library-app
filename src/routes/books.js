const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const parser = require('../config/parser');
const middleware = require('../middleware');
const booksController = require('../controllers/booksController');

router.get('/index', booksController.index);

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
      ISBN: Joi.string().required(),
      title: Joi.string().required(),
      author: Joi.string().required(),
      year: Joi.number().integer().required(),
      loan_id: Joi.number().integer().required(),
    }),
  }),
  booksController.create
);

router.post(
  '/update',
  middleware.isAuthenticated,
  parser.single('image'),
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        ISBN: Joi.string().required(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        year: Joi.number().integer().required(),
        loan_id: Joi.number().integer().required(),
      }),
    },
    {
      allowUnknown: true,
    }
  ),
  booksController.update
);

router.post(
  '/delete',
  middleware.isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }),
  booksController.destroy
);

module.exports = router;
