const Loan = require('../models/Loans');
const User = require('../models/User');

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.getAll();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLoanById = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.getById(id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createLoan = async (req, res) => {
  const { loanDate, returnDate, userId, bookId } = req.body;

  try {
    const user = await User.getById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else if (user.hasPenalty) {
      res.status(403).json({ error: 'User has a pending penalty' });
    } else {
      await Loan.create({ loanDate, returnDate, userId, bookId });
      res.status(201).json({ message: 'Loan created successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { loanDate, returnDate, userId, bookId } = req.body;

  try {
    const user = await User.getById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else if (user.hasPenalty) {
      res.status(403).json({ error: 'User has a pending penalty' });
    } else {
      await Loan.update(id, { loanDate, returnDate, userId, bookId });
      res.json({ message: 'Loan updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    await Loan.delete(id);
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
};
