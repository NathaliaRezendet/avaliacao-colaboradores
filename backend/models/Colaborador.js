const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Colaborador = sequelize.define('Colaborador', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Colaborador;
