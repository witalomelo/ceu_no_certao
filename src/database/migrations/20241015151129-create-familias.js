"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("familias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "enderecos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      resp_familiar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      beneficio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      moradia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_casa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      num_comodos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      num_moradores: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      lider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable("familias");
  },
};
