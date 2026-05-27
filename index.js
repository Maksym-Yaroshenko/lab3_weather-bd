const readline = require("readline");
const WeatherService = require("./service/WeatherService");
const { sequelize } = require("./models/database");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log("=== База Даних успішно підключена! ===");

    const askQuestion = () => {
      rl.question(
        "\nВведіть [1] для імпорту CSV, [2] для пошуку, або [3] для виходу: ",
        async (answer) => {
          if (answer === "1") {
            await WeatherService.importData();
            askQuestion();
          } else if (answer === "2") {
            rl.question("Введіть країну (напр. Afghanistan): ", (country) => {
              rl.question(
                "Введіть дату (YYYY-MM-DD, напр. 2023-08-29): ",
                async (date) => {
                  const data = await WeatherService.getWeather(country, date);
                  if (data.length === 0) {
                    console.log("Даних за цим запитом не знайдено.");
                  } else {
                    console.log(JSON.stringify(data, null, 2));
                  }
                  askQuestion();
                },
              );
            });
          } else if (answer === "3") {
            console.log("Завершення роботи.");
            rl.close();
            process.exit(0);
          } else {
            console.log("Невідома команда.");
            askQuestion();
          }
        },
      );
    };

    askQuestion();
  } catch (error) {
    console.error("Помилка підключення до БД:", error);
  }
}

main();
