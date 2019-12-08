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

export const getDayTime = () => { // function that return time of the day (f.e. morning)
  const hours = new Date().getHours();
  return hours < 6 ? 'night' : hours < 12 ? 'morning' : hours < 18 ? 'day' : hours < 23 ? 'evening' : 'night';
};
