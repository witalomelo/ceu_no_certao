import User from "../models/User";
import Mail from "../services/Mail";

class ForgotPasswordController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }

    const { token, expiration } = await User.generateResetToken();

    user.reset_token = token;
    user.reset_token_expiration = expiration;

    await user.save();

    try {
      await Mail.sendMail({
        to: user.email,
        subject: "Redefinição de senha",
        text: `Você solicitou uma redefinição de senha. Clique no link para redefinir: http://sertao.com/reset-password/${token}`,
      });
      return res.json({ message: "Email enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      return res
        .status(500)
        .json({ error: "Erro ao enviar o e-mail de redefinição de senha" });
    }
  }
}

export default new ForgotPasswordController();
