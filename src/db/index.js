const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.resolve(__dirname, 'database.sqlite');

function conn() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFile, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

module.exports = { conn, dbFile };
