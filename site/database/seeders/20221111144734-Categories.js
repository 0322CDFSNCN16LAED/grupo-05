
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("categories", [
          {
            id: 1,
            name: "Albañileria",
            categoryPhoto: "albañil.jpg"
          },
          {
            id: 2,
            name: "Seguridad",
            categoryPhoto: "cam-seguridad.jpg"
          },
          {
            id: 3,
            name: "Carpinteria",
            categoryPhoto: "carpintero.jpg"
          },
          {
            id: 4,
            name: "Electricidad",
            categoryPhoto: "electricista.jpg"
          },
          {
            id: 5,
            name: "Gas",
            categoryPhoto: "gasista.jpg"
          },
          {
            id: 6,
            name: "Jardineria",
            categoryPhoto: "jardineria.jpg"
          },
          {
            id: 7,
            name: "Niñera",
            categoryPhoto: "niñera.jpg"
          },
          {
            id: 8,
            name: "Pintura",
            categoryPhoto: "pintor.jpg"
          },
          {
            id: 9,
            name: "Plomeria",
            categoryPhoto: "plomero.jpg"
          },
          {
            id: 10,
            name: "Climatizacion",
            categoryPhoto: "tec-aire.png"
          },
          {
            id: 11,
            name: "PC",
            categoryPhoto: "tec-pc.jpg"
          },
          {
            id: 12,
            name: "Mudanza",
            categoryPhoto: "mudanza.jpg"
          },
          
      ]);
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("categories", null, {});
  },
};