// routes/loginRelatorioInicioRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config(); 

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

// Endpoint de login
router.post('/', (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
  }

  const query = 'SELECT id, senha FROM Usuariosrelatorio WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Comparação simples de senha (sem criptografia)
      if (senha === user.senha) {
        res.status(200).json({ message: 'Login bem-sucedido!', userId: user.id });
      } else {
        res.status(401).json({ message: 'Senha incorreta.' });
      }
    } else {
      res.status(401).json({ message: 'Usuário não encontrado.' });
    }
  });
});

module.exports = router;
