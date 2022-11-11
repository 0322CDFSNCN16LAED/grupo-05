const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("services_solicitations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      serviceDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      serviceTime: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      solicitationState: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "services",
          },
          key: "id",
        },
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("services_solicitations");
  }
};