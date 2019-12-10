import { getYearTime, getDayTime } from './timeOfTheYear';

async function getUserCity() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

async function getUserTimeZone() { // function that returns user's timeZone.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.timezone;
}

async function getUserLocation() { // function that returns user's location.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return [data.city, data.country];
}

async function getWeatherByCity() { // function that returns weather on 3 days using city name
  const city = await getUserCity();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

async function getCityTemperature(degreesFormat) { // function that returns temperature and temperature icons for 3 days
  const city = await getUserCity();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${degreesFormat}&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return [[Math.round(data.list[0].main.temp), data.list[0].weather[0].icon], [Math.round(data.list[8].main.temp), data.list[8].weather[0].icon], [Math.round(data.list[16].main.temp), data.list[16].weather[0].icon], [Math.round(data.list[24].main.temp), data.list[24].weather[0].icon]];
}

async function getBgImage() { // function that returns background image
  const accessKey = '230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49';
  const city = await getUserCity();
  const yearTime = await getYearTime();
  const dayTime = await getDayTime();
  let weather = await getWeatherByCity();
  weather = weather.list[0].weather[0].main;
  const url = `https://api.unsplash.com/photos/random?query=${yearTime},${weather},${dayTime},${city}&client_id=${accessKey}`;
  const data = await fetch(url).then((res) => res.json());
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${data.urls.full})`;
}

async function getWeatherDescription() { // function that return apparent temperature, summary, wind speed and humidity
  const city = await getUserCity();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  const celsiusTemp = data.list[0].main.temp;
  const { humidity } = data.list[0].main;
  const windSpeed = data.list[0].wind.speed;
  const feelsLikeTemp = celsiusTemp - 0.4 * (celsiusTemp - 10) * (1 - humidity / 100);
  return [data.list[0].weather[0].description, Math.round(feelsLikeTemp), Math.round(windSpeed), humidity];
}

export { getUserLocation, getWeatherByCity, getBgImage, getUserCity, getUserTimeZone, getCityTemperature, getWeatherDescription };
