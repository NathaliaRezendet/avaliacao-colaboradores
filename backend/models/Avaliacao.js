// C:\Users\playf\OneDrive\Desktop\sistemaAvalitativo\backend\models\avaliacao.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme sua estrutura

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
  tableName: 'avaliacao', // Nome da tabela no banco de dados
});

module.exports = Avaliacao;
