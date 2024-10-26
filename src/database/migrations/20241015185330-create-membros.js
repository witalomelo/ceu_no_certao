"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("membros", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      familia_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "familias", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_responsavel: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      escolaridade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profissao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      religiao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado_civil: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      renda: {
        type: Sequelize.DECIMAL(10, 2),
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
    return queryInterface.dropTable("membros");
  },
};
