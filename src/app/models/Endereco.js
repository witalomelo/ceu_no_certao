import Sequelize, { Model } from "sequelize";

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        numero: Sequelize.STRING,
        rua: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        referencia: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "enderecos",
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Familia, {
      foreignKey: "endereco_id",
      as: "familias"
    });
  }
}

export default Endereco;
