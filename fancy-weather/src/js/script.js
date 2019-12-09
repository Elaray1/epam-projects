import { getUserLocation, getWeather } from './asyncFunctions';
import { getYearTime, getDayTime } from './timeOfTheYear';

window.onload = async function () {


  console.log(await getWeather());
};
