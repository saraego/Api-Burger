import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init({
        name:Sequelize.STRING,
        price:Sequelize.INTEGER,
        // category:Sequelize.STRING, // iremos excluir esse campo, pois nao existe mais na migration
        path:Sequelize.STRING,
        offer:Sequelize.BOOLEAN,
        url:{
          type:Sequelize.VIRTUAL,
          get(){
           return `http://localhost:3001/file-product/${this.path}`
          }
        }
    },
      {
        sequelize,
      }
    )
    return this // <<<< obrigatorio passa, para todos..
  }

  static associante(models){
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as : 'category'
    })
  }
}

export default Product;
