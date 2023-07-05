const { conn } = require('../db');

async function create(data) {
  const sql = `
    INSERT INTO
      books (id, isbn, image, title, author, year)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const db = await conn();

  const { id, isbn, image, title, author, year } = data;

  const { lastID } = await db.run(sql, [id, isbn, image, title, author, year]);

  return lastID;
}

async function createAutoInc(data) {
  const sql = `
    INSERT INTO
      books (isbn, image, title, author, year)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const db = await conn();

  const { isbn, image, title, author, year } = data;

  const { lastID } = await db.run(sql, [isbn, image, title, author, year]);

  return lastID;
}

async function readAll() {
  const sql = `
    SELECT
      books.id, books.isbn, books.image, books.title, books.author, books.year
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
      books.id, books.isbn, books.image, books.title, books.author, books.year
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
      isbn = ?, image = ?, title = ?, author = ?, year = ?
    WHERE
      id = ?
  `;

  const db = await conn();

  const { isbn, image, title, author, year } = data;

  const { changes } = await db.run(sql, [isbn, image, title, author, year, id]);

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
