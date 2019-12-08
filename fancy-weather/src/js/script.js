import { getUserLocation } from './asyncFunctions';
import { getYearTime } from './timeOfTheYear';

window.onload = function () {
  async function getUserData() {
    const city = await getUserLocation();
    return city;
  }

  getUserData();

  console.log(getYearTime());
};
