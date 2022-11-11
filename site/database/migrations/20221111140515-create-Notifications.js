const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      solicitationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "services_solicitations",
          },
          key: "id",
        },
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("notifications");
  }
};
