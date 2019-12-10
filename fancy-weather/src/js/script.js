import { getUserLocation, getWeather, getBgImage } from './asyncFunctions';
import { getYearTime, getDayTime } from './timeOfTheYear';

window.onload = async function () {
  console.log(await getBgImage());
};
