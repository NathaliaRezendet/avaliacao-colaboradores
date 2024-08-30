const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Crie a conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get('/', (req, res) => {
  // Execute a consulta SQL
  db.query(`
    SELECT r.pergunta_id, r.resposta, r.avaliacao_id, c.nome AS colaborador, s.nome AS servico
    FROM respostas r
    JOIN avaliacao a ON r.avaliacao_id = a.id
    JOIN colaboradores c ON a.colaborador_id = c.id
    JOIN servicos s ON a.servico_id = s.id
  `, (error, rows) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      return res.status(500).json({ message: 'Erro ao obter dados do relatório' });
    }

    // Processa os dados para calcular os insights
    const insights = processarDadosRelatorio(rows);
    res.json(insights);
  });
});

function processarDadosRelatorio(rows) {
  // Processa os dados para calcular os insights
  const colaboradorNotas = {};
  const servicoNotas = {};

  rows.forEach(row => {
    // Calcula a nota média por colaborador
    if (!colaboradorNotas[row.colaborador]) {
      colaboradorNotas[row.colaborador] = [];
    }
    colaboradorNotas[row.colaborador].push(Number(row.resposta));

    // Calcula a nota média por serviço
    if (!servicoNotas[row.servico]) {
      servicoNotas[row.servico] = [];
    }
    servicoNotas[row.servico].push(Number(row.resposta));
  });

  const calcularMedia = (notas) => notas.reduce((a, b) => a + b, 0) / notas.length;

  const topPioresColaboradores = Object.entries(colaboradorNotas)
    .map(([colaborador, notas]) => ({ colaborador, media: calcularMedia(notas) }))
    .sort((a, b) => a.media - b.media)
    .slice(0, 3);

  const topMelhoresColaboradores = Object.entries(colaboradorNotas)
    .map(([colaborador, notas]) => ({ colaborador, media: calcularMedia(notas) }))
    .sort((a, b) => b.media - a.media)
    .slice(0, 3);

  const melhoresAvaliacoesPorServico = Object.entries(servicoNotas)
    .map(([servico, notas]) => ({ servico, media: calcularMedia(notas) }))
    .sort((a, b) => b.media - a.media)
    .slice(0, 3);

  return { topPioresColaboradores, topMelhoresColaboradores, melhoresAvaliacoesPorServico };
}

module.exports = router;
