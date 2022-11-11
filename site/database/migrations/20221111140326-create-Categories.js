const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      categoryPhoto: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  }
};
