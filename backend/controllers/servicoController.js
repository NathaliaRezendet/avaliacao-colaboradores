const mysql = require('mysql2');
const db = require('../config/db');

exports.getAllServicos = (req, res) => {
  const query = 'SELECT * FROM Servicos';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
