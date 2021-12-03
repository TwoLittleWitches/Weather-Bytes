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
    clock = "pm";
  } else {
    clock = "am";
  }
  let daytime = document.querySelector(".today-daytime");
  daytime.innerHTML = `${day} | ${month} ${date} | ${hour}:${min} ${clock}`;
}

// GET WEATHER UPDATES VIA API

function getTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  let todayTempNow = Math.round(response.data.main.temp);
  let todayTempHigh = Math.round(response.data.main.temp_max);
  let todayTempLow = Math.round(response.data.main.temp_min);
  let todayHumidity = Math.round(response.data.main.humidity);
  let todayWind = Math.round(response.data.wind.speed);
  let todaySummary = response.data.weather[0].main;
  let todaySummaryDesc = response.data.weather[0].description;
  let todayIcon = response.data.weather[0].icon;

  console.log(todaySummary);
  console.log(city);
  console.log(country);
  console.log(todayTempNow);
  console.log(todayTempLow);
  console.log(todayTempHigh);

  let cityCode = document.querySelector(".today-city");
  cityCode.innerHTML = `in ${city} (${country})`;
  let cityInputField = document.getElementById("city");
  cityInputField.value = city;

  let todayNowCode = document.querySelector(".today-now");
  todayNowCode.innerHTML = `${todayTempNow}`;
  let todaySummaryCode = document.querySelector("#today-summary");
  todaySummaryCode.innerHTML = `${todaySummary} - ${todaySummaryDesc}`;

  // SWITCH TEMPERATURE UNITS

  function switchToF() {
    let ftemp = Math.round((todayTempNow * 9) / 5 + 32);
    todayNowCode.innerHTML = ftemp;
    let af = document.querySelector("a.today-f-now");
    let ac = document.querySelector("a.today-c-now");
    af.classList.add("degree-selected");
    ac.classList.remove("degree-selected");
  }
  function switchToC() {
    let ctemp = todayTempNow;
    todayNowCode.innerHTML = ctemp;
    let ac = document.querySelector("a.today-c-now");
    let af = document.querySelector("a.today-f-now");
    ac.classList.add("degree-selected");
    af.classList.remove("degree-selected");
  }

  let cTodayTempNowCode = document.querySelector(".today-c-now");
  cTodayTempNowCode.addEventListener("click", switchToC);
  let fTodayTempNowCode = document.querySelector(".today-f-now");
  fTodayTempNowCode.addEventListener("click", switchToF);
  /////
  let todayTempHighCode = document.querySelector(".today-high");
  todayTempHighCode.innerHTML = `${todayTempHigh}`;
  let todayTempLowCode = document.querySelector(".today-low");
  todayTempLowCode.innerHTML = `${todayTempLow}`;
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

// API SETTINGS

let apiKey = "83c74aac9e25e755951c68e175677df8";
let tempUnits = "metric";

// DEPLOY PAGE

// Open with users current location
getDayTime();
getLocation();

// Query by city
let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);

// Query by user location request
let locationReq = document.querySelector(".fa-map-marker-alt");
locationReq.addEventListener("click", getLocation);
