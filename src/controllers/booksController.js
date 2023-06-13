const fs = require('fs');
const path = require('path');

const Book = require('../models/Books');
const Loan = require('../models/Loans');

const index = async (req, res) => {
  const books = await Book.readAll();

  const loans = await Loan.readAll();

  res.render('books/index.njk', { books, loans });
};

const getCreateForm = async (req, res) => {
  const loans = await Loan.readAll();

  res.locals.mode = 'create';
  res.render('books/form.njk', { loans });
};

const create = async (req, res) => {
  const { ISBN, title, author, year, loan_id } = req.body;

  const newBook = { ISBN, title, author, year, loan_id };

  const bookId = await Book.createAutoInc(newBook);

  res.redirect('/');
};

const getUpdateForm = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);
  const loans = await Loan.readAll();

  res.locals.mode = 'update';
  res.render('books/form.njk', { book, loans });
};

const update = async (req, res) => {
  const { id, ISBN, title, author, year, loan_id } = req.body;

  const updateBook = { ISBN, title, author, year, loan_id };

  const result = await Book.update(id, updateBook);

  res.redirect('/');
};

const getDeleteForm = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);

  res.render('books/delete.njk', { book });
};

const destroy = async (req, res) => {
  const { id } = req.body;

  const deleteId = await Book.destroy(id);

  res.redirect('/');
};

module.exports = {
  index,
  create,
  update,
  destroy,
  getCreateForm,
  getUpdateForm,
  getDeleteForm,
};
