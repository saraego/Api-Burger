'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      price:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      category:{
        type:Sequelize.STRING,
        allowNull:false
      },
      path:{
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at:{//esses campos serão preenchidos automaticamente toda vez que eu criar um usuario.. ele ira coloca a data desses novos usuarios
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products')
  }
};
