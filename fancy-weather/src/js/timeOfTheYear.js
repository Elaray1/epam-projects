import { getUserTimeZone } from './asyncFunctions';

const weekDaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDaysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const weekDaysBe = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
const weekDaysBeShort = ['Ндз', 'Пнд', 'Аўт', 'Срд', 'Чц', 'Птн', 'Сбт'];
const monthArrBe = ['Стдудзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня', 'Ліпеня', 'Жниўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'];
const timeOfTheYear = {
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

let date = new Date();
// function that return time of the year (f.e. winter)
export const getYearTime = () => {
  const number = new Date().getMonth() + 1;
  return timeOfTheYear[number];
};

export const getDayTime = (hours) => (hours < 6 ? 'night' : hours < 12 ? 'morning' : hours < 18 ? 'day' : hours < 23 ? 'evening' : 'night');

// function that returns current city time. If no arguments -> user's city, else entered city. args[0] -> language, args[1] -> city
export async function getCurrentTime(language, city) {
  let timeZone;
  if (arguments.length < 2) {
    date = new Date();
    timeZone = await getUserTimeZone();
  } else {
    timeZone = await getUserTimeZone(city);
    if (timeZone === 10800) {
      date = new Date(Date.now());
    } else {
      date = new Date(Date.now() - 10800000 + timeZone * 1000);
    }
  }
  if (language === 'be') {
    return `${weekDaysBeShort[date.getDay()]}, ${date.getDate()} ${monthArrBe[date.getMonth()]}, ${date.getHours()}:${date.getMinutes()} `;
  }
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', hour12: false };
  const time = date.toLocaleString(language, options);
  return time;
}

// function that returns future week day
export const getFutureDate = (days, lang) => {
  let weekDays;
  switch (lang) {
    case 'en':
      weekDays = weekDaysEn;
      break;
    case 'ru':
      weekDays = weekDaysRu;
      break;
    case 'be':
      weekDays = weekDaysBe;
      break;
    default:
      throw new Error('Incorrect language');
  }
  let i = date.getDay() + days;
  if (i < weekDays.length) {
    return weekDays[i];
  }
  while (i >= weekDays.length) {
    i -= weekDays.length;
  }
  return weekDays[i];
};
