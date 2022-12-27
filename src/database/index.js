import Sequelize from "sequelize";
import mongoose from "mongoose";
import configDatabase from "../config/database";
import User from "../app/models/User"; //estamos chamndo ele, pois ele que iremos conectar
import Product from "../app/models/Product";
import Category from "../app/models/Category";

//iremos criar uma class com o nome DataBase

const models = [User, Product, Category]; //estamos cirando uma arrei, pos futuramente, iremos ter varios models, que poderemos colocar dentro dela...
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase); //aqui ele pede a configuração inicial do banco
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associante && model.associante(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger2',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
