// controllers/RelatorioController.js
const RelatorioModel = require('../models/RelatorioModel');

exports.getRelatorioGeral = (req, res) => {
  RelatorioModel.getRelatorioGeral((err, resultados) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter o relatório geral.' });
    }
    res.json(resultados);
  });
};
