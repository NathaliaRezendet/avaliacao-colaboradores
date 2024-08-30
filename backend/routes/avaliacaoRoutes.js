const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

// Rota para receber a avaliação
router.post('/', avaliacaoController.saveAvaliacao);

module.exports = router;
