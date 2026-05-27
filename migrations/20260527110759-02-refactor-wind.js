"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Створюємо нову таблицю для вітру
    await queryInterface.createTable("wind_data", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      weather_id: {
        type: Sequelize.INTEGER,
        references: { model: "weathers", key: "id" },
        onDelete: "CASCADE",
      },
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

    // 2. Витягуємо старі дані в пам'ять Node.js (це вирішує проблему типів ENUM)
    const records = await queryInterface.sequelize.query(
      "SELECT id, wind_degree, wind_kph, wind_direction FROM weathers",
      { type: Sequelize.QueryTypes.SELECT },
    );

    // 3. Вставляємо їх через Sequelize, який сам безпечно приведе типи
    if (records.length > 0) {
      const mappedData = records.map((r) => ({
        weather_id: r.id,
        wind_degree: r.wind_degree,
        wind_kph: r.wind_kph,
        wind_direction: r.wind_direction,
      }));
      await queryInterface.bulkInsert("wind_data", mappedData);
    }

    // 4. Видаляємо старі колонки з основної таблиці
    await queryInterface.removeColumn("weathers", "wind_degree");
    await queryInterface.removeColumn("weathers", "wind_kph");
    await queryInterface.removeColumn("weathers", "wind_direction");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("wind_data");
  },
};
