import { getUserCity, getUserTimeZone, getUserLocation, getWeatherByCity, getBgImage, getCityTemperature } from './asyncFunctions';
import { getYearTime, getDayTime, getCurrentTime } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';

window.onload = async function () {
  const contentWarapper = document.querySelector('.content-wrapper');
  contentWarapper.insertAdjacentHTML('afterbegin', controlBlock);
  const refreshBgButton = document.getElementById('refresh-bg');
  const controlBlockDiv = document.querySelector('.control-block');
  controlBlockDiv.insertAdjacentHTML('afterend', weatherForTodayBlock);
  const locationStr = document.querySelector('.weather-for-today h2');
  const currentTimeStr = document.querySelector('.weather-for-today h4');
  const temperatureForToday = document.querySelector('.temperature p');
  const temperaturForTodayImg = document.querySelector('.temperature img');
  const locationArray = await getUserLocation();
  const city = locationArray[0];
  const countryCode = locationArray[1];
  const userTimeZone = await getUserTimeZone();
  let language = 'en';
  currentTimeStr.innerText = getCurrentTime(userTimeZone, language);
  let degreesFormat = 'metric'; // celsius (imperial -> fahrenheit)
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  let currentTemperature = await getCityTemperature(degreesFormat);
  temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);

  console.log(await getWeatherByCity());
  setInterval(() => {
    currentTimeStr.innerText = getCurrentTime(userTimeZone, language);
  }, 1000);
  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage();
  });
};
