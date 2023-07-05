const bcrypt = require('bcrypt');
const { conn } = require('../db');
const dotenv = require('dotenv').config();

const create = async (data) => {
  const sql = `
    INSERT INTO
      users (id, registration, category, name, phone, email, password, hasPenalty)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const db = await conn();

  const { id, registration, category, name, phone, email, password, hasPenalty } = data;
  const salt = parseInt(process.env.SALT, 10);
  const hash = await bcrypt.hash(password, salt);

  const { lastID } = await db.run(sql, [id, registration, category, name, phone, email, hash, hasPenalty]);

  return lastID;
};

const createAutoInc = async (data) => {
  const sql = `
    INSERT INTO
      users (registration, category, name, phone, email, password, hasPenalty)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  const db = await conn();

  const { registration, category, name, phone, email, password, hasPenalty } = data;

  const { lastID } = await db.run(sql, [registration, category, name, phone, email, password, hasPenalty]);

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
