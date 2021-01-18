//Date and time

let now = new Date();

let h2 = document.querySelector("#time");

let hours = now.getHours();

let minutes = now.getMinutes();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[now.getDay()];

if (hours < 10) {
    hours = `0${hours}`;
  }

if (minutes < 10) {
    minutes = `0${minutes}`;
  }

h2.innerHTML = `${day} ${hours}:${minutes}`;

// Show search city

function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#searchCity");
  submitCity(search.value);
}

function submitCity(city) {
  event.preventDefault();
  let apiKey = "903072b38d3dbb124641c65ff0557cce";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

function displayWeather(response) {
  let cityDisplay = response.data.name;
  let temperatureDisplay = Math.round(response.data.main.temp);
  let citySearch = document.querySelector("h1");
  let temperatureSearch = document.querySelector("#number");
  citySearch.innerHTML = `${cityDisplay}`;
  temperatureSearch.innerHTML = `${temperatureDisplay} °C`;
}

// Show current city

function searchCurrentCity(position) {
  let apiKey = "903072b38d3dbb124641c65ff0557cce";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", getCurrentLocation);
