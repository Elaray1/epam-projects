import { getYearTime, getDayTime } from './timeOfTheYear';

async function getUserCity() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

// function that returns timeZone. If no arguments return users timezone, else -> returns timeZone of the city args[0] === city
async function getUserTimeZone(...args) {
  if (!args.length) {
    const url = 'https://ipinfo.io/json?token=3ad064711c140a';
    const data = await fetch(url).then((res) => res.json());
    return data.timezone;
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${args[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data.city.timezone;
}

// function that returns user's city and country if no arguments; 1 argument - city, 2 arguments - latitude and longitude
async function getUserLocation(...args) {
  let url;
  if (!args.length) {
    url = 'https://ipinfo.io/json?token=3ad064711c140a';
    const data = await fetch(url).then((res) => res.json());
    return [data.city, data.country];
  }
  if (args.length === 1) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${args[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${args[1]}&lon=${args[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  }
  const data = await fetch(url).then((res) => res.json());
  return [data.city.name, data.city.country];
}

// returns weather on current and next 3 days. If no args - of user's city, else of enter city (args[0])
async function getWeatherByCity(...args) {
  let city;
  if (!args.length) {
    city = await getUserCity();
  } else {
    city = args[0];
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

// function that returns temperature and temperature icons for 3 days. If no args - of user's city, else of enter city (args[0])
async function getCityTemperature(...args) {
  let city;
  if (!args.length) {
    city = await getUserCity();
  } else {
    city = args[0];
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return [[Math.round(data.list[0].main.temp), data.list[0].weather[0].icon],
    [Math.round(data.list[8].main.temp), data.list[8].weather[0].icon],
    [Math.round(data.list[16].main.temp), data.list[16].weather[0].icon],
    [Math.round(data.list[24].main.temp), data.list[24].weather[0].icon],
  ];
}

// function that returns background image. If no args - of user's city, else of enter city (args[0])
async function getBgImage(...args) {
  const accessKey = '230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49';
  let city; let weather;
  if (!args.length) {
    city = await getUserCity();
    weather = await getWeatherByCity();
  } else {
    city = await getWeatherByCity(args[0]);
    city = city.city.name;
    weather = await getWeatherByCity(city);
  }
  weather = weather.list[0].weather[0].main;
  const yearTime = await getYearTime();
  const dayTime = getDayTime(new Date().getHours());
  const url = `https://api.unsplash.com/photos/random?query=${yearTime},${weather},${dayTime},${city}&client_id=${accessKey}`;
  const data = await fetch(url).then((res) => res.json());
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${data.urls.full})`;
}

// function that return apparent temperature, summary, wind speed and humidity. If no args - of user's city, else of enter city (args[0])
async function getWeatherDescriptionForToday(...args) {
  let city;
  if (!args.length) {
    city = await getUserCity();
  } else {
    city = args[0];
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  const celsiusTemp = data.list[0].main.temp;
  const { humidity } = data.list[0].main;
  const windSpeed = data.list[0].wind.speed;
  const feelsLikeTemp = celsiusTemp - 0.4 * (celsiusTemp - 10) * (1 - humidity / 100);
  return [data.list[0].weather[0].description, Math.round(feelsLikeTemp), Math.round(windSpeed), humidity];
}

// convert degress into degrees and minutes
const convertDDToDMS = (dd) => {
  const deg = dd | 0; // truncate dd to get degrees
  const frac = Math.abs(dd - deg); // get fractional part
  const min = (frac * 60) | 0; // multiply fraction by 60 and truncate
  return `${deg}°${min}'`;
};

// show city on the map using latitude and longitude. If no arguments - of user's city, else -> longitude === args[0], latitude === args[1]
async function showOnTheMap(...args) {
  let lng; let lat;
  if (!args.length) {
    const data = await getWeatherByCity();
    lng = data.city.coord.lon;
    lat = data.city.coord.lat;
  } else {
    lng = args[0];
    lat = args[1];
  }
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxhcmF5IiwiYSI6ImNrNDEyOWc2ZzA3ZGcza3BmeWNnc3U4cWIifQ.PyPYQwDUFrQnaFXpILz-_g';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [lng, lat], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  return map;
}

// return latitude and longitude of the city
async function getCoordinates(city) {
  const data = await getWeatherByCity(city);
  if (data.cod === '404' || data.cod === '400') {
    return -1;
  }
  const lng = data.city.coord.lon;
  const lat = data.city.coord.lat;
  return [lng, lat];
}

// translating text into the selected language
async function translateText(text, lang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&text=${text}&key=trnsl.1.1.20191213T134804Z.f3c0207ae1bd61a1.4a6247447729b96142973c7e4dbea3a2683640a1`;
  const data = await fetch(url).then((res) => res.json());
  return data.text[0];
}

export { getUserLocation, getWeatherByCity, getBgImage, getUserCity, getUserTimeZone, getCityTemperature, getWeatherDescriptionForToday, showOnTheMap, getCoordinates, convertDDToDMS, translateText };
