const { sequelize, DataTypes } = require("./database");

const Weather = sequelize.define(
  "weather",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    country: { type: DataTypes.STRING },
    location_name: { type: DataTypes.STRING },
    last_updated: { type: DataTypes.DATEONLY },
    sunrise: { type: DataTypes.TIME },
    // Колонки вітру ВИДАЛЕНО, бо ми їх перенесли в іншу таблицю міграціями!
  },
  {
    timestamps: false,
    tableName: "weathers", // Явно кажемо ORM шукати таблицю у множині
  },
);

module.exports = Weather;
