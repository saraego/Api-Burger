import * as yup from "yup";
import Category from "../models/Category";
import User from "../models/User";


class CategoiresController{
    async store(req,res){
        const schema = yup.object().shape({
            name: yup.string().required() //ira verifica se é do tipo stringo e esta dizendo que é obrigatorio...
          });

          try {
            await schema.validateSync(req.body, { abortEarly: false });
          } catch (error) {
            return res.status(400).json({ err: error.errors });
          }
          const { admin :isAdmin }= await User.findByPk(req.userId)

          if(!isAdmin){
            return res.status(401).json()
          }

          const {name} = req.body

          const {filename : path} = req.file

          const categoryExist = await Category.findOne({
            where:{name}
          })

          if(categoryExist){
             return res.status(400).json({ err: "Category alread exist"});
          }

          const category = await Category.create({name, path})

          return res.status(201).json(category )
    }

    async index(req,res){
        const category = await Category.findAll()
        return res.status(200).json(category)
    }

    async update(req,res){
      const schema = yup.object().shape({
        name: yup.string()
      });

      try {
        await schema.validateSync(req.body, { abortEarly: false });
      } catch (error) {
        return res.status(400).json({ err: error.errors });
      }

      const { admin :isAdmin }= await User.findByPk(req.userId)
      if(!isAdmin){
        return res.status(401).json()
      }

      const {name} = req.body
      const {id} = req.params

      const category = await Category.findByPk(id)
      if(!category){
        return res.status(400).json("Category not exists")
      }

      let path
      if(req.file){
        path = req.file.filename
      }

      await Category.update({name, path}, {where : {id}})

      return res.status(200).json()
    }
}

export default new CategoiresController()