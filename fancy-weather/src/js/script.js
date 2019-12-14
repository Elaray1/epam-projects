import { getUserCity, getUserTimeZone, getUserLocation, getWeatherByCity, getBgImage, getCityTemperature, getWeatherDescriptionForToday, showOnTheMap, getCoordinates, convertDDToDMS, translateText } from './asyncFunctions';
import { getYearTime, getDayTime, getCurrentTime, getFutureDate } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';
import { weatherFor3DaysBlock } from './weatherFor3Days';
import { mapBlock } from './map';
import { weatherArrayEng, weatherArrayRu, weatherArrayBe } from './weatherArrays';

window.onload = async function () {
  let language;
  if (localStorage.getItem('language') !== null) {
    language = localStorage.getItem('language');
  } else {
    language = 'en';
  }
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
  const changeColorInput = document.querySelector('input[type="color"]');
  const weatherForTodayFeelsLikeTemp = document.querySelector('.feels-like-temp');
  const weatherForTodayWindSpeed = document.querySelector('.wind-speed');
  const celsiusFormat = document.getElementById('celsius');
  const weatherForTodayHumidity = document.querySelector('.humidity');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const languageBlock = document.querySelector('select');
  let [lng, lat] = await getCoordinates(await getUserCity());

  languageBlock.value = language;
  let feelsLikeText;
  let windText;
  let humidityText;
  let searchText;
  let speed;
  let longitude;
  let latitude;


  let currentTemperature = await getCityTemperature(); // array that contains temperature and icons on current and next 3 days
  const setTemperatureFor3Days = () => {
    for (let i = 1; i <= 3; i += 1) {
      const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
      elem.firstElementChild.innerText = getFutureDate(i, language);
      if (degreesFormat === 'celsius') {
        elem.lastElementChild.firstElementChild.innerText = `${currentTemperature[i][0]}°`;
      } else {
        elem.lastElementChild.firstElementChild.innerText = `${Math.round((9 / 5) * currentTemperature[i][0] + 32)}°`;
      }
      elem.lastElementChild.lastElementChild.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[i][1]}@2x.png`);
    }
  };
  // getBgImage();
  translateText('Minsk, Belarus', 'ru');
  setTemperatureFor3Days();
  let weatherDescription;
  const setweatherDescription = async (city) => {
    weatherDescription = await getWeatherDescriptionForToday(city);
    weatherForTodayDescription.innerText = weatherDescription[0];
    if (degreesFormat === 'celsius') {
      weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${weatherDescription[1]}°`;
    } else {
      weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${Math.round((9 / 5) * weatherDescription[1] + 32)}°`;
    }
    weatherForTodayWindSpeed.innerText = `${windText}: ${weatherDescription[2]} ${speed}`;
    weatherForTodayHumidity.innerText = `${humidityText}: ${weatherDescription[3]}%`;
  };
  await setweatherDescription(await getUserLocation());
  let locationArray = await getUserLocation();
  let city = locationArray[0];
  const switchSiteLanguage = async () => {
    let weatherDescriptionVariable;
    switch (language) {
      case 'en':
        feelsLikeText = 'Feels like';
        windText = 'Wind';
        humidityText = 'Humidity';
        searchText = 'Search';
        speed = 'm/s';
        longitude = 'Longitude';
        latitude = 'Latitude';
        weatherDescriptionVariable = weatherDescription[0];
        break;
      case 'ru':
        feelsLikeText = 'Чувствуется как';
        windText = 'Ветер';
        humidityText = 'Влажность';
        searchText = 'Найти';
        speed = 'м/с';
        longitude = 'Долгота';
        latitude = 'Широта';
        weatherDescriptionVariable = weatherArrayRu[weatherArrayEng.indexOf(weatherDescription[0].toUpperCase())];
        break;
      case 'be':
        feelsLikeText = 'Адчуваецаа як';
        windText = 'Вецер';
        humidityText = 'Вільготнасць';
        searchText = 'Знайсці';
        speed = 'м/с';
        longitude = 'Даўгата';
        latitude = 'Шырата';
        weatherDescriptionVariable = weatherArrayBe[weatherArrayEng.indexOf(weatherDescription[0].toUpperCase())];
        break;
      default:
        throw new Error('Incorrect language');
    }
    locationStr.innerText = await translateText(locationStr.innerText, language);
    document.querySelector('#search-btn p').innerText = searchText;
    weatherForTodayDescription.innerText = weatherDescriptionVariable;
    weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${weatherDescription[1]}°`;
    weatherForTodayWindSpeed.innerText = `${windText}: ${weatherDescription[2]} ${speed}`;
    weatherForTodayHumidity.innerText = `${humidityText}: ${weatherDescription[3]}%`;
    for (let i = 1; i <= 3; i += 1) {
      const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
      elem.firstElementChild.innerText = getFutureDate(i, language);
    }
    document.querySelector('.lon').innerText = `${longitude}: ${convertDDToDMS(lng)}`;
    document.querySelector('.lat').innerText = `${latitude}: ${convertDDToDMS(lat)}`;
    currentTimeStr.innerText = await getCurrentTime(language, city);
  };
  let countryCode = locationArray[1];
  currentTimeStr.innerText = await getCurrentTime(language);
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  switchSiteLanguage();
  if (degreesFormat === 'celsius') {
    temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    celsiusFormat.setAttribute('checked', true);
  } else {
    temperatureForToday.innerText = `${Math.round((9 / 5) * currentTemperature[0][0] + 32)}°`;
    document.getElementById('fahrenheit').setAttribute('checked', true);
  }
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
  setInterval(async () => {
    currentTimeStr.innerText = await getCurrentTime(language, city);
  }, 60000);
  showOnTheMap();
  document.querySelector('.lon').innerText = `${longitude}: ${convertDDToDMS(lng)}`;
  document.querySelector('.lat').innerText = `${latitude}: ${convertDDToDMS(lat)}`;
  searchBtn.addEventListener('click', async () => {
    if (await getCoordinates(searchInput.value) === -1) {
      searchInput.value = language === 'en' ? 'Incorrect city name' : language === 'ru' ? 'Неправильное название города' : 'Няправільная назва горада';
      return;
    }
    [lng, lat] = await getCoordinates(searchInput.value);
    searchInput.value = '';
    showOnTheMap(lng, lat);
    document.querySelector('.lon').innerText = `${longitude}: ${convertDDToDMS(lng)}`;
    document.querySelector('.lat').innerText = `${latitude}: ${convertDDToDMS(lat)}`;
    locationArray = await getUserLocation(lng, lat);
    city = locationArray[0];
    countryCode = locationArray[1];
    currentTimeStr.innerText = await getCurrentTime(language, city);
    getBgImage(city);
    currentTemperature = await getCityTemperature(city);
    locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`;
    if (degreesFormat === 'celsius') {
      temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    } else {
      temperatureForToday.innerText = `${Math.round((9 / 5) * currentTemperature[0][0] + 32)}°`;
    }
    temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
    await setweatherDescription(city);
    setTemperatureFor3Days();
    switchSiteLanguage();
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
        weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${weatherDescription[1]}°`;
      } else {
        degreesFormat = 'fahrenheit';
        temperatureForToday.innerText = `${Math.round((9 / 5) * temperatureForToday.innerText.substr(0, temperatureForToday.innerText.length - 1) + 32)}°`;
        for (let i = 1; i <= 3; i += 1) {
          const elem = document.querySelector(`.weather-for-3-days_element-${i}`);
          elem.lastElementChild.firstElementChild.innerText = `${Math.round((9 / 5) * elem.lastElementChild.firstElementChild.innerText.substr(0, elem.lastElementChild.firstElementChild.innerText.length - 1) + 32)}°`;
        }
        weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${Math.round((9 / 5) * weatherDescription[1] + 32)}°`;
      }
    });
  });
  languageBlock.addEventListener('change', () => {
    language = languageBlock.value;
    switchSiteLanguage();
  });
  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage(city);
  });
  changeColorInput.addEventListener('change', () => {
    document.querySelector('body').setAttribute('style', `color:${changeColorInput.value} !important`);
    languageBlock.style.color = changeColorInput.value;
    searchInput.style.color = changeColorInput.value;
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('degreesFormat', degreesFormat);
    localStorage.setItem('language', language);
  });
};
