const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Servico = sequelize.define('Servico', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Servico;
