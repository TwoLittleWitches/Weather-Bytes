let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();

let cityName = city.charAt(0).toUpperCase() + city.slice(1);

if (city == "") {
  // empty entry
  alert("Please enter a city to continue");
} else if (weather[city] == undefined) {
  // city not available
  alert(
    `Sorry, we don't know the weather for ${cityName}, try going to https://www.google.com/search?q=weather+${city}`
  );
} else {
  // city available
  let cTemp = Math.round(weather[city].temp);
  let fTemp = Math.round((cTemp * 9) / 5 + 32);
  let cityHumidity = weather[city].humidity;
  alert(
    `It is currently ${cTemp}°C (${fTemp}°F) in ${cityName} with a humidity of ${cityHumidity}%`
  );
}
