/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do livro.
 *           example: O Senhor dos Anéis
 *         author:
 *           type: string
 *           description: Autor do livro.
 *           example: J.R.R. Tolkien
 *         isbn:
 *           type: string
 *           description: ISBN do livro.
 *           example: 9780345339706
 *     NewBook:
 *       allOf:
 *         - $ref: '#/components/schemas/Book'
 *         - type: object
 *           properties:
 *             category_id:
 *               type: integer
 *               description: ID da categoria do livro.
 *               example: 1
 *     GetBook:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID do livro.
 *               example: 1
 *             category:
 *               type: string
 *               description: Nome da categoria do livro.
 *               example: Fantasia
 *         - $ref: '#/components/schemas/Book'
 *     BookId:
 *       type: object
 *       properties:
 *         bookId:
 *           type: integer
 *           description: ID do livro criado.
 *           example: 1
 */

 const express = require('express');
 const router = express.Router();
 
 const { celebrate, Joi, Segments } = require('celebrate');
 
 const parser = require('../config/parser');
 const middleware = require('../middleware');
 const booksAPIController = require('../controllers/booksAPIController');
 
 /**
  * @swagger
  * /api/v1/books:
  *   get:
  *     summary: Recupera a lista de livros.
  *     description: Recupera a lista de livros da biblioteca. Pode ser usada sem autenticação.
  *     tags:
  *       - books
  *     responses:
  *       200:
  *         description: Uma lista de livros.
  *         content:
  *           application/json:
  *             schema:
  *               properties:
  *                 books:
  *                   type: array
  *                   items:
  *                     $ref: '#/components/schemas/GetBook'
  */
 router.get('/', booksAPIController.readAll);
 
 /**
  * @swagger
  * /api/v1/books/{id}:
  *   get:
  *     summary: Recupera um único livro.
  *     description: Recupera um único livro da biblioteca pelo ID. Pode ser usado sem autenticação.
  *     tags:
  *       - books
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID numérico do livro a ser recuperado.
  *         schema:
  *           type: integer
  *     responses:
  *       200:
  *         description: Um único livro.
  *         content:
  *           application/json:
  *             schema:
  *               properties:
  *                 book:
  *                   $ref: '#/components/schemas/GetBook'
  */
 router.get(
   '/:id',
   celebrate({
     [Segments.PARAMS]: {
       id: Joi.number().integer().required(),
     },
   }),
   booksAPIController.readById
 );
 
 /**
  * @swagger
  * /api/v1/books:
  *   post:
  *     summary: Cria um novo livro.
  *     tags:
  *       - books
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/NewBook'
  *     responses:
  *       201:
  *         description: Livro criado.
  *         content:
  *           application/json:
  *             schema:
  *                $ref: '#/components/schemas/BookId'
  */
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
 
 /**
  * @swagger
  * /api/v1/books/{id}:
  *   patch:
  *     summary: Atualiza um livro.
  *     description: Modifica os valores de um livro já cadastrado na biblioteca, recuperado pelo ID.
  *     tags:
  *       - books
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: false
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/NewBook'
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID numérico do livro a ser atualizado.
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Livro atualizado.
  */
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
 
 /**
  * @swagger
  * /api/v1/books/{id}:
  *   delete:
  *     summary: Apaga um livro.
  *     tags:
  *       - books
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID numérico do livro a ser recuperado.
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Livro apagado.
  */
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
 