"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("wind_data", "should_go_outside", {
      type: Sequelize.BOOLEAN,
    });

    // Заповнюємо її для існуючих записів: якщо вітер <= 36 км/год, то виходити безпечно (true)
    await queryInterface.sequelize.query(`
      UPDATE wind_data 
      SET should_go_outside = CASE WHEN wind_kph <= 36 THEN true ELSE false END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("wind_data", "should_go_outside");
  },
};
