import { getYearTime, getDayTime } from './timeOfTheYear';
import { fullCountryNames } from './fullCountryNames';

async function getUserLocation() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

async function getWeather() { // function that returns weather on 3 days
  const city = await getUserLocation();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

async function getBgImage() { // function that returns background image
  const accessKey = '230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49';
  const city = await getUserLocation();
  const yearTime = await getYearTime();
  const dayTime = await getDayTime();
  let weather = await getWeather();
  weather = weather[0].weather[0].main;
  const url = `https://api.unsplash.com/photos/random?query=${yearTime},${weather},${dayTime},${city}&client_id=${accessKey}`;
  const data = await fetch(url).then((res) => res.json());
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${data.urls.full})`;
}

export { getUserLocation, getWeather, getBgImage };
