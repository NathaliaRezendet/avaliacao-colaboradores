const mysql = require('mysql2');
const db = require('../config/db');

exports.getAllRelatorioColaboradores = (req, res) => {
  const query = 'SELECT * FROM Colaboradores';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};