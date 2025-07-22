const apiKey = "5760fd2b56df38275f29a81302c3deb8";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const weatherContainer = document.querySelector(".weather-container");

// NEW FIELDS
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeatherByCity(city);
  }
});

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(updateUI)
    .catch(() => alert("City not found. Try again."));
}

function updateUI(data) {
  const main = data.weather[0].main;
  const desc = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const humid = data.main.humidity;
  const press = data.main.pressure;
  const windSpeed = data.wind.speed;

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weather.textContent = main;
  temperature.textContent = `${temp}°C`;
  description.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

  humidity.textContent = `Humidity: ${humid}%`;
  pressure.textContent = `Pressure: ${press} hPa`;
  wind.textContent = `Wind Speed: ${windSpeed} m/s`;

  // Always use your fixed weather icon
  weatherIcon.src = "https://media.istockphoto.com/id/482132449/vector/sun-and-cloud-weather-icon.jpg?s=1024x1024&w=is&k=20&c=HypTKTaQpyaSjqAUW01Z3u-4_pYrZpYoBOm59ps0Nto=";

  // Set background image based on weather condition
  if (main === "Clear" || main === "Sunny") {
    weatherContainer.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/05/30/19/55/desert-790640_1280.jpg')";
  } else if (main === "Rain" || main === "Drizzle" || main === "Thunderstorm") {
    weatherContainer.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2020/06/14/16/52/rainy-day-5298578_1280.jpg')";
  } else if (main === "Snow") {
    weatherContainer.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2022/12/25/09/52/winter-forest-7677111_1280.jpg')";
  } else {
    // Default background
    weatherContainer.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/05/30/19/55/desert-790640_1280.jpg')";
  }
}
