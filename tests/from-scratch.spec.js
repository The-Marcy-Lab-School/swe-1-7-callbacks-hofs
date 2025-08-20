const path = require('path');
const ScoreCounter = require('score-tests');
const {
  logEachValue,
  makePeopleHappy,
  getEvenNumbers,
  doubleEveryNumber,
  convertToBooleans,
  myForEach,
  myMap,
  myFind,
  myFilter,
} = require('../src/from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('logEachValue - logs out each value of the given array with the right string, return nothing', () => {
    const letters = ['a', 'b', 'c'];
    const spy = jest.spyOn(console, 'log');
    const result = logEachValue(letters);
    expect(result).toBeUndefined();

    expect(spy).toHaveBeenNthCalledWith(1, 'Value: a, index: 0.');
    expect(spy).toHaveBeenNthCalledWith(2, 'Value: b, index: 1.');
    expect(spy).toHaveBeenNthCalledWith(3, 'Value: c, index: 2.');

    expect(letters).toEqual(['a', 'b', 'c']);

    const names = ['Zo', 'Maya', 'Carms'];
    const result2 = logEachValue(names);
    expect(result2).toBeUndefined();

    expect(spy).toHaveBeenNthCalledWith(4, 'Value: Zo, index: 0.');
    expect(spy).toHaveBeenNthCalledWith(5, 'Value: Maya, index: 1.');
    expect(spy).toHaveBeenNthCalledWith(6, 'Value: Carms, index: 2.');

    expect(names).toEqual(['Zo', 'Maya', 'Carms']);

    spy.mockRestore();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('makePeopleHappy - sets the isHappy property of each person to true, returns nothing', () => {
    const people = [
      { name: 'Zo', isHappy: false },
      { name: 'Maya', isHappy: false },
      { name: 'Carms', isHappy: false },
    ];

    const result = makePeopleHappy(people);
    expect(result).toBeUndefined();

    expect(people).toEqual([
      { name: 'Zo', isHappy: true },
      { name: 'Maya', isHappy: true },
      { name: 'Carms', isHappy: true },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('getEvenNumbers - returns a new array with only the even numbers from the given array', () => {
    expect(getEvenNumbers([])).toEqual([]);
    expect(getEvenNumbers([1])).toEqual([]);
    expect(getEvenNumbers([1, 0, -3])).toEqual([0]);
    expect(getEvenNumbers([2])).toEqual([2]);
    expect(getEvenNumbers([2, 4, 6])).toEqual([2, 4, 6]);
    expect(getEvenNumbers([2, 4, 6, 8, 10, 11])).toEqual([2, 4, 6, 8, 10]);
    expect(getEvenNumbers([-12, -2, 6, 8, 10, 12])).toEqual([-12, -2, 6, 8, 10, 12]);

    const untouched = [10, 21, 83];
    getEvenNumbers(untouched);
    expect(untouched).toEqual([10, 21, 83]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('doubleEveryNumber - returns a new array with each number doubled', () => {
    expect(doubleEveryNumber([])).toEqual([]);
    expect(doubleEveryNumber([1])).toEqual([2]);
    expect(doubleEveryNumber([1, 0, 3])).toEqual([2, 0, 6]);
    expect(doubleEveryNumber([2, 4, -6])).toEqual([4, 8, -12]);
    expect(doubleEveryNumber([2, -4, 6, 8, 10])).toEqual([4, -8, 12, 16, 20]);

    const untouched = [10, 21, 83];
    doubleEveryNumber(untouched);
    expect(untouched).toEqual([10, 21, 83]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('convertToBooleans - returns a new array with each value converted to a boolean', () => {
    expect(convertToBooleans([])).toEqual([]);
    expect(convertToBooleans([1])).toEqual([true]);
    expect(convertToBooleans([1, 0, -3])).toEqual([true, false, true]);
    expect(convertToBooleans(['', true, NaN, 'Hello', 0]))
      .toEqual([false, true, false, true, false]);
    expect(convertToBooleans([undefined, 0, null, '']))
      .toEqual([false, false, false, false]);
    expect(convertToBooleans([!true, !false, !false, !true]))
      .toEqual([false, true, true, false]);

    const untouched = [10, 21, 83];
    convertToBooleans(untouched);
    expect(untouched).toEqual([10, 21, 83]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myForEach - calls the provided callback on each element of the array', () => {
    const myNums = [1, 2, 3];
    const doubledNums = [];
    const addToDoubledNums = (num) => doubledNums.push(num * 2);
    myForEach(myNums, addToDoubledNums);
    expect(doubledNums).toEqual([2, 4, 6]);

    const names = ['Alice', 'Bob', 'Charlie'];
    const mockFunction = jest.fn();
    myForEach(names, mockFunction);
    expect(mockFunction).toHaveBeenCalledTimes(names.length);
    expect(mockFunction).toHaveBeenCalledWith(names[0]);
    expect(mockFunction).toHaveBeenCalledWith(names[1]);
    expect(mockFunction).toHaveBeenCalledWith(names[2]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myForEach - does not return anything', () => {
    const nums = [1, 2, 3];
    const doubledNums = [];
    const addToDoubledNums = (num) => doubledNums.push(num * 2);
    const result = myForEach(nums, addToDoubledNums);

    expect(result).toBeUndefined();
    expect(doubledNums).toEqual([2, 4, 6]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myForEach - does not mutate the original array by default', () => {
    const nums = [1, 2, 3];
    myForEach(nums, (num) => num / 2);

    expect(nums).toEqual([1, 2, 3]);

    // repeated code to prevent auto pass test
    const doubledNums = [];
    const addToDoubledNums = (num) => doubledNums.push(num * 2);
    const result = myForEach(nums, addToDoubledNums);

    expect(result).toBeUndefined();
    expect(doubledNums).toEqual([2, 4, 6]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myMap - returns a new array with the results of the callbacks return values', () => {
    const nums = [1, 2, 3];
    const doubledNums = myMap(nums, (num) => num * 2);
    expect(doubledNums).toEqual([2, 4, 6]);

    const names = ['Alice', 'Bob', 'Charlie'];
    const nameLengths = myMap(names, (name) => name.length);
    expect(nameLengths).toEqual([5, 3, 7]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myMap - does not mutate the original array', () => {
    const nums = [1, 2, 3];
    const doubled = myMap(nums, (num) => num * 2);

    expect(nums).toEqual([1, 2, 3]);
    expect(doubled).toEqual([2, 4, 6]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myFilter - returns a new array with the elements that make the callback return a truthy value', () => {
    const nums = [10, 20, 30, 50, 100, 300];
    const smallNums = myFilter(nums, (num) => num > 50);
    expect(smallNums).toEqual([100, 300]);

    const names = ['Alice', 'Bob', 'Charlie'];
    const longNames = myFilter(names, (name) => name.length > 5);
    expect(longNames).toEqual(['Charlie']);

    const users = [
      { name: 'Alice', height: 22 },
      { name: 'Bob', height: 32 },
      { name: 'Charlie', height: 28 },
      { name: 'Diana', height: 40 },
    ];

    const tallUsers = myFilter(users, (user) => user.height > 30);
    expect(tallUsers).toEqual([
      { name: 'Bob', height: 32 },
      { name: 'Diana', height: 40 },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myFilter - does not mutate the original array', () => {
    const nums = [1, 2, 3];
    const evens = myFilter(nums, (num) => num % 2 === 0);

    expect(nums).toEqual([1, 2, 3]);
    expect(evens).toEqual([2]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myFind - returns the first element that makes the callback return a truthy value', () => {
    const nums = [1, 2, 3];
    const firstEvenNum = myFind(nums, (num) => num % 2 === 0);
    expect(firstEvenNum).toBe(2);

    const names = ['Alice', 'Bob', 'Charlie'];
    const firstLongName = myFind(names, (name) => name.length > 5);
    expect(firstLongName).toBe('Charlie');

    const users = [
      { name: 'Alice', height: 22 },
      { name: 'Bob', height: 32 },
      { name: 'Charlie', height: 28 },
      { name: 'Diana', height: 40 },
    ];

    const firstTallUser = myFind(users, (user) => user.height > 30);
    expect(firstTallUser).toEqual({ name: 'Bob', height: 32 });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('myFind - returns undefined if no element makes the callback return a truthy value', () => {
    const nums = [1, 3, 5];
    const firstEvenNum = myFind(nums, (num) => num % 2 === 0);
    expect(firstEvenNum).toBeUndefined();

    // repeated to prevent auto pass
    const firstOdd = myFind(nums, (num) => num % 2);
    expect(firstOdd).toBe(1);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
