async function getUserLocation() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

async function getWeather() { // function that return weather on 3 days
  const city = await getUserLocation();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=332b80fd8cd78e930da57a87c99f70ec`;
  const data = await fetch(url).then((res) => res.json());
  return [data.list[0], data.list[8], data.list[16]];
}

export { getUserLocation, getWeather };
