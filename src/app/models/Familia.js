import Sequelize, { Model } from "sequelize";

class Familia extends Model {
  static init(sequelize) {
    super.init(
      {
        resp_familiar: Sequelize.STRING,
        sexo: Sequelize.STRING,
        beneficio: Sequelize.STRING,
        moradia: Sequelize.STRING,
        tipo_casa: Sequelize.STRING,
        num_comodos: Sequelize.INTEGER,
        num_moradores: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
        lider: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "familias",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Membro, { foreignKey: "familia_id", as: "membros" });
    this.belongsTo(models.Endereco, {
      foreignKey: "endereco_id",
      as: "enderecos",
    });
    this.belongsTo(models.Saneamento, {
      foreignKey: "saneamento_id",
      as: "saneamento",
    });
  }
}

export default Familia;
