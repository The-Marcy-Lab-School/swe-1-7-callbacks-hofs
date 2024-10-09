const path = require('path');
const ScoreCounter = require('score-tests');
const {
  myForEach,
  myMap,
  myFind,
  myFilter,

  sortWords,
  sortNumbers,
  sortNumbersBetter,
  sortUsersByOrder,
  sortUsersByName,
} = require('../src/from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
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

  it('sortWords - returns a sorted list of words alphabetically', () => {
    const words1 = ['banana', 'apple', 'orange', 'strawberry'];
    const sortedWords = sortWords(words1);
    expect(sortedWords).toEqual(['apple', 'banana', 'orange', 'strawberry']);

    const words2 = ['b', 'd', 'a', 'c'];
    const sortedLetters = sortWords(words2);
    expect(sortedLetters).toEqual(['a', 'b', 'c', 'd']);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortWords - does not modify the original array', () => {
    const words1 = ['banana', 'apple', 'orange', 'strawberry'];
    sortWords(words1);
    expect(words1).toEqual(['banana', 'apple', 'orange', 'strawberry']);

    const words2 = ['b', 'd', 'a', 'c'];
    const sorted = sortWords(words2);
    expect(words2).toEqual(['b', 'd', 'a', 'c']);
    expect(sorted).toEqual(['a', 'b', 'c', 'd']);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortNumbers - returns a sorted a list of numbers in ascending order', () => {
    const nums1 = [10, 2, 5, 110, 1, 9, 11];
    const sortedNums1 = sortNumbers(nums1);
    expect(sortedNums1).toEqual([1, 2, 5, 9, 10, 11, 110]);

    const nums2 = [100, 50, 10, 5, 1];
    const sortedNums2 = sortNumbers(nums2);
    expect(sortedNums2).toEqual([1, 5, 10, 50, 100]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortNumbersBetter - sorts a list of numbers in ascending order by default', () => {
    const nums1 = [100, 20, 5, 10, 84];
    const sortedNums1 = sortNumbersBetter(nums1);
    expect(sortedNums1).toEqual([5, 10, 20, 84, 100]);

    const nums2 = [21, 82, 19, 10000, 12];
    const sortedNums2 = sortNumbersBetter(nums2);
    expect(sortedNums2).toEqual([12, 19, 21, 82, 10000]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortNumbersBetter - sorts a list of numbers in descending order if specified', () => {
    const nums1 = [100, 20, 5, 10, 84];
    const sortedNums1 = sortNumbersBetter(nums1, true);
    expect(sortedNums1).toEqual([100, 84, 20, 10, 5]);

    const nums2 = [21, 82, 19, 10000, 12];
    const sortedNums2 = sortNumbersBetter(nums2, true);
    expect(sortedNums2).toEqual([10000, 82, 21, 19, 12]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortUsersByOrder - sorts a list of users by "order" property', () => {
    const users = [
      { name: 'Alice', order: 2 },
      { name: 'Bob', order: 4 },
      { name: 'Charlie', order: 1 },
      { name: 'Diana', order: 3 },
    ];

    const usersSortedByOrder = sortUsersByOrder(users);
    expect(usersSortedByOrder).toEqual([
      { name: 'Charlie', order: 1 },
      { name: 'Alice', order: 2 },
      { name: 'Diana', order: 3 },
      { name: 'Bob', order: 4 },
    ]);

    // original users still unaffected
    expect(users).toEqual([
      { name: 'Alice', order: 2 },
      { name: 'Bob', order: 4 },
      { name: 'Charlie', order: 1 },
      { name: 'Diana', order: 3 },
    ]);

    const users2 = [{ name: 'Jason', order: 2 }];
    const usersSortedByOrder2 = sortUsersByOrder(users2);
    expect(usersSortedByOrder2).toEqual([{ name: 'Jason', order: 2 }]);

    const users3 = [{ name: 'Sara', order: 100 }];
    const usersSortedByOrder3 = sortUsersByOrder(users3);
    expect(usersSortedByOrder3).toEqual([{ name: 'Sara', order: 100 }]);

    const users4 = [];
    const usersSortedByOrder4 = sortUsersByOrder(users4);
    expect(usersSortedByOrder4).toEqual([]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortUsersByName - sorts a list of users by name', () => {
    const users = [
      { name: 'Alice', order: 22 },
      { name: 'Charlie', order: 28 },
      { name: 'Diana', order: 40 },
      { name: 'Bob', order: 32 },
    ];

    const usersSortedByName = sortUsersByName(users);
    expect(usersSortedByName).toEqual([
      { name: 'Alice', order: 22 },
      { name: 'Bob', order: 32 },
      { name: 'Charlie', order: 28 },
      { name: 'Diana', order: 40 },
    ]);

    // original users still unaffected
    expect(users).toEqual([
      { name: 'Alice', order: 22 },
      { name: 'Charlie', order: 28 },
      { name: 'Diana', order: 40 },
      { name: 'Bob', order: 32 },
    ]);

    const users2 = [{ name: 'Jason', order: 2 }];
    const usersSortedByName2 = sortUsersByName(users2);
    expect(usersSortedByName2).toEqual([{ name: 'Jason', order: 2 }]);

    const users3 = [{ name: 'Sara', order: 2 }, { name: 'sara', order: 1 }];
    const usersSortedByName3 = sortUsersByName(users3);
    expect(usersSortedByName3).toEqual([
      { name: 'Sara', order: 2 },
      { name: 'sara', order: 1 },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
