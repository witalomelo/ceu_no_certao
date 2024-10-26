"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("familias", "saneamento_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "saneamento_basico",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("familias", "saneamento_id");
  },
};
