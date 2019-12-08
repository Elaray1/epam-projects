import { getUserLocation } from './asyncFunctions';

window.onload = function () {
  async function getUserData() {
    const city = await getUserLocation();
    return city;
  }

  getUserData();
};
