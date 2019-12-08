async function getUserLocation() { // function that returns user's city.
  const url = 'https://ipinfo.io/json?token=3ad064711c140a';
  const data = await fetch(url).then((res) => res.json());
  return data.city;
}

export { getUserLocation };
