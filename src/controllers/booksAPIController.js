const Book = require('../models/Books');
const Loan = require('../models/Loans');

const readAll = async (req, res) => {
  const books = await Book.readAll();

  res.json({ books });
};

const readById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);

  if (book) {
    return res.json({ book });
  }

  res.status(404).json({ error: 'Book not found.' });
};

const create = async (req, res) => {
  const { title, author, isbn, category_id } = req.body;

  const newBook = { title, author, isbn, category_id };

  const bookId = await Book.createAutoInc(newBook);

  res.status(201).json({ bookId });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, category_id } = req.body;

  const book = await Book.readById(id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  const updatedBook = {
    title: title || book.title,
    author: author || book.author,
    isbn: isbn || book.isbn,
    category_id: category_id || book.category_id,
  };

  await Book.update(id, updatedBook);

  res.sendStatus(204);
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  await Book.destroy(id);

  res.sendStatus(204);
};

module.exports = {
  readAll,
  readById,
  create,
  update,
  destroy,
};
