'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Folders.belongsTo(models.Users, { foreignKey: 'user_id' });
      Folders.hasMany(models.Documents, { foreignKey: 'folder_id' });
    }
  }
  Folders.init({
    user_id: DataTypes.INTEGER,
    FolderName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Folders',
  });
  return Folders;
};