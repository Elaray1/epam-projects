const functionsArr = require('./functionsToTest');

const translateText = functionsArr.translateText;
const getCoordinates = functionsArr.getCoordinates;

describe('Translating the text', () => {
  test('Translating from english to russian language: ', async () => {
    expect(await translateText('Hello, Karen!', 'ru')).toBe('Привет, Карен!');
  });
  test('Translating from english to russian language: ', async () => {
    expect(await translateText('How are you?', 'ru')).toBe('Как ты?');
  });
  test('Translating from english to belarussian language: ', async () => {
    expect(await translateText('Hello, Karen!', 'be')).toBe('Прывітанне, Карэн!');
  });
  test('Translating from english to belarussian language: ', async () => {
    expect(await translateText('How are you?', 'be')).toBe('Як ты?');
  });
});

describe('Finding the correct city', () => {
  test('Incorrect city: ', async () => {
    expect(await getCoordinates('Lalaland')).toBe(-1);
  });
  test('Minsk: ', async () => {
    expect(await getCoordinates('Minsk')).toBe('27.5619,53.9023');
  });
  test('London: ', async () => {
    expect(await getCoordinates('London')).toBe('-0.1277,51.5073');
  });
  test('Los Angeles: ', async () => {
    expect(await getCoordinates('Los Angeles')).toBe('-118.2445,34.0549');
  });
  test('Tokyo: ', async () => {
    expect(await getCoordinates('Tokyo')).toBe('139.759,35.6828');
  });
  test('New York: ', async () => {
    expect(await getCoordinates('New York')).toBe('-73.9867,40.7306');
  });
});
