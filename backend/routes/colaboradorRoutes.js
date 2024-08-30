// routes/colaboradorRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config(); // Carregar variáveis de ambiente

// Configurações de conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para obter colaboradores
router.get('/', (req, res) => {
  const query = 'SELECT id, nome FROM colaboradores';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;