import { getUserTimeZone } from './asyncFunctions';

export const getYearTime = () => { // function that return time of the year (f.e. winter)
  const timeOfTheYearObj = {
    1: 'winter',
    2: 'winter',
    3: 'spring',
    4: 'spring',
    5: 'spring',
    6: 'summer',
    7: 'summer',
    8: 'summer',
    9: 'autumn',
    10: 'autumn',
    11: 'autumn',
    12: 'winter',
  };
  const number = new Date().getMonth() + 1;
  return timeOfTheYearObj[number];
};

export const getDayTime = (hours) => (hours < 6 ? 'night' : hours < 12 ? 'morning' : hours < 18 ? 'day' : hours < 23 ? 'evening' : 'night');

export async function getCurrentTime(lang) { // function that returns current city time
  const timeZone = await getUserTimeZone();
  const currentTime = new Date();
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', hour12: false, timeZone };
  const time = currentTime.toLocaleString(lang, options);
  return time;
}

export const getFutureDate = (days) => { // function that returns future week day
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let i = new Date().getDay() + days;
  if (i < weekDays.length) {
    return weekDays[i];
  }
  while (i >= weekDays.length) {
    i -= weekDays.length;
  }
  return weekDays[i];
};
