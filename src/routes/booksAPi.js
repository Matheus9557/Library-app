 const express = require('express');
 const router = express.Router();
 
 const { celebrate, Joi, Segments } = require('celebrate');
 
 const parser = require('../config/parser');
 const middleware = require('../middleware');
 const booksAPIController = require('../controllers/booksAPIController');
 
 

 router.get('/', booksAPIController.readAll);
 

 router.get(
   '/:id',
   celebrate({
     [Segments.PARAMS]: {
       id: Joi.number().integer().required(),
     },
   }),
   booksAPIController.readById
 );
 
 
 router.post(
   '/',
   middleware.isAPIAuthenticated,
   celebrate({
     [Segments.BODY]: Joi.object().keys({
       title: Joi.string().required(),
       author: Joi.string(),
       isbn: Joi.string().required(),
       category_id: Joi.number().integer().required(),
     }),
   }),
   booksAPIController.create
 );
 
 
 router.patch(
   '/:id',
   middleware.isAPIAuthenticated,
   celebrate({
     [Segments.PARAMS]: {
       id: Joi.number().integer().required(),
     },
     [Segments.BODY]: Joi.object().keys({
       title: Joi.string(),
       author: Joi.string(),
       isbn: Joi.string(),
       category_id: Joi.number().integer(),
     }),
   }),
   booksAPIController.update
 );
 
 router.delete(
   '/:id',
   middleware.isAPIAuthenticated,
   celebrate({
     [Segments.PARAMS]: {
       id: Joi.number().integer().required(),
     },
   }),
   booksAPIController.destroy
 );
 
 module.exports = router;
 