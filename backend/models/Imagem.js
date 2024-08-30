const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Resposta = require('./Resposta');

const Imagem = sequelize.define('Imagem', {
  caminho: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resposta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Resposta,
      key: 'id'
    }
  }
});

Imagem.belongsTo(Resposta, { foreignKey: 'resposta_id' });

module.exports = Imagem;
