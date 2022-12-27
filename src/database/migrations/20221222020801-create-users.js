'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users',{
    id:{
      type:Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      allowNull: false, //aqui estou dizendo que esse campo Id nao pode er nulo
      primaryKey: true, //um campo que o valor nao se repete nunca, o numero do id nao pode repeti
    },
    name:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    email:{
      type:Sequelize.STRING,
      unique:true,// aqui estou dizendo que email nao pode ter repetidos, nao vai poder ter 2 usuarios com mesmo email
      allowNull: false,
    },
    password_hash:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    admin:{
      type:Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue:false
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

  async down (queryInterface) {
    await queryInterface.dropTable('users') // ele ira desfazer toda essas tabela users
  }
};
