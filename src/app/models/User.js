import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import crypto from "crypto";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        reset_token: Sequelize.STRING,
        reset_token_expiration: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // verifica a senha do usuario
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static async generateResetToken() {
    const token = crypto.randomBytes(20).toString("hex");
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return { token, expiration };
  }
}

export default User;
