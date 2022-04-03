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
let h3 = document.querySelector("#changeDate");
h3.innerHTML = `${day}`;
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
let city = document.querySelector("form");
city.addEventListener("submit", where);
//Challenge 3//
//Display real-time temp with Axios//
function showNewTemp(response) {
  let realTemp = document.querySelector("#realtemp");
  realTemp.innerHTML = `${response.data.main.temp}°C`;
  let realHumid = document.querySelector("#realhumid");
  realHumid.innerHTML = `${response.data.main.humidity}%`;
  let realWind = document.querySelector("#realwind");
  realWind.innerHTML = `${response.data.wind.speed} km/h`;
  let realStatus = document.querySelector("#saying");
  realStatus.innerHTML = `${response.data.weather[0].main}`;
}
