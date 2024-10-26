import User from "../models/User";
import * as Yup from "yup";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "falha na validacao" });
    }

    if (userExists) {
      return res.status(406).json({ error: "Usuario ja cadastrado" });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "falha na validacao" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: "Usuario ja existe" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "senha incorreta" });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: "Usuario nao encontrado" });
      }

      await user.destroy();

      return res.json({ message: "Usuario deletado com sucesso" });
    } catch (error) {
      //console.log(error);
      return res.status(500).json({ error: "erro interno" });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      const userData = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));

      return res.json(userData);
    } catch (error) {
      return res.status(500).json({ error: "erro interno" });
    }
  }
}

export default new UserController();
