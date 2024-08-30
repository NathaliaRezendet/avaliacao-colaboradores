const mysql = require('mysql2');
const db = require('../config/db');

exports.getPerguntasPorServico = (req, res) => {
  const servico_id = req.params.id;
  const query = 'SELECT * FROM Perguntas WHERE servico_id = ?';
  
  db.query(query, [servico_id], (err, results) => {
    if (err) {
      console.error('Erro ao obter perguntas:', err);
      return res.status(500).json({ message: 'Erro ao obter perguntas.' });
    }
    res.status(200).json(results);
  });
};
