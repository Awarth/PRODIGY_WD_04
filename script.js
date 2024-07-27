document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("location-input");
  const weatherForm = document.getElementById("weather-form");
  const weatherDataContainer = document.getElementById("weather-data");
  const enterCityText = document.getElementById("enter-city-text");
  const apiKey = "QBZU52GMAKV72HQEZSZAXJBT2";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();

  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();

  console.log(`${monthName} ${day}`);

  weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location =
      locationInput.value.charAt(0).toUpperCase() +
      locationInput.value.slice(1);
    fetchWeatherData(location);
    locationInput.value = "";
  });

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
      const weatherData = response.data;
      console.log(weatherData);
      enterCityText.style.display = "none";
      displayWeatherData(weatherData);
    } catch (error) {
      alert("Enter correct city name");
      console.error("Error fetching weather data:", error);
    }
  };

  const displayWeatherData = (data) => {
    const weatherIcon = getWeatherIcon(data.currentConditions.icon);
    weatherDataContainer.innerHTML = `
<div class="card">
<div class='flex'>
<span class='city-name'>${data.address}</span>
<span class='date'>${monthName} ${day}</span>
  </div>
    <img class="icon" src=${weatherIcon} alt='icon'/>
    <span class='condition'>${data.currentConditions.conditions}</span>
    <div class='flex'>
<span class="temp">Temp<br/>${Math.round(data.currentConditions.temp)}°C</span>
    <span>Feels like <br/> ${Math.round(
      data.currentConditions.feelslike
    )}°C</span>
  </div>
</div>`;
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "clear-day":
        return "./image/clear-day.png";
      case "clear-night":
        return "./image/clear-night.png";
      case "cloudy":
        return "./image/cloudy.png";
      case "fog":
        return "./image/cloudy.png";
      case "hail":
        return "./image/hail.png";
      case "partly-cloudy-day":
        return "./image/partly-cloudy-day.png";
      case "partly-cloudy-night":
        return "./image/partly-cloudy-night.png";
      case "rain":
        return "./image/rain.png";
      case "rain-snow":
        return "./image/rain-snow.png";
      case "rain-snow-showers-day":
        return "./image/rain-snow-showers-day.png";
      case "rain-snow-showers-night":
        return "./image/rain-snow-showers-night.png";
      case "showers-day":
        return "./image/showers-day.png";
      case "showers-night":
        return "./image/showers-night.png";
      case "sleet":
        return "./image/sleet.png";
      case "snow":
        return "./image/snow.png";
      case "snow-showers-day":
        return "./image/snow-showers-day.png";
      case "snow-showers-night":
        return "./image/snow-showers-night.png";
      case "thunder":
        return "./image/thunder.png";
      case "thunder-rain":
        return "./image/thunder-rain.png";
      case "thunder-showers-day":
        return "./image/thunder-showers-day.png";
      case "thunder-showers-night":
        return "./image/thunder-showers-night.png";
      case "wind":
        return "./image/wind.png";
      default:
        return "./image/weather.png";
    }
  };
});
