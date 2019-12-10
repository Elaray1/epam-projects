import { getYearTime, getDayTime } from './timeOfTheYear';

async function getUserCity() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

async function getUserTimeZone() { // function that returns user's city.
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
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data;
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

export { getUserLocation, getWeatherByCity, getBgImage, getUserCity, getUserTimeZone };
