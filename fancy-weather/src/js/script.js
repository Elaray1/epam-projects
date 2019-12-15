// Import all necessary fuctions
import { getUserCity, getUserLocation, getBgImage, getCityTemperature, getWeatherDescriptionForToday, showOnTheMap, getCoordinates, convertDDToDMS, translateText } from './asyncFunctions';
import { getCurrentTime, getFutureDate } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';
import { fullCountryNames } from './fullCountryNames';
import { weatherFor3DaysBlock } from './weatherFor3Days';
import { mapBlock } from './map';
import { weatherArrayEng, weatherArrayRu, weatherArrayBe } from './weatherArrays';

(async function () {
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
  const microfonImg = document.getElementById('microfon-img');
  const recognition = new webkitSpeechRecognition();

  let language; // current language on site
  let degreesFormat; // current degrees format on site
  let isMicro = false;
  let feelsLikeText;
  let windText;
  let humidityText;
  let searchText;
  let speed;
  let longitude;
  let latitude;
  let weatherDescription;
  let [lng, lat] = await getCoordinates(await getUserCity()); // getting current longitude and latitude by user current city
  let currentTemperature = await getCityTemperature(); // array that contains temperature and icons on current and next 3 days
  let locationArray = await getUserLocation(); // contains array with city and country
  let city = locationArray[0];
  let countryCode = locationArray[1];

  const setTemperatureFor3Days = () => { // function that shows temperature on next 3 days
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
  const setweatherDescription = async (currentCity) => { // fucntion that shows weather description for today
    weatherDescription = await getWeatherDescriptionForToday(currentCity);
    weatherForTodayDescription.innerText = weatherDescription[0];
    if (degreesFormat === 'celsius') {
      weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${weatherDescription[1]}°`;
    } else {
      weatherForTodayFeelsLikeTemp.innerText = `${feelsLikeText}: ${Math.round((9 / 5) * weatherDescription[1] + 32)}°`;
    }
    weatherForTodayWindSpeed.innerText = `${windText}: ${weatherDescription[2]} ${speed}`;
    weatherForTodayHumidity.innerText = `${humidityText}: ${weatherDescription[3]}%`;
  };
  const switchSiteLanguage = async () => { // fucntion that change site language
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

  if (localStorage.getItem('language') !== null) { // if user first time on the site, default language will be english
    language = localStorage.getItem('language');
  } else {
    language = 'en';
  }
  languageBlock.value = language;
  if (localStorage.getItem('degreesFormat') !== null) { // if user first time on the site, default degrees format will be celsius
    degreesFormat = localStorage.getItem('degreesFormat');
  } else {
    degreesFormat = 'celsius';
  }
  if (degreesFormat === 'celsius') {
    temperatureForToday.innerText = `${currentTemperature[0][0]}°`;
    celsiusFormat.setAttribute('checked', true);
  } else {
    temperatureForToday.innerText = `${Math.round((9 / 5) * currentTemperature[0][0] + 32)}°`;
    document.getElementById('fahrenheit').setAttribute('checked', true);
  }

  getBgImage(); // change your background image on image connected with your: city, time of the year, day time and e.t.
  setTemperatureFor3Days();
  await setweatherDescription(await getUserLocation());
  currentTimeStr.innerText = await getCurrentTime(language);
  locationStr.innerText = `${city}, ${fullCountryNames[countryCode]}`; // set user's country and city
  switchSiteLanguage();
  temperaturForTodayImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentTemperature[0][1]}@2x.png`);
  showOnTheMap();
  document.querySelector('.lon').innerText = `${longitude}: ${convertDDToDMS(lng)}`;
  document.querySelector('.lat').innerText = `${latitude}: ${convertDDToDMS(lat)}`;

  setInterval(async () => { // updating current time every 1 minute
    currentTimeStr.innerText = await getCurrentTime(language, city);
  }, 60000);

  searchBtn.addEventListener('click', async () => { // after click on search button: switch off microfon; change map, coordinates and weather block
    if (isMicro) {
      microfonImg.setAttribute('src', 'assets/micrrofon.png');
      recognition.stop();
    }
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

  document.querySelector('.labels-for-degrees-inputs').addEventListener('change', () => { // switch degrees format
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

  languageBlock.addEventListener('change', () => { // switch language
    language = languageBlock.value;
    switchSiteLanguage();
  });

  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage(city);
  });
  changeColorInput.addEventListener('change', () => {
    document.querySelector('body').style.color = changeColorInput.value;
    languageBlock.style.color = changeColorInput.value;
    searchInput.style.color = changeColorInput.value;
  });

  recognition.start();
  microfonImg.addEventListener('click', () => { // on/off microfon
    isMicro = !isMicro;
    if (isMicro) {
      recognition.interimResults = true;
      microfonImg.setAttribute('src', 'assets/micro_active.png');
    } else {
      microfonImg.setAttribute('src', 'assets/micrrofon.png');
      recognition.abort();
    }
  });

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    if (isMicro) {
      searchInput.value = transcript;
    }
  });
  recognition.addEventListener('end', recognition.start);


  window.addEventListener('beforeunload', () => {
    localStorage.setItem('degreesFormat', degreesFormat);
    localStorage.setItem('language', language);
  });
}());
