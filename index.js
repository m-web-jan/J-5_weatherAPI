var lat, lng;
var units = "C";
let city = "";
const apiKey = "4180698e471277558df27170165065c7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
async function checkWeather(cityName, city = false) {
  let response;
  let unit = units == "C" ? "&units=metric" : "&units=imperial";
  if (city) {
    response = await fetch(
      apiUrl + unit + `&q=${cityName}` + `&appid=${apiKey}`
    );
  } else {
    response = await fetch(
      apiUrl + unit + `&lat=${lat}&lon=${lng}` + `&appid=${apiKey}`
    );
  }
  var data = await response.json();

  fill(data, units);
}

let metrics = document.getElementsByTagName("h3")[0];
metrics.onclick = () => {
  if (metrics.innerText[1] == "C") {
    metrics.innerText = "°F";
    units = "F";
    if (city) checkWeather(city, true);
    else checkWeather();
  } else {
    metrics.innerText = "°C";
    units = "C";
    if (city) checkWeather(city, true);
    else checkWeather();
  }
};

window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Oops, no geolocation support");
  }
}

function displayLocation(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  checkWeather();
}

function fill(data, units) {
  let temp = data.main.temp;
  let city = data.name;
  let country = data.sys.country;
  let humidity = data.main.humidity;
  let wind = data.wind.speed;
  let weather = data.weather[0].main.toLowerCase();

  document.getElementsByClassName("temp")[0].innerText = `${Math.floor(temp)}${
    units == "C" ? "°C" : "°F"
  }`;
  document.getElementsByClassName("city")[0].innerText = `${city}, ${country}`;
  document.getElementsByClassName("value")[0].innerText = `${humidity}%`;
  document.getElementsByClassName("value")[1].innerText = `${Math.floor(
    wind
  )} ${units == "C" ? "m/s" : "mph"}`;
  document.getElementsByTagName('img')[1].src = 'img/' + weather + '.png';
  
}

let search_btn = document.getElementsByTagName('img')[0];
let search_input = document.getElementsByTagName('input')[0];

search_btn.onclick = () => {
  if (!search_input.value) return;
  city = search_input.value;
  search_input.value = '';
  checkWeather(city, true);
}