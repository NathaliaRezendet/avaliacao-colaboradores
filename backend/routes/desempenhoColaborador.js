const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para obter o desempenho de um colaborador específico
router.get('/:id', (req, res) => {
  const colaboradorId = req.params.id;

  // Query para buscar as respostas do colaborador específico
  const query = `
    SELECT r.resposta, r.data_resposta, r.observacoes, r.caminho_imagem
    FROM respostas r
    WHERE r.colaborador_id = ?
  `;

  db.query(query, [colaboradorId], (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados de desempenho' });
    }
    
    console.log('Resultados da query:', results);
    res.json(results);
  });
});

module.exports = router;
