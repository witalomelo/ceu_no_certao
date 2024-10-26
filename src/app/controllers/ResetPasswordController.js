import { Op } from "sequelize";
import User from "../models/User";
import * as Yup from "yup";

class ResetPasswordController {
  async store(req, res) {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    const schema = Yup.object().shape({
      newPassword: Yup.string()
        .required("Nova senha é obrigatoria")
        .min(6, "Senha deve ter no minimo 6 caracteres"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Senhas não coincidem")
        .required("Confirmação de senha é obrigatoria"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const user = await User.findOne({
      where: {
        reset_token: token,
        reset_token_expiration: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Token invalido ou expirado" });
    }

    user.password = newPassword;
    user.reset_token = null;
    user.reset_token_expiration = null;

    await user.save();

    return res.json({ message: "Senha alterada com sucesso" });
  }
}

export default new ResetPasswordController();
