const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("servicesphotos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      photo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("servicesphotos");
  }
};

