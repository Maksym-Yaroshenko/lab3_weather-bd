"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("weathers", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      country: { type: Sequelize.STRING },
      location_name: { type: Sequelize.STRING },
      last_updated: { type: Sequelize.DATEONLY },
      sunrise: { type: Sequelize.TIME },
      wind_degree: { type: Sequelize.INTEGER },
      wind_kph: { type: Sequelize.FLOAT },
      wind_direction: {
        type: Sequelize.ENUM(
          "N",
          "NNE",
          "NE",
          "ENE",
          "E",
          "ESE",
          "SE",
          "SSE",
          "S",
          "SSW",
          "SW",
          "WSW",
          "W",
          "WNW",
          "NW",
          "NNW",
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("weathers");
  },
};
