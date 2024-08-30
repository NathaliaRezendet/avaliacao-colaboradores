const express = require('express');
const router = express.Router();
const RelatorioColaboradorController = require('../controllers/relatorioColaboradorController');

// Rota para relatorio-colaborador
router.get('/relatorio-colaborador', RelatorioColaboradorController.getRelatorioGeral);

module.exports = router;
