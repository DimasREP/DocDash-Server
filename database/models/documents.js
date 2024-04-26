'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    static associate(models) {
      Documents.belongsTo(models.Folders, { foreignKey: 'folder_id' });
    }
  }
  Documents.init({
    folder_id: DataTypes.INTEGER,
    namefile: DataTypes.STRING,
    file: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};
