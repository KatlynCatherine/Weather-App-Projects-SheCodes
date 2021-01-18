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
  let apiKey = "903072b38d3dbb124641c65ff0557cce";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);


//Display weather

function displayWeather(response) {
  let temperatureShow = document.querySelector("#number");

  celsiusTemperature = response.data.main.temp;

  temperatureShow.innerHTML = Math.round(celsiusTemperature);

  
  let cityShow = document.querySelector("#searchedCity");

  cityShow.innerHTML = response.data.name;

  let descriptionShow = document.querySelector("#description");

  descriptionShow.innerHTML = response.data.weather[0].description;

  let sunriseShow = document.querySelector("#sunrise")

  sunriseShow.innerHTML = sunriseCalculation(response.data.sys.sunrise);

  let humidityShow = document.querySelector("#humidity");

  humidityShow.innerHTML = response.data.main.humidity;

  let windShown = document.querySelector("#wind");

  windShow.innerHTML = Math.round(response.data.wind.speed);

  let iconShow = document.querySelector("#icon");
  
  iconShow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconShow.setAttribute("alt", response.data.weather[0].description);

  let sunsetShow = querySelector("#sunrise");

  sunsetShow.innerHTML = sunsetCalculation(response.data.sys.sunset);
}

//Display sunrise

function sunriseCalculation(response) {
  let a = new Date(response * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = hour + ':' + min;
  return time;
}

//Display sunset

function sunsetCalculation(response) {
  let a = new Date(response * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = hour + ':' + min;
  return time;
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


