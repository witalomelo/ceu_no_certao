import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";
import Membro from "../app/models/Membro";
import Familia from "../app/models/Familia";
import Endereco from "../app/models/Endereco";
import Saneamento from "../app/models/Saneamento";

const models = [User, Membro, Familia, Endereco, Saneamento];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));

    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
