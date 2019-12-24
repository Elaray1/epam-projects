const fetch = require('node-fetch');
const get = require('lodash/get');

const badRequest = '400';
const notFound = '404';

async function translateText(text, lang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&text=${text}&key=trnsl.1.1.20191213T134804Z.f3c0207ae1bd61a1.4a6247447729b96142973c7e4dbea3a2683640a1`;
  const data = await fetch(url).then((res) => res.json());
  return data.text[0];
}

async function getWeatherByCity() { // function that returns weather on 3 days using city name
  let city;
  if (!arguments.length) {
    city = await getUserCity();
  } else {
    city = arguments[0];
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

async function getCoordinates(city) {
  const data = await getWeatherByCity(city);
  if (data.cod === notFound || data.cod === badRequest) {
    return -1;
  }
  const longitude = get(data, 'city.coord.lon', '');
  const latitude = get(data, 'city.coord.lat', '');
  if (!longitude || !latitude) throw new Error('Cant get coordinates of the city!');
  return [longitude, latitude].toString();
}


module.exports = {
  translateText,
  getCoordinates,
};
