let now = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
