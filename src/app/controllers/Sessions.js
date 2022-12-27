import * as yup from "yup";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import User from "../models/User";

//os metados dentro do controller devem ter esse nomes store, para cria ou adiconar,
//index para lista
//show para lista apenas um
//update para atuliazar e
//delete para deletar

class Sessions {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: "os dados nao conferem" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ erro: "os dados nao conferem" });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ erro: "os dados nao conferem" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign({id: user.id, name:user.name}, authConfig.secret , {expiresIn: authConfig.expiresIn}),
    });
  }
}

export default new Sessions();
