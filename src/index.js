// Get today info - day/time
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

// Get weather updates via API

function getTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  let todayTempNow = Math.round(response.data.main.temp);
  //let todayTempHigh = Math.round(response.data.main.temp_max);
  let todayTempLow = Math.round(response.data.main.temp_min);
  let todayHumidity = response.data.main.humidity;
  let todayWind = response.data.wind.speed;
  let todaySummary = response.data.weather[0].main;
  let todaySummaryDesc = response.data.weather[0].description;
  let todayIcon = response.data.weather[0].icon;
  console.log(city);
  console.log(country);
  console.log(todayTempNow);
  console.log(todayTempLow);

  let cityCode = document.querySelector(".today-city");
  cityCode.innerHTML = `in ${city} (${country})`;
  let cityInputField = document.getElementById("city");
  cityInputField.value = city;

  let todayTempNowCode = document.querySelector(".today-high");
  todayTempNowCode.innerHTML = `${todayTempNow}`;
  let todaySummaryCode = document.querySelector("#today-summary");
  todaySummaryCode.innerHTML = `${todaySummary} - ${todaySummaryDesc}`;

  /////
  function switchToF() {
    let ftemp = Math.round((todayTempNow * 9) / 5 + 32);
    todayHighCode.innerHTML = ftemp;
    let af = document.querySelector("a.today-f-high");
    let ac = document.querySelector("a.today-c-high");
    af.classList.add("degree-selected");
    ac.classList.remove("degree-selected");
  }
  function switchToC() {
    let ctemp = todayTempNow;
    todayHighCode.innerHTML = ctemp;
    let ac = document.querySelector("a.today-c-high");
    let af = document.querySelector("a.today-f-high");
    ac.classList.add("degree-selected");
    af.classList.remove("degree-selected");
  }

  let cTodayHighCode = document.querySelector(".today-c-high");
  cTodayHighCode.addEventListener("click", switchToC);

  let fTodayHighCode = document.querySelector(".today-f-high");
  fTodayHighCode.addEventListener("click", switchToF);
  /////

  let todayTempLowCode = document.querySelector(".today-low");
  todayTempLowCode.innerHTML = `${todayTempLow}`;
}

// search by city
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let cityCode = document.querySelector(".today-city");

  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${tempUnits}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(getTemperature);
}

// search by location
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

// API defaults
let apiKey = "83c74aac9e25e755951c68e175677df8";
let tempUnits = "metric";

// Open with users current location
getLocation();

// Query by city
let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);

// Query by user location request
let locationReq = document.querySelector(".fa-map-marker-alt");
locationReq.addEventListener("click", getLocation);

// Switch between celsius and farenheit

//function switchToF() {
//let temp = 22;
//todayHighCode.innerHTML = Math.round((temp * 9) / 5 + 32);
//let af = document.querySelector("a.today-f-high");
//let ac = document.querySelector("a.today-c-high");
//af.classList.add("degree-selected");
//ac.classList.remove("degree-selected");
//}
//function switchToC() {
//let temp = 72;
//todayHighCode.innerHTML = Math.round(((temp - 32) * 5) / 9);
//let ac = document.querySelector("a.today-c-high");
//let af = document.querySelector("a.today-f-high");
//ac.classList.add("degree-selected");
//af.classList.remove("degree-selected");
//}

//let cTodayHighCode = document.querySelector(".today-c-high");
//cTodayHighCode.addEventListener("click", switchToC);

//let fTodayHighCode = document.querySelector(".today-f-high");
//fTodayHighCode.addEventListener("click", switchToF);

//let todayLowCode = document.querySelector(".today-low");
//todayLowCode.innerHTML = `0`;

let todayHighCode = document.querySelector(".today-high");
