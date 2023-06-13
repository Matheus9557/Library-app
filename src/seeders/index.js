const Book = require('../models/Books');
const Loan = require('../models/Loans');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

function up() {
  const content = fs.readFileSync(path.join(__dirname, 'data.json'));
  const data = JSON.parse(content);

  for (const loan of data.loans) {
    Loan.create(loan);
  }

  for (const book of data.books) {
    Book.create(book);
  }

  for (const user of data.users) {
    User.create(user);
  }
}

module.exports = { up };
