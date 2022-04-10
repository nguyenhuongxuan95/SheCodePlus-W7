//Everything about time//
let now = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
let months = [
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
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#currentTimeTag");
currentTime.innerHTML = `${day}, ${date} ${month} ${hour}:${minute}`;

//Display city name//
function where(event) {
  event.preventDefault();
  let input = document.querySelector("#cityName-input");
  let output = document.querySelector("#cityNameTag");
  let whereTown = input.value;
  output.innerHTML = input.value;
  let apiKey = "b81bc829f24d038a00971d55be0bd38d";
  let unit = "metric";
  let apiURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${whereTown}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL1).then(showNewTemp);
}
//Calling a bunch of global variables //
let city = document.querySelector("form");
city.addEventListener("submit", where);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemperature = null;

//Display real-time temp with Axios//
function showNewTemp(response) {
  let realTemp = document.querySelector("#realtemp");
  realTemp.innerHTML = Math.round(response.data.main.temp);
  let realHumid = document.querySelector("#realhumid");
  realHumid.innerHTML = Math.round(response.data.main.humidity);
  let realWind = document.querySelector("#realwind");
  realWind.innerHTML = Math.round(response.data.wind.speed);
  let realStatus = document.querySelector("#saying");
  realStatus.innerHTML = `${response.data.weather[0].description}`;
  let realPPT = document.querySelector("#realppt");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  celsiusTemperature = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
}
//Unit conversion//
function showFahrenheitTemp(event) {
  event.preventDefault();
  let realTemp = document.querySelector("#realtemp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  realTemp.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let realTemp = document.querySelector("#realtemp");
  realTemp.innerHTML = Math.round(celsiusTemperature);
}
//Display forecast//
function getForecast(coordinates) {
  console.log(coordinates);
  let APIkey = "b81bc829f24d038a00971d55be0bd38d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIkey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class = "col-2">
  <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  ${index}
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt = "" width = "42"/>
  <div class = "weather-forecast-temperature">
   <span class = "weather-forecast-temperature-max">
   ${Math.round(forecastDay.temp.max)}°</span>
  <span class = "weather-forecast-temperature-min">
  ${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>
  `;
    }
  });
  //let days = ["Fri", "Sat", "Sun"];
  //days.forEach(function (day) {
  //forecastHTML =
  //forecastHTML +
  //`<div class = "col-2">
  //<div class = "weather-forecast-date">${day}</div>
  //<img src="http://openweathermap.org/img/wn/50d@2x.png" alt = "" width = "42"/>
  //<div class = "weather-forecast-temperature">
  //  <span class = "weather-forecast-temperature-max">18°</span>
  //  <span class = "weather-forecast-temperature-min">12°</span>
  //</div>
  //</div>`;
  //});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
