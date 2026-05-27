// models/Weather.js
const { sequelize, DataTypes } = require("./database");

const Weather = sequelize.define(
  "weather",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    country: { type: DataTypes.STRING },
    location_name: { type: DataTypes.STRING },
    last_updated: { type: DataTypes.DATEONLY },
    sunrise: { type: DataTypes.TIME },
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
  },
  { timestamps: false },
);

module.exports = Weather;
