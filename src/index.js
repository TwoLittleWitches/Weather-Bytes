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

// GET WEATHER UPDATES VIA API

function getTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  gTodayTempNow = Math.round(response.data.main.temp);
  gTodayTempHigh = Math.round(response.data.main.temp_max);
  gTodayTempLow = Math.round(response.data.main.temp_min);
  let todayHumidity = Math.round(response.data.main.humidity);
  let todayWindSpeed = Math.round(response.data.wind.speed * 3.6);
  let todaySummary = response.data.weather[0].main;
  let todaySummaryDesc = response.data.weather[0].description;
  let todayWeatherIcon = response.data.weather[0].icon;
  let todayIconURL = `http://openweathermap.org/img/wn/${todayWeatherIcon}@2x.png`;

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

  let todayTempNowCode = document.querySelector(".today-temp-now");
  todayTempNowCode.innerHTML = `${gTodayTempNow}`;
  let todayHumidityCode = document.querySelector("#today-humidity");
  todayHumidityCode.innerHTML = `${todayHumidity}%`;
  let todayWindSpeedCode = document.querySelector("#today-windspeed");
  todayWindSpeedCode.innerHTML = `${todayWindSpeed}`;
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

function displayForecast(response) {
  console.log(response);
}

// GET WEEKLY FORECAST
function getForecast(coordinates) {
  console.log(coordinates);
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&units=${tempUnits}&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

// SWITCH TEMPERATURE UNITS

function switchToF() {
  let ftemp = Math.round((gTodayTempNow * 9) / 5 + 32);
  todayTempNowCode.innerHTML = ftemp;
  let af = document.querySelector("a.today-f-now");
  let ac = document.querySelector("a.today-c-now");
  af.classList.add("degree-selected");
  ac.classList.remove("degree-selected");
}
function switchToC() {
  let ctemp = gTodayTempNow;
  todayTempNowCode.innerHTML = ctemp;
  let ac = document.querySelector("a.today-c-now");
  let af = document.querySelector("a.today-f-now");
  ac.classList.add("degree-selected");
  af.classList.remove("degree-selected");
}

// SEARCH BY CITY

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let cityCode = document.querySelector(".today-city");

  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${tempUnits}`;

  console.log(apiUrl);
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

// DEPLOY PAGE

// API SETTINGS
let apiKey = "83c74aac9e25e755951c68e175677df8";
let tempUnits = "metric";

// GLOBAL VARIABLES
let gTodayTempNow = null;
let gTodayTempHigh = null;
let gTodayTempLow = null;

// Open with users current location
getDayTime();
getLocation();

// Query by user location if allowed (default) or called
let locationReq = document.querySelector(".fa-map-marker-alt");
locationReq.addEventListener("click", getLocation);

// Query by city if called
let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);
