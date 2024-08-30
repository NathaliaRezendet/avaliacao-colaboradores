const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Servico = require('./Servico');

const Pergunta = sequelize.define('Pergunta', {
  texto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  servico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Servico,
      key: 'id'
    }
  }
});

module.exports = Pergunta;
