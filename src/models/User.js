const bcrypt = require('bcrypt');
const { conn } = require('../db');
const dotenv = require('dotenv').config();

const create = async (data) => {
  const sql = `
    INSERT INTO
      users (id, name, email, password)
    VALUES
      (?, ?, ?, ?)
  `;

  const db = await conn();

  const { id, name, email, password } = data;
  const salt = parseInt(process.env.SALT, 10);
  const hash = await bcrypt.hash(password, salt);

  const { lastID } = await db.run(sql, [id, name, email, hash]);

  return lastID;
};

const createAutoInc = async (data) => {
  const sql = `
    INSERT INTO
      users (name, email, password)
    VALUES
      (?, ?, ?)
  `;

  const db = await conn();

  const { name, email, password } = data;

  const { lastID } = await db.run(sql, [name, email, password]);

  return lastID;
};

const readById = async (id) => {
  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      users.id = ?
  `;

  const db = await conn();

  const user = await db.get(sql, id);

  return user;
};

const readByEmail = async (email) => {
  const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      users.email = ?
  `;

  const db = await conn();

  const user = await db.get(sql, email);

  return user;
};

module.exports = { create, createAutoInc, readById, readByEmail };
