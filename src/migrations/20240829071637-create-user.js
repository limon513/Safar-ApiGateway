'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Enums} = require('../utils/common');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isAlpha:true,
        }
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isEmail:true,
        }
      },
      userPhone: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          len:11
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          len:[8,100]
        }
      },
      role: {
        type: Sequelize.ENUM(Enums.ACC_TYPE.ADMIN,Enums.ACC_TYPE.AGENCY),
        defaultValue:Enums.ACC_TYPE.AGENCY,
        allowNull:false,
        references:{
          model:'Roles',
          key:'role',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};