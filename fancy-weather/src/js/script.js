import { getUserCity, getUserTimeZone, getUserLocation, getWeatherByCity, getBgImage, getCityTemperature, getWeatherDescription } from './asyncFunctions';
import { getYearTime, getDayTime, getCurrentTime, getFutureDate } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';
import { weatherFor3DaysBlock } from './weatherFor3Days';

window.onload = async function () {
  let language = 'en';
  let degreesFormat = 'metric'; // celsius (imperial -> fahrenheit)
  const contentWarapper = document.querySelector('.content-wrapper');
  const htmlContent = `${controlBlock}<div class="weather-for-4-days">${weatherForTodayBlock}${weatherFor3DaysBlock}</div>`;
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
  const weatherDescription = await getWeatherDescription();
  let currentTemperature = await getCityTemperature(degreesFormat); // array that contains temperature and icons on current and next 3 days
  for (let i = 1; i <= 3; i += 1) {
    const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
    elem.firstElementChild.innerText = getFutureDate(i);
    elem.lastElementChild.firstElementChild.innerText = `${currentTemperature[i][0]}°`;
    elem.lastElementChild.lastElementChild.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[i][1]}@2x.png`);
  }
  switch (language) {
    case 'en':
      weatherForTodayDescription.innerText = weatherDescription[0];
      weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${weatherDescription[1]}°`;
      weatherForTodayWindSpeed.innerText = `Wind: ${weatherDescription[2]} m/s`;
      weatherForTodayHumidity.innerText = `Humidity: ${weatherDescription[3]}%`;
      break;
    default:
      throw new Error();
  }
  const locationArray = await getUserLocation();
  const city = locationArray[0];
  const countryCode = locationArray[1];
  const userTimeZone = await getUserTimeZone();
  currentTimeStr.innerText = getCurrentTime(userTimeZone, language);
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);

  setInterval(() => {
    currentTimeStr.innerText = getCurrentTime(userTimeZone, language);
  }, 1000);
  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage();
  });
};
