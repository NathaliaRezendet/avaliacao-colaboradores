// models/relatorioModel.js
const db = require('../config/db'); // ou o caminho correto para o arquivo de configuração do banco de dados

const getRelatorioGeral = (callback) => {
  const query = `
    SELECT c.nome AS colaborador, s.nome AS servico, p.resposta
    FROM avaliacao a
    JOIN colaborador c ON a.colaborador_id = c.id
    JOIN servico s ON a.servico_id = s.id
    JOIN pergunta p ON a.pergunta_id = p.id
    WHERE p.tipo = 'Nota'
  `;
  db.query(query, callback);
};

module.exports = { getRelatorioGeral };
