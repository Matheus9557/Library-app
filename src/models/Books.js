const { conn } = require('../db');

async function create(data) {
  const sql = `
    INSERT INTO
      books (id, title, author, year, isbn)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const db = await conn();

  const { id, title, author, year, isbn } = data;

  const { lastID } = await db.run(sql, [id, title, author, year, isbn]);

  return lastID;
}

async function createAutoInc(data) {
  const sql = `
    INSERT INTO
      books (title, author, year, isbn)
    VALUES
      (?, ?, ?, ?)
  `;

  const db = await conn();

  const { title, author, year, isbn } = data;

  const { lastID } = await db.run(sql, [title, author, year, isbn]);

  return lastID;
}

async function readAll() {
  const sql = `
    SELECT
      books.id, books.title, books.author, books.year, books.isbn
    FROM
      books
  `;

  const db = await conn();

  const books = await db.all(sql);

  return books;
}

async function readById(id) {
  const sql = `
    SELECT
      books.id, books.title, books.author, books.year, books.isbn
    FROM
      books
    WHERE
      books.id = ?
  `;

  const db = await conn();

  const book = await db.get(sql, id);

  return book;
}

async function update(id, data) {
  const sql = `
    UPDATE
      books
    SET
      title = ?, author = ?, year = ?, isbn = ?
    WHERE
      id = ?
  `;

  const db = await conn();

  const { title, author, year, isbn } = data;

  const { changes } = await db.run(sql, [title, author, year, isbn, id]);

  return changes;
}

async function destroy(id) {
  const sql = `
    DELETE FROM
      books
    WHERE
      id = ?
  `;

  const db = await conn();

  const { lastID } = await db.run(sql, [id]);

  return lastID;
}

module.exports = {
  create,
  createAutoInc,
  readAll,
  readById,
  update,
  destroy,
};
