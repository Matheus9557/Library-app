const express = require('express');
const router = express.Router();

const { errors } = require('celebrate');
const middleware = require('../middleware');
const UserController = require('../controllers/userController');
const UserAPIController = require('../controllers/userAPIController');
const BookAPIController = require('../controllers/booksAPIController');
const BookController = require('../controllers/booksController');
const LoanController = require('../controllers/loanController');

// Middleware de erros do Celebrate
router.use(errors());

// Middleware para inicializar variáveis locais
router.use(middleware.initLocals);

// Rotas para autenticação de usuários
router.post('/users/signup', UserAPIController.store);
router.post('/users/signin', UserAPIController.authenticate);
router.get('/users/signup', middleware.isAuthenticated, UserController.create);
router.get('/users/signin', middleware.isAuthenticated, UserController.signin);
router.get('/users/signout', middleware.isAuthenticated, UserController.signout);
router.post('/users/signup', middleware.isAuthenticated, UserController.store);
router.post('/users/signin', middleware.isAuthenticated, UserController.authenticate);

// Rotas para API de livros
router.get('/api/v1/books', middleware.isAPIAuthenticated, BookAPIController.readAll);
router.get('/api/v1/books/:id', middleware.isAPIAuthenticated, BookAPIController.readById);
router.post('/api/v1/books', middleware.isAPIAuthenticated, BookAPIController.create);
router.put('/api/v1/books/:id', middleware.isAPIAuthenticated, BookAPIController.update);
router.delete('/api/v1/books/:id', middleware.isAPIAuthenticated, BookAPIController.destroy);

// Rotas para livros
router.get('/books', middleware.isAuthenticated, BookController.index);
router.get('/books/create', middleware.isAuthenticated, BookController.getCreateForm);
router.post('/books/create', middleware.isAuthenticated, BookController.create);
router.get('/books/:id/update', middleware.isAuthenticated, BookController.getUpdateForm);
router.post('/books/:id/update', middleware.isAuthenticated, BookController.update);
router.get('/books/:id/delete', middleware.isAuthenticated, BookController.getDeleteForm);
router.post('/books/:id/delete', middleware.isAuthenticated, BookController.destroy);

// Rotas para API de empréstimos
router.get('/api/v1/loans', middleware.isAPIAuthenticated, LoanController.getAllLoans);
router.get('/api/v1/loans/:id', middleware.isAPIAuthenticated, LoanController.getLoanById);
router.post('/api/v1/loans', middleware.isAPIAuthenticated, LoanController.createLoan);
router.put('/api/v1/loans/:id', middleware.isAPIAuthenticated, LoanController.updateLoan);
router.delete('/api/v1/loans/:id', middleware.isAPIAuthenticated, LoanController.deleteLoan);

// Rota raiz redireciona para /foods/index
router.get('/', (req, res) => res.redirect('/foods/index'));

module.exports = router;
