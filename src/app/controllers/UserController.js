import * as yup from "yup";
import { v4 } from "uuid";
import User from "../models/User";

//os metados dentro do controller devem ter esse nomes store, para cria ou adiconar,
//index para lista
//show para lista apenas um
//update para atuliazar e
//delete para deletar

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(), //ira verifica se é do tipo stringo e esta dizendo que é obrigatorio...
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
      admin: yup.string(),
    });

    // if(!await schema.isValid(req.body)){
    //     return res.status(400).json({msg:"Make sure your data is correct "})
    // }
    try {
      await schema.validateSync(req.body, {abortEarly:false});

      
    } catch (error) {
      console.log(error);
      return res.status(400).json({error:error.errors})
    }
    const { name, email, password, admin } = req.body;

    const emailExist = await User.findOne({
      where: {email}
    })

    if(emailExist){
      return res.status(400).json("Email ja existe")
    }


    try {
        const newUser = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
          });
      
          res.status(201).json({ id: newUser.id, name, email });
    } catch (err) {
        console.log(err.errors[0].message);
        return res.status(400).json({error:err.errors[0].message})
    }
  }
}

export default new UserController();

//resposabilidade desse controler é somente criar novo usuario... proxim passo, criar o login