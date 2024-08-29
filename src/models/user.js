'use strict';
const {
  Model
} = require('sequelize');
const {Enums, Utility} = require('../utils/common');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role,{
        foreignKey:'role',
        targetKey:'role',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isAlpha:true,
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true,
      }
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:11
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[8,100]
      }
    },
    role: {
      type: DataTypes.ENUM(Enums.ACC_TYPE.ADMIN,Enums.ACC_TYPE.AGENCY),
      defaultValue:Enums.ACC_TYPE.AGENCY,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    const hashedPassword = Utility.hashThePassword(user.password);
    user.password = hashedPassword;
  });

  return User;
};