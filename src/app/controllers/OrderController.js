import * as yup from "yup";
import Category from "../models/Category";
import Product from "../models/Product";
import Orde from "../schemas/Orde";
import User from "../models/User";

class OrderController {
  async store(req, res) {
    const schema = yup.object().shape({
      products: yup
        .array()
        .required()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            quantity: yup.number().required(),
          })
        ),
    });


    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.errors });
    }

    const productsId = req.body.products.map((product) => product.id);

    const updatedProducts = await Product.findAll({
        where:{
            id: productsId,
        },
        include:[
            {
                model:Category,
                as : 'category',
                attributes: ['name']
            }
        ]
    })

    const editedProduct = updatedProducts.map(product => {
        
        const productIndex = req.body.products.findIndex(reqProduct => reqProduct.id  === product.id)

        const newProduct = {
            id:product.id,
            name:product.name,
            price:product.price,
            category:product.category.name,
            url:product.url,
            quantity: req.body.products[productIndex].quantity,
        }

        return newProduct
    })

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: editedProduct,
      status: 'Pedido realizado'
    };

    const orderRes = await Orde.create(order)
    return res.status(201).json(orderRes);
  }

  async index(req,res){
    const orderes = await Orde.find()

    return res.json(orderes)
  }

  async update(req,res){

    const schema = yup.object().shape({
      status: yup.string().required()
    });


    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.errors });
    }

    const { admin :isAdmin }= await User.findByPk(req.userId)

          if(!isAdmin){
            return res.status(401).json()
          }

    const { id } = req.params
    const { status } = req.body

    try {
      await Orde.updateOne({_id:id}, { status})
    } catch (error) {
      return res.status(400).json({error : error.message})
    }
   

    res.json({message:"Status atualizado com suecesso"})
  }
}

export default new OrderController();
