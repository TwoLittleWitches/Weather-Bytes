// GET DATE & TIME

function getDayTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  let min = now.getMinutes();
  let clock = "";
  if (hour > 12) {
    hour = hour - 12;
    clock = "pm";
  } else {
    clock = "am";
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let daytime = document.querySelector(".today-daytime");
  daytime.innerHTML = `${day} | ${month} ${date} | ${hour}:${min} ${clock}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
// SWITCH TEMPERATURE UNITS

function switchToF() {
  // let ftemp = Math.round((gTodayTempNow * 9) / 5 + 32);
  // todayTempNowCode.innerHTML = ftemp;
  searchCityF();
  let af = document.querySelector("a.today-f-now");
  let ac = document.querySelector("a.today-c-now");
  af.classList.add("degree-selected");
  ac.classList.remove("degree-selected");
}
function switchToC() {
  //let ctemp = gTodayTempNow;
  //todayTempNowCode.innerHTML = ctemp;
  searchCityC();
  let ac = document.querySelector("a.today-c-now");
  let af = document.querySelector("a.today-f-now");
  ac.classList.add("degree-selected");
  af.classList.remove("degree-selected");
}

// GET WEATHER UPDATES VIA API

function getTemperature(response) {
  console.log(response);
  console.log(tempUnits);

  let city = response.data.name;
  let country = response.data.sys.country;
  gTodayTempNow = Math.round(response.data.main.temp);
  gTodayTempHigh = Math.round(response.data.main.temp_max);
  gTodayTempLow = Math.round(response.data.main.temp_min);
  let todayFeelsLike = Math.round(response.data.main.feels_like);
  let todayHumidity = Math.round(response.data.main.humidity);
  let todayWindSpeed = response.data.wind.speed;
  let todaySummary = response.data.weather[0].main;
  let todaySummaryDesc = response.data.weather[0].description;
  let todayWeatherIcon = response.data.weather[0].icon;
  let todayIconURL = `https://openweathermap.org/img/wn/${todayWeatherIcon}@2x.png`;

  console.log(todaySummary);
  console.log(city);
  console.log(country);
  console.log(gTodayTempNow);
  console.log(gTodayTempLow);
  console.log(gTodayTempHigh);

  let cityCode = document.querySelector(".today-city");
  cityCode.innerHTML = `in ${city} (${country})`;
  let cityInputField = document.getElementById("city");
  cityInputField.value = city;

  //let todayTempNowCode = document.querySelector(".today-temp-now"); (global variable)
  todayTempNowCode.innerHTML = `${gTodayTempNow}`;
  let todayFeelsLikeCode = document.querySelector("#today-feelslike");
  todayFeelsLikeCode.innerHTML = `${todayFeelsLike}`;
  let todayHumidityCode = document.querySelector("#today-humidity");
  todayHumidityCode.innerHTML = `${todayHumidity}%`;
  let todayWindSpeedCode = document.querySelector("#today-windspeed");
  if (tempUnits == "imperial") {
    todayWindSpeedCode.innerHTML = `${Math.round(todayWindSpeed)} mph`;
  } else {
    todayWindSpeedCode.innerHTML = `${Math.round(todayWindSpeed * 3.6)} km/h`;
  }
  let todayWeatherIconCode = document.querySelector("#today-weather-icon");
  todayWeatherIconCode.innerHTML = `<img src="${todayIconURL}">`;
  let todaySummaryCode = document.querySelector("#today-summary");
  todaySummaryCode.innerHTML = `${todaySummary} - ${todaySummaryDesc}`;

  let cTodayTempNowCode = document.querySelector(".today-c-now");
  cTodayTempNowCode.addEventListener("click", switchToC);
  let fTodayTempNowCode = document.querySelector(".today-f-now");
  fTodayTempNowCode.addEventListener("click", switchToF);

  let todayTempHighCode = document.querySelector(".today-high");
  todayTempHighCode.innerHTML = `${gTodayTempHigh}`;
  let todayTempLowCode = document.querySelector(".today-low");
  todayTempLowCode.innerHTML = `${gTodayTempLow}`;

  getForecast(response.data.coord);
}

// WEEKDAYS FORECAST

function getForecast(coordinates) {
  console.log(coordinates);
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&units=${tempUnits}&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let weeklyForecastHTML = "";
  let degrees = "°C";
  if (tempUnits == "imperial") {
    degrees = "°F";
  }

  let days = [1, 2, 3, 4, 5, 6]; // removed 0 (current day)
  days.forEach(function (day) {
    let weekdayWindSpeed = null;
    if (tempUnits == "imperial") {
      weekdayWindSpeed = `${Math.round(
        response.data.daily[day].wind_speed
      )} mph`;
    } else {
      weekdayWindSpeed = `${Math.round(
        response.data.daily[day].wind_speed * 3.6
      )} km/h`;
    }

    weeklyForecastHTML =
      weeklyForecastHTML +
      `
  <div class="col-2">
    <div class="border border-5 weekday-forecast">
      <div class="weekday-title fs-6" id="weekday-day">${formatDay(
        response.data.daily[day].dt
      )}</div>
      <div class="weekday-icon" id="weekday-icon"><img src="https://openweathermap.org/img/wn/${
        response.data.daily[day].weather[0].icon
      }@2x.png"></div>
      <div class="weekday-wind fs-6" id="weekday-wind">${weekdayWindSpeed}</div>
      <div class="weekday-high fs-3" id="weekday-high">${Math.round(
        response.data.daily[day].temp.max
      )}<span class="fs-6">${degrees}</span></div>
      <div class="weekday-low fs-6" id="weekday-low">${Math.round(
        response.data.daily[day].temp.min
      )}</div>
    </div>
  </div>
  `;
  });

  let displayForecastCode = document.querySelector("#weekday-forecast");
  displayForecastCode.innerHTML = weeklyForecastHTML;
}

// SEARCH BY CITY

function searchCity(event) {
  // default
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let cityCode = document.querySelector(".today-city");
  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${tempUnits}`;

  console.log(`apiUrl: ${apiUrl}`);
  axios.get(apiUrl).then(getTemperature);
}

function searchCityF(event) {
  // with response in farenheit (imperial)
  tempUnits = "imperial";
  let cityInput = document.querySelector("#city");
  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${tempUnits}`;

  console.log(`apiUrl: ${apiUrl}`);
  axios.get(apiUrl).then(getTemperature);
}

function searchCityC(event) {
  // with response in celsius (metric)
  tempUnits = "metric";
  let cityInput = document.querySelector("#city");
  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${tempUnits}`;

  console.log(`apiUrl: ${apiUrl}`);
  axios.get(apiUrl).then(getTemperature);
}

// SEARCH BY LOCATION

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${tempUnits}&appid=${apiKey}`;

  axios.get(apiUrl).then(getTemperature);
  console.log(apiUrl);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

//////////////////////////////////// DEPLOY PAGE ////////////////////////////////////

// API SETTINGS
let apiKey = "83c74aac9e25e755951c68e175677df8";
let tempUnits = "metric";

// GLOBAL VARIABLES
let gTodayTempNow = null;
let gTodayTempHigh = null;
let gTodayTempLow = null;

let todayTempNowCode = document.querySelector(".today-temp-now");

// Open with users current location
getDayTime();
getLocation();

// Query by user location if allowed (default) or called
let locationReq = document.querySelector(".fa-map-marker-alt");
locationReq.addEventListener("click", getLocation);

// Query by city if called
let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);
