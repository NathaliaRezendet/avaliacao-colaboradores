const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do diretório de uploads
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, `${filename}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Servir arquivos estáticos da pasta de uploads
app.use('/uploads', express.static(uploadDir));

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Rotas
const loginRoutes = require('./routes/loginRoutes');
const loginRelatorioInicioRoutes = require('./routes/loginRelatorioInicioRoutes');
const colaboradorRoutes = require('./routes/colaboradorRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const perguntaRoutes = require('./routes/perguntaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const relatorioGeralRoutes = require('./routes/relatorioGeralRoutes');
const relatorioColaboradoresRoutes = require('./routes/relatorioColaboradorRoutes');
const desempenhoColaboradorRoutes = require('./routes/desempenhoColaborador');

app.use('/api/login', loginRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/perguntas', perguntaRoutes);
app.use('/api/avaliacao', upload.single('imagem'), avaliacaoRoutes);
app.use('/api/relatorio-geral', relatorioGeralRoutes);
app.use('/api/loginrelatorio', loginRelatorioInicioRoutes);
app.use('/api/relatorio-colaboradores', relatorioColaboradoresRoutes);
app.use('/api/desempenho-colaborador', desempenhoColaboradorRoutes); // Nova rota

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
