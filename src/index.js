//Date and time

let now = new Date();

let h2 = document.querySelector("#time");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[now.getDay()];

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


h2.innerHTML = `${day} ${formatHours(now)}`;

console.log(`${day} ${formatHours(now)}`);

// Show search city

function searchCity(event) {

  let search = document.querySelector("#searchCity");
  submitCity(search.value);
}

function submitCity(city) {
  let apiKey = "903072b38d3dbb124641c65ff0557cce";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecastHour);
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

  let windShow = document.querySelector("#wind");

  windShow.innerHTML = Math.round(response.data.wind.speed);

  let iconShow = document.querySelector("#icon");
  
  iconShow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconShow.setAttribute("alt", response.data.weather[0].description);

  let sunsetShow = document.querySelector("#sunset");

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

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(forecastHour);
}



function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", getCurrentLocation);

//Celsius & Fahrenheit

function farenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function celsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", farenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);


//Placeholder

searchCity("brno");

//Forecast hours

function forecastHour(response) {
  let hourElement = document.querySelector("#forecastHour");
  hourElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    hourElement.innerHTML += `
    <div class="under">
      <div class="circle_small">
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
      </div>
      <span class="number"> ${formatHours(forecast.dt * 1000)} </span>
                
      <div class="weather-forecast-temperature">
        <strong>${Math.round(forecast.main.temp_max)} °</strong> | ${Math.round(forecast.main.temp_min)}° 
          </div></div>`;

      }

  
 
  }


