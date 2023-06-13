const { conn } = require('../db');

async function create(data) {
  const sql = 'INSERT INTO loans (loanDate, returnDate, userId, bookId) VALUES (?, ?, ?, ?)';
  const { loanDate, returnDate, userId, bookId } = data;

  const db = await conn();
  const { lastID } = await db.run(sql, [loanDate, returnDate, userId, bookId]);

  return lastID;
}

async function readAll() {
  const sql = 'SELECT * FROM loans';

  const db = await conn();
  const loans = await db.all(sql);

  return loans;
}

async function update(id, data) {
  const sql = 'UPDATE loans SET loanDate = ?, returnDate = ?, userId = ?, bookId = ? WHERE id = ?';
  const { loanDate, returnDate, userId, bookId } = data;

  const db = await conn();
  await db.run(sql, [loanDate, returnDate, userId, bookId, id]);
}

async function remove(id) {
  const sql = 'DELETE FROM loans WHERE id = ?';

  const db = await conn();
  await db.run(sql, [id]);
}

module.exports = { create, readAll, update, remove };
