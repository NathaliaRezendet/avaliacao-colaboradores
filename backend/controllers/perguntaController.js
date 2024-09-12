const mysql = require('mysql2');
const db = require('../config/db');
const Pergunta = require('../models/Pergunta');

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

exports.getPerguntas = async (req, res) => {
  try {
    const perguntas = await Pergunta.findAll();
    res.json(perguntas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
};