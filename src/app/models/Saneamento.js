import Sequelize, { Model } from "sequelize";

class Saneamento extends Model {
  static init(sequelize) {
    super.init(
      {
        tratamento_agua: Sequelize.STRING,
        abastecimento_agua: Sequelize.STRING,
        sistema_esgoto: Sequelize.STRING,
        observacao: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "saneamento_basico",
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Familia, {
      foreignKey: "saneamento_id",
      as: "saneamento",
    });
  }
}

export default Saneamento;
