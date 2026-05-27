const fs = require("fs");
const csv = require("csv-parser");
const WeatherRepository = require("../repository/WeatherRepository");

class WeatherService {
  // Перетворюємо час формату "06:30 AM" у формат БД "06:30:00"
  parseTime(timeStr) {
    if (!timeStr) return "00:00:00";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = (parseInt(hours, 10) + 12).toString();
    return `${hours.padStart(2, "0")}:${minutes}:00`;
  }

  // Читання CSV та збереження в БД
  async importData() {
    console.log("Починаємо читати файл weather.csv...");
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream("./data/weather.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          // Беремо перші 500 записів для демонстрації
          const limit = Math.min(results.length, 500);
          console.log(`Прочитано. Імпортуємо ${limit} рядків у базу...`);

          for (let i = 0; i < limit; i++) {
            const row = results[i];
            const wind_kph = parseFloat(row.wind_kph);

            const weatherObj = {
              country: row.country,
              location_name: row.location_name,
              last_updated: row.last_updated.split(" ")[0],
              sunrise: this.parseTime(row.sunrise),
            };
            const windObj = {
              wind_degree: parseInt(row.wind_degree),
              wind_kph: wind_kph,
              wind_direction: row.wind_dir,
              should_go_outside: wind_kph <= 36, // Наша формула
            };
            await WeatherRepository.saveRecord(weatherObj, windObj);
          }
          console.log("Імпорт успішно завершено!");
          resolve();
        });
    });
  }

  // Пошук погоди
  async getWeather(country, date) {
    return await WeatherRepository.findByCountryAndDate(country, date);
  }
}
module.exports = new WeatherService();
