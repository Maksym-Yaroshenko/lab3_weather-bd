const { sequelize, DataTypes } = require("./database");
const Weather = require("./Weather");

const WindData = sequelize.define(
  "wind_data",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    weather_id: {
      type: DataTypes.INTEGER,
      references: { model: Weather, key: "id" },
    },
    wind_degree: { type: DataTypes.INTEGER },
    wind_kph: { type: DataTypes.FLOAT },
    wind_direction: {
      type: DataTypes.ENUM(
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
    should_go_outside: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: false,
    tableName: "wind_data", // Явно вказуємо назву таблиці
  },
);

// Налаштування зв'язків між таблицями (1 до 1)
Weather.hasOne(WindData, { foreignKey: "weather_id" });
WindData.belongsTo(Weather, { foreignKey: "weather_id" });

module.exports = WindData;
