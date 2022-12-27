import * as yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "../models/User";

class ProductController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(), //ira verifica se é do tipo stringo e esta dizendo que é obrigatorio...
      price: yup.number().required(),
      category_id: yup.number().required(),
      offer: yup.boolean(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(req.userId);

      if (!isAdmin) {
        return res.status(401).json();
      }

      const { filename: path } = req.file;

      const { name, price, category_id, offer } = req.body;

      const products = await Product.create({
        name,
        price,
        category_id,
        path,
        offer,
      });

      res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ err: error.errors });
    }
  }

  async index(req, res) {
    const product = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
    console.log(req.userId);
    res.status(200).json(product);
  }

  async update(req, res) {

    const schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      category_id: yup.number(),
      offer: yup.boolean(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(req.userId);

      if (!isAdmin) {
        return res.status(401).json();
      }

      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(401).json({error:"Make sure your products ID is correct"});
      }

      let path
      if (req.file) {
        path = req.file.filename;
      }


      const { name, price, category_id, offer } = req.body;

      await Product.update(
        {
          name,
          price,
          category_id,
          path,
          offer,
        },
        { where: {id}}
      );

      return res.status(200).json();

    } catch (error) {
      return res.status(400).json({ err: error.errors });
    }
  }
}

export default new ProductController();
