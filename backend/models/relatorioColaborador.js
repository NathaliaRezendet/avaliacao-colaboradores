const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RelatorioColaborador = sequelize.define('RelatorioColaborador', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = RelatorioColaborador;
