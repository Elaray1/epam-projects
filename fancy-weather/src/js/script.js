import { getUserLocation, getWeather, getBgImage } from './asyncFunctions';
import { getYearTime, getDayTime } from './timeOfTheYear';
import { controlBlock } from './controlBlock';
import { weatherForTodayBlock } from './weatherForToday';

window.onload = async function () {
  const contentWarapper = document.querySelector('.content-wrapper');
  contentWarapper.insertAdjacentHTML('afterbegin', controlBlock);
  const refreshBgButton = document.getElementById('refresh-bg');
  const controlBlockDiv = document.querySelector('.control-block');
  controlBlockDiv.insertAdjacentHTML('afterend', weatherForTodayBlock);

  console.log(await getWeather());


  refreshBgButton.addEventListener('click', () => { // creates new background image
    getBgImage();
  });
};
