export const getYearTime = () => { // function that return time if the year (f.e. winter)
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
