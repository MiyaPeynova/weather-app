function formatDate(date) {
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[date.getMonth()];

  return `${day} ${hours}:${min}, ${month} ${currentDate} ${year}`;
}

let now = new Date();
let today = document.querySelector(".today");
today.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = `feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity is ${response.data.main.humidity}%`;
}

function searchCity(city) {
  let apiKey = "d623c9d10b76ac8fadb3579bc392fa06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-form").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "d623c9d10b76ac8fadb3579bc392fa06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Ubud");
