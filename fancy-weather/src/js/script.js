import { getUserLocation } from './asyncFunctions';
import { getYearTime, getDayTime } from './timeOfTheYear';

window.onload = function () {
  async function getUserData() {
    const city = await getUserLocation();
    return city;
  }
  console.log(getDayTime());
  getUserData();
};
