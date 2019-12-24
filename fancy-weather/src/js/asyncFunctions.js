import { getYearTime, getDayTime } from './timeOfTheYear';

const get = require('lodash/get');

const getUserCityUrl = 'https://ipinfo.io/json?token=3ad064711c140a';
const accessKey = '230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49';
const mapAccessToken = 'pk.eyJ1IjoiZWxhcmF5IiwiYSI6ImNrNDEyOWc2ZzA3ZGcza3BmeWNnc3U4cWIifQ.PyPYQwDUFrQnaFXpILz-_g';
const badRequest = '400';
const notFound = '404';

// function that returns user's city.
async function getUserCity() {
  const data = await fetch(getUserCityUrl).then((res) => res.json()).catch((error) => { throw new Error(error); });
  if (!data) { // if data === null or undefined
    throw new Error('Cant get users city');
  }
  return data.city;
}

// function that returns timeZone. If no arguments return users timezone, else -> returns timeZone of the city args[0] === city
async function getUserTimeZone(city) {
  if (!arguments.length) {
    const data = await fetch(getUserCityUrl).then((res) => res.json()).catch((error) => { throw new Error(error); });
    return data.timezone;
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  if (!get(data, 'city.timezone', '')) throw new Error('Cant get timezone!');
  return data.city.timezone;
}

// function that returns user's city and country if no arguments; 1 argument - city, 2 arguments - latitude and longitude
async function getUserLocation() {
  let url;
  let data;
  let city;
  let latitude;
  let longitude;
  switch (arguments.length) {
    case 0:
      data = await fetch(getUserCityUrl).then((res) => res.json()).catch((error) => { throw new Error(error); });
      return [data.city, data.country];
    case 1:
      city = args[0];
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
      break;
    case 2:
      longitude = args[0];
      latitude = args[1];
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
      break;
    default:
      throw new Error('Incorrect arguments!');
  }
  data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  if (!data) {
    throw new Error('Cant get county and city using this data');
  }
  if (!get(data, 'city.name', '') || !get(data, 'city.country', '')) throw new Error('Cant get city or country name!');
  return [data.city.name, data.city.country];
}

// returns weather on current and next 3 days. If no args - of user's city, else of enter city
async function getWeatherByCity(city) {
  if (!arguments.length) {
    city = await getUserCity();
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  return data;
}

// function that returns temperature and temperature icons for 3 days. If no args - of user's city, else of enter city
async function getCityTemperature(city) {
  if (!arguments.length) {
    city = await getUserCity();
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  if (!get(data, 'list[0].main.temp', '') || !get(data, 'list[0].weather[0].icon', '')) throw new Error('Cant get weather or weather icon!');
  return [[Math.round(data.list[0].main.temp), data.list[0].weather[0].icon],
    [Math.round(data.list[8].main.temp), data.list[8].weather[0].icon],
    [Math.round(data.list[16].main.temp), data.list[16].weather[0].icon],
    [Math.round(data.list[24].main.temp), data.list[24].weather[0].icon],
  ];
}

// function that returns background image. If no args - of user's city, else of enter city
async function getBgImage(currentCity) {
  let city;
  let weather;
  if (!arguments.length) {
    city = await getUserCity();
    weather = await getWeatherByCity();
  } else {
    city = await getWeatherByCity(currentCity);
    city = city.city.name;
    weather = await getWeatherByCity(city);
  }
  if (!get(weather, 'list[0].weather[0].main', '')) throw new Error('Cant get weather!');
  weather = weather.list[0].weather[0].main;
  const yearTime = await getYearTime();
  const dayTime = getDayTime(new Date().getHours());
  const url = `https://api.unsplash.com/photos/random?query=${yearTime},${weather},${dayTime},${city}&client_id=${accessKey}`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${data.urls.full})`;
}

// function that return apparent temperature, summary, wind speed and humidity. If no args - of user's city, else of enter city
async function getWeatherDescriptionForToday(currentCity) {
  let city;
  if (!arguments.length) {
    city = await getUserCity();
  } else {
    city = currentCity;
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  if (!get(data, 'list[0].main.temp', '') || !get(data, 'list[0].main', '')
   || !get(data, 'list[0].wind.speed', '') || !get(data, 'list[0].weather[0].description', '')) throw new Error('Cant get weather description!');
  const celsiusTemp = data.list[0].main.temp;
  const { humidity } = data.list[0].main;
  const windSpeed = data.list[0].wind.speed;
  const feelsLikeTemp = celsiusTemp - 0.4 * (celsiusTemp - 10) * (1 - humidity / 100);
  return [data.list[0].weather[0].description, Math.round(feelsLikeTemp), Math.round(windSpeed), humidity];
}

// convert degrees into degrees and minutes
const convertDDToDMS = (initialDegrees) => {
  const deg = initialDegrees | 0; // truncate dd to get degrees
  const frac = Math.abs(initialDegrees - deg); // get fractional part
  const min = (frac * 60) | 0; // multiply fraction by 60 and truncate
  return `${deg}°${min}'`;
};

// show city on the map using latitude and longitude. If no arguments - of user's city, else -> longitude === args[0], latitude === args[1]
async function showOnTheMap(longitude, latitude) {
  if (!arguments.length) {
    const data = await getWeatherByCity();
    if (!data) {
      throw new Error('Cant get weather by users city');
    }
    longitude = get(data, 'city.coord.lon', '');
    latitude = get(data, 'city.coord.lat', '');
    if (!longitude || !latitude) throw new Error('Cant get coordinates of the city!');
  }
  mapboxgl.accessToken = mapAccessToken;
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  return map;
}

// return latitude and longitude of the city
async function getCoordinates(city) {
  const data = await getWeatherByCity(city);
  if (data.cod === notFound || data.cod === badRequest) {
    return -1;
  }
  const longitude = get(data, 'city.coord.lon', '');
  const latitude = get(data, 'city.coord.lat', '');
  if (!longitude || !latitude) throw new Error('Cant get coordinates of the city!');
  return [longitude, latitude];
}

// translating text into the selected language
async function translateText(text, lang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&text=${text}&key=trnsl.1.1.20191213T134804Z.f3c0207ae1bd61a1.4a6247447729b96142973c7e4dbea3a2683640a1`;
  const data = await fetch(url).then((res) => res.json()).catch((error) => { throw new Error(error); });
  return data.text[0];
}

export {
  getUserLocation,
  getWeatherByCity,
  getBgImage,
  getUserCity,
  getUserTimeZone,
  getCityTemperature,
  getWeatherDescriptionForToday,
  showOnTheMap,
  getCoordinates,
  convertDDToDMS,
  translateText,
};
