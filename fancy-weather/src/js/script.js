import { getUserCity, getUserTimeZone, getUserLocation, getWeatherByCity, getBgImage, getCityTemperature, getWeatherDescriptionForToday, showOnTheMap, getCoordinates } from './asyncFunctions';
import { getYearTime, getDayTime, getCurrentTime, getFutureDate } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';
import { weatherFor3DaysBlock } from './weatherFor3Days';
import { mapBlock } from './map';

window.onload = async function () {
  let language = 'en';
  const contentWarapper = document.querySelector('.content-wrapper');
  const htmlContent = `${controlBlock}<div class="weather-and-map"><div class="weather-for-4-days">${weatherForTodayBlock}${weatherFor3DaysBlock}</div>${mapBlock}</div>`;
  contentWarapper.insertAdjacentHTML('afterbegin', htmlContent);
  const refreshBgButton = document.getElementById('refresh-bg');
  const locationStr = document.querySelector('.weather-for-today h2');
  const currentTimeStr = document.querySelector('.weather-for-today h4');
  const temperatureForToday = document.querySelector('.temperature p');
  const temperaturForTodayImg = document.querySelector('.temperature img');
  const weatherForTodayDescription = document.querySelector('.description');
  const weatherForTodayFeelsLikeTemp = document.querySelector('.feels-like-temp');
  const weatherForTodayWindSpeed = document.querySelector('.wind-speed');
  const weatherForTodayHumidity = document.querySelector('.humidity');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  let currentTemperature = await getCityTemperature(); // array that contains temperature and icons on current and next 3 days
  const setTemperatureFor3Days = () => {
    for (let i = 1; i <= 3; i += 1) {
      const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
      elem.firstElementChild.innerText = getFutureDate(i);
      elem.lastElementChild.firstElementChild.innerText = `${currentTemperature[i][0]}°`;
      elem.lastElementChild.lastElementChild.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[i][1]}@2x.png`);
    }
  };
  // getBgImage();
  setTemperatureFor3Days();
  const setweatherDescription = async (city) => {
    const weatherDescription = await getWeatherDescriptionForToday(city);
    weatherForTodayDescription.innerText = weatherDescription[0];
    weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${weatherDescription[1]}°`;
    weatherForTodayWindSpeed.innerText = `Wind: ${weatherDescription[2]} m/s`;
    weatherForTodayHumidity.innerText = `Humidity: ${weatherDescription[3]}%`;
  };
  setweatherDescription(await getUserLocation());
  let locationArray = await getUserLocation();
  let city = locationArray[0];
  let countryCode = locationArray[1];
  currentTimeStr.innerText = await getCurrentTime();
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
  setInterval(async () => {
    currentTimeStr.innerText = await getCurrentTime(city);
  }, 1000);
  showOnTheMap();
  searchBtn.addEventListener('click', async () => {
    if (await getCoordinates(searchInput.value) === -1) {
      searchInput.value = language === 'en' ? 'Incorrect city name' : language === 'ru' ? 'Неправильное название города' : 'Няправільная назва горада';
      return;
    }
    const [lng, lat] = await getCoordinates(searchInput.value);
    searchInput.value = '';
    showOnTheMap(lng, lat);
    locationArray = await getUserLocation(lng, lat);
    city = locationArray[0];
    countryCode = locationArray[1];
    currentTimeStr.innerText = await getCurrentTime(city);
    getBgImage(city);
    currentTemperature = await getCityTemperature(city);
    locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`;
    temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
    setweatherDescription(city);
    setTemperatureFor3Days();
  });
  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage(city);
  });
};
