const Weather = require("../models/Weather");
const WindData = require("../models/WindData");

class WeatherRepository {
  // Збереження нового запису
  async saveRecord(weatherData, windData) {
    // Спочатку зберігаємо основну інформацію про погоду
    const weather = await Weather.create(weatherData);

    // Передаємо створений ID в таблицю вітру і зберігаємо
    windData.weather_id = weather.id;
    await WindData.create(windData);
  }

  // Пошук за країною та датою
  async findByCountryAndDate(country, date) {
    return await Weather.findAll({
      where: { country: country, last_updated: date },
      include: [WindData], // Автоматично "підтягує" дані з таблиці вітру
    });
  }
}
module.exports = new WeatherRepository();
