const express = require('express');
const router = express.Router();

const { isAuthenticated, isAPIAuthenticated } = require('../middleware');
const UserController = require('../controllers/userController');
const UserAPIController = require('../controllers/userAPIController');
const BookAPIController = require('../controllers/booksAPIController');
const BookController = require('../controllers/booksController');
const LoanController = require('../controllers/loanController');


router.post('/signup', UserAPIController.store);
router.post('/signin', UserAPIController.authenticate);




router.get('/signup',isAuthenticated,UserController.create);
router.get('/signin',isAuthenticated,UserController.signin);
router.get('/signout',isAuthenticated,UserController.signout);
router.post('/signup',isAuthenticated,UserController.store);
router.post('/signin',isAuthenticated,UserController.authenticate);


router.get('/books', isAPIAuthenticated, BookAPIController.readAll);
router.get('/books/:id', isAPIAuthenticated, BookAPIController.readById);
router.post('/books', isAPIAuthenticated, BookAPIController.create);
router.put('/books/:id', isAPIAuthenticated, BookAPIController.update);
router.delete('/books/:id', isAPIAuthenticated, BookAPIController.destroy);


router.get('/books', isAuthenticated, BookController.index);
router.get('/books/create', isAuthenticated, BookController.getCreateForm);
router.post('/books/create', isAuthenticated, BookController.create);
router.get('/books/:id/update', isAuthenticated, BookController.getUpdateForm);
router.post('/books/:id/update', isAuthenticated, BookController.update);
router.get('/books/:id/delete', isAuthenticated, BookController.getDeleteForm);
router.post('/books/:id/delete', isAuthenticated, BookController.destroy);


router.get('/loans', isAPIAuthenticated, LoanController.getAllLoans);
router.get('/loans/:id', isAPIAuthenticated,  LoanController.getLoanById);
router.post('/loans', isAPIAuthenticated,  LoanController.createLoan);
router.put('/loans/:id', isAPIAuthenticated,  LoanController.updateLoan);
router.delete('/loans/:id', isAPIAuthenticated,  LoanController.deleteLoan);


module.exports = router;
