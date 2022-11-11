const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      localidad: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      barrio: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      direccion: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      piso: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      departamento: {
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
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  }
};
