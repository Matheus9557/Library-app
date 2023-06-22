const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const usersAPIController = require('../controllers/userAPIController');

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuário cadastrado.
 */
router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  usersAPIController.store
);

/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     summary: Autentica um usuário cadastrado.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário autenticado.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Token'
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: Token JWT criado.
 */
router.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  usersAPIController.authenticate
);

module.exports = router;
