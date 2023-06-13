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
  const bookId = await Book.createAutoInc(req.body);

  res.status(201).json({ bookId });
};

const update = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readByIdWithLoanId(id);
  let updatedBook = {};

  if (book) {
    for (let prop in book) {
      updatedBook =
        req.body[prop] && book[prop] !== req.body[prop]
          ? { ...updatedBook, [prop]: req.body[prop] }
          : { ...updatedBook, [prop]: book[prop] };
    }

    await Book.update(id, updatedBook);

    return res.status(204).send();
  }

  res.status(404).json({ error: 'Book not found.' });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const book = await Book.readById(id);

  if (book) {
    await Book.destroy(id);

    return res.status(204).send();
  }

  res.status(404).json({ error: 'Book not found.' });
};

module.exports = {
  readAll,
  readById,
  create,
  update,
  destroy,
};
