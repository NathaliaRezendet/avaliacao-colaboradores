const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const colaboradorRoutes = require('./routes/colaboradorRoutes');
const RelatorioColaborador = require('./routes/relatorioColaboradorRoutes')
const servicoRoutes = require('./routes/servicoRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

const app = express();

app.use(bodyParser.json());

// Usando as rotas
app.use('/api', colaboradorRoutes);
app.use('/api', servicoRoutes);
app.use('/api', avaliacaoRoutes);
app.use('/api', RelatorioColaborador)

sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
