import Sequelize, { Model } from "sequelize";

class Membro extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        idade: Sequelize.STRING,
        data_nascimento: Sequelize.STRING,
        escolaridade: Sequelize.STRING,
        profissao: Sequelize.STRING,
        telefone: Sequelize.STRING,
        parentesco: Sequelize.STRING,
        sexo: Sequelize.STRING,
        religiao: Sequelize.STRING,
        estado_civil: Sequelize.STRING,
        renda: Sequelize.DECIMAL(10, 2),
        is_responsavel: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "membros",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Familia, {
      foreignKey: "familia_id",
      as: "familias",
    });
  }
}

export default Membro;
