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

  res.render('books/form.njk', { mode: 'create', loans });
};

const create = async (req, res) => {
  const { title, author, isbn, category_id } = req.body;

  const newBook = { title, author, isbn, category_id };

  const bookId = await Book.createAutoInc(newBook);

  res.redirect('/books');
};

const getUpdateForm = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);
  const loans = await Loan.readAll();

  if (!book) {
    return res.status(404).render('error.njk', { error: 'Book not found.' });
  }

  res.render('books/form.njk', { mode: 'update', book, loans });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, category_id } = req.body;

  const book = await Book.readById(id);

  if (!book) {
    return res.status(404).render('error.njk', { error: 'Book not found.' });
  }

  const updatedBook = {
    title: title || book.title,
    author: author || book.author,
    isbn: isbn || book.isbn,
    category_id: category_id || book.category_id,
  };

  await Book.update(id, updatedBook);

  res.redirect('/books');
};

const getDeleteForm = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);

  if (!book) {
    return res.status(404).render('error.njk', { error: 'Book not found.' });
  }

  res.render('books/delete.njk', { book });
};

const destroy = async (req, res) => {
  const { id } = req.body;

  const book = await Book.readById(id);

  if (!book) {
    return res.status(404).render('error.njk', { error: 'Book not found.' });
  }

  await Book.destroy(id);

  res.redirect('/books');
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
