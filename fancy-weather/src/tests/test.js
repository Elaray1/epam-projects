const functionsArr = require('./functionsToTest');

const translateText = functionsArr.translateText;
const getCoordinates = functionsArr.getCoordinates;

describe('Translating', () => {
  test('from english to russian language: ', async () => {
    expect(await translateText('Hello, cat!', 'ru')).toBe('Привет, кот!');
    expect(await translateText('Hello, cat!', 'ru')).toMatchSnapshot();
  });
  test('from english to russian language: ', async () => {
    expect(await translateText('How are you?', 'ru')).toBe('Как ты?');
    expect(await translateText('How are you?', 'ru')).toMatchSnapshot();
  });
  test('from english to belarussian language: ', async () => {
    expect(await translateText('Hello, cat!', 'be')).toBe('Прывітанне, кот!');
    expect(await translateText('Hello, cat!', 'be')).toMatchSnapshot();
  });
  test('from english to belarussian language: ', async () => {
    expect(await translateText('How are you?', 'be')).toBe('Як ты?');
    expect(await translateText('How are you?', 'be')).toMatchSnapshot();
  });
});

describe('Finding the correct city by coordinates of', () => {
  test('Incorrect city: ', async () => {
    expect(await getCoordinates('Lalaland')).toBe(-1);
    expect(await getCoordinates('Lalaland')).toMatchSnapshot();
  });
  test('Minsk: ', async () => {
    expect(await getCoordinates('Minsk')).toBe('27.5619,53.9023');
    expect(await getCoordinates('Minsk')).toMatchSnapshot();
  });
  test('London: ', async () => {
    expect(await getCoordinates('London')).toBe('-0.1277,51.5073');
    expect(await getCoordinates('London')).toMatchSnapshot();
  });
  test('Los Angeles: ', async () => {
    expect(await getCoordinates('Los Angeles')).toBe('-118.2445,34.0549');
    expect(await getCoordinates('Los Angeles')).toMatchSnapshot();
  });
  test('Tokyo: ', async () => {
    expect(await getCoordinates('Tokyo')).toBe('139.759,35.6828');
    expect(await getCoordinates('Tokyo')).toMatchSnapshot();
  });
  test('New York: ', async () => {
    expect(await getCoordinates('New York')).toBe('-73.9867,40.7306');
    expect(await getCoordinates('New York')).toMatchSnapshot();
  });
});
