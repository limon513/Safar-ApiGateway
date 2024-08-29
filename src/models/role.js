'use strict';
const {
  Model
} = require('sequelize');
const { Enums } = require('../utils/common');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User,{
        foreignKey:'role',
        sourceKey:'role',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  Role.init({
    role: {
      type:DataTypes.ENUM(Enums.ACC_TYPE.ADMIN,Enums.ACC_TYPE.AGENCY),
      defaultValue:Enums.ACC_TYPE.AGENCY,
      allowNull:false,
      unique:true,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};