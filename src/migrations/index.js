const { conn } = require('../db');

async function up() {
  const db = await conn();

  await db.run(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        registration TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        hasPenalty INTEGER DEFAULT 0
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS Books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        isbn TEXT NOT NULL UNIQUE,
        image TEXT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER NOT NULL
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS Loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        loanDate TEXT NOT NULL,
        returnDate TEXT NOT NULL,
        userId INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES Users (id),
        FOREIGN KEY (bookId) REFERENCES Books (id)
    )
  `);
}

async function down() {
  const db = await conn();

  await db.run('DROP TABLE Users');

  await db.run('DROP TABLE Books');

  await db.run('DROP TABLE Loans');
}

module.exports = { up, down };
