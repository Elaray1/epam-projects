import { getUserTimeZone } from './asyncFunctions';

let date = new Date();
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

export async function getCurrentTime(...args) { // function that returns current city time
  let timeZone;
  if (args.length < 2) {
    date = new Date();
    timeZone = await getUserTimeZone();
  } else {
    timeZone = await getUserTimeZone(args[1]);
    if (timeZone === 10800) {
      date = new Date(Date.now());
    } else {
      date = new Date(Date.now() - 10800000 + timeZone * 1000);
    }
  }
  if (args[0] === 'be') {
    const weekDays = ['Ндз', 'Пнд', 'Аўт', 'Срд', 'Чц', 'Птн', 'Сбт'];
    const monthArr = ['Стдудзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня', 'Ліпеня', 'Жниўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'];
    return `${weekDays[date.getDay()]}, ${date.getDate()} ${monthArr[date.getMonth()]}, ${date.getHours()}:${date.getMinutes()} `;
  }
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', hour12: false };
  const time = date.toLocaleString(args[0], options);
  return time;
}

export const getFutureDate = (days, lang) => { // function that returns future week day
  let weekDays;
  switch (lang) {
    case 'en':
      weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      break;
    case 'ru':
      weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      break;
    case 'be':
      weekDays = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
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
