const express = require('express');
const router = express.Router(); // Certifique-se de que o router está definido aqui
const db = require('../config/db'); // Supondo que você tenha um arquivo de configuração para o db

// Endpoint para obter perguntas
router.get('/:servicoId', (req, res) => {
  const { servicoId } = req.params;
  const query = 'SELECT * FROM Perguntas WHERE servico_id = ?';

  db.query(query, [servicoId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar perguntas:', err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
