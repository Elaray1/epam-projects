import { getUserCity, getUserTimeZone, getUserLocation, getWeatherByCity, getBgImage, getCityTemperature, getWeatherDescriptionForToday, showOnTheMap, getCoordinates } from './asyncFunctions';
import { getYearTime, getDayTime, getCurrentTime, getFutureDate } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';
import { weatherFor3DaysBlock } from './weatherFor3Days';
import { mapBlock } from './map';

window.onload = async function () {
  let language = 'en';
  let degreesFormat;
  if (localStorage.getItem('degreesFormat') !== null) {
    degreesFormat = localStorage.getItem('degreesFormat');
  } else {
    degreesFormat = 'celsius';
  }
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
  const celsiusFormat = document.getElementById('celsius');
  const weatherForTodayHumidity = document.querySelector('.humidity');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const languageBlock = document.querySelector('select');



  let currentTemperature = await getCityTemperature(); // array that contains temperature and icons on current and next 3 days
  const setTemperatureFor3Days = () => {
    for (let i = 1; i <= 3; i += 1) {
      const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
      elem.firstElementChild.innerText = getFutureDate(i);
      if (degreesFormat === 'celsius') {
        elem.lastElementChild.firstElementChild.innerText = `${currentTemperature[i][0]}°`;
      } else {
        elem.lastElementChild.firstElementChild.innerText = `${Math.round((9 / 5) * currentTemperature[i][0] + 32)}°`;
      }
      elem.lastElementChild.lastElementChild.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[i][1]}@2x.png`);
    }
  };
  // getBgImage();
  console.log(languageBlock.value);
  setTemperatureFor3Days();
  const setweatherDescription = async (city) => {
    const weatherDescription = await getWeatherDescriptionForToday(city);
    weatherForTodayDescription.innerText = weatherDescription[0];
    if (degreesFormat === 'celsius') {
      weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${weatherDescription[1]}°`;
    } else {
      weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${Math.round((9 / 5) * weatherDescription[1] + 32)}°`;
    }
    weatherForTodayWindSpeed.innerText = `Wind: ${weatherDescription[2]} m/s`;
    weatherForTodayHumidity.innerText = `Humidity: ${weatherDescription[3]}%`;
  };
  setweatherDescription(await getUserLocation());
  let locationArray = await getUserLocation();
  let city = locationArray[0];
  let countryCode = locationArray[1];
  currentTimeStr.innerText = await getCurrentTime();
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  if (degreesFormat === 'celsius') {
    temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    celsiusFormat.setAttribute('checked', true);
  } else {
    temperatureForToday.innerText = `${Math.round((9 / 5) * currentTemperature[0][0] + 32)}°`;
    document.getElementById('fahrenheit').setAttribute('checked', true);
  }
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
  setInterval(async () => {
    currentTimeStr.innerText = await getCurrentTime(city);
  }, 60000);
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
    if (degreesFormat === 'celsius') {
      temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    } else {
      temperatureForToday.innerText = `${Math.round((9 / 5) * currentTemperature[0][0] + 32)}°`;
    }
    temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
    setweatherDescription(city);
    setTemperatureFor3Days();
  });
  document.querySelectorAll('input[name="degrees"]').forEach((e) => {
    e.addEventListener('change', () => {
      if (celsiusFormat.checked) {
        degreesFormat = 'celsius';
        temperatureForToday.innerText = `${Math.round((5 / 9) * (temperatureForToday.innerText.substr(0, temperatureForToday.innerText.length - 1) - 32))}°`;
        for (let i = 1; i <= 3; i += 1) {
          const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
          elem.lastElementChild.firstElementChild.innerText = `${Math.round((5 / 9) * (elem.lastElementChild.firstElementChild.innerText.substr(0, elem.lastElementChild.firstElementChild.innerText.length - 1) - 32))}°`;
        }
        weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${Math.round((5 / 9) * (weatherForTodayFeelsLikeTemp.innerText.substring(12, weatherForTodayFeelsLikeTemp.innerText.length - 1) - 32))}°`;
      } else {
        degreesFormat = 'fahrenheit';
        temperatureForToday.innerText = `${Math.round((9 / 5) * temperatureForToday.innerText.substr(0, temperatureForToday.innerText.length - 1) + 32)}°`;
        for (let i = 1; i <= 3; i += 1) {
          const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
          elem.lastElementChild.firstElementChild.innerText = `${Math.round((9 / 5) * elem.lastElementChild.firstElementChild.innerText.substr(0, elem.lastElementChild.firstElementChild.innerText.length - 1) + 32)}°`;
        }
        weatherForTodayFeelsLikeTemp.innerText = `Feels like: ${Math.round((9 / 5) * weatherForTodayFeelsLikeTemp.innerText.substring(12, weatherForTodayFeelsLikeTemp.innerText.length - 1) + 32)}°`;
      }
    });
  });
  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage(city);
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('degreesFormat', degreesFormat);
  });
};
