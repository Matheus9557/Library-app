const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();
const loansAPIController = require('../controllers/loanController');
const middleware = require('../middleware');

router.get('/', loansAPIController.getAllLoans);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  loansAPIController.getLoanById
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      loanDate: Joi.date().required(),
      returnDate: Joi.date().required(),
      userId: Joi.number().integer().required(),
      bookId: Joi.number().integer().required(),
    }),
  }),
  loansAPIController.createLoan
);

router.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      loanDate: Joi.date().required(),
      returnDate: Joi.date().required(),
      userId: Joi.number().integer().required(),
      bookId: Joi.number().integer().required(),
    }),
  }),
  loansAPIController.updateLoan
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  loansAPIController.deleteLoan
);

module.exports = router;
