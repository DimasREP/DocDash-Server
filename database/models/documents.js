'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Documents.belongsTo(models.Folders, {foreignKey: 'folder_id'});
    }
  }
  Documents.init({
    folder_id: DataTypes.INTEGER,
    file: DataTypes.STRING,
    namefile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};