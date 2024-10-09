const path = require('path');
const ScoreCounter = require('score-tests');
const {
  myEvery,
  sortUsersBy,
  logEachName,
  logEachUserBio,
} = require('../src/debug');

const testSuiteName = 'Debug Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('myEvery - returns true if all values in the array make the callback return a truthy value', () => {
    const oddNums = [1, 3, 5, 7, 9];
    const areAllNumsOdd1 = myEvery(oddNums, (num) => num % 2);
    expect(areAllNumsOdd1).toBe(true);

    const randomNums = [101, 19, 23, 42, 50];
    const areAllNumsOdd2 = myEvery(randomNums, (num) => num % 2);
    expect(areAllNumsOdd2).toBe(false);

    const wordLongerThan4 = (word) => word.length > 4;
    const longWords = ['apple', 'banana', 'orange', 'strawberry'];
    const areAllLongWords1 = myEvery(longWords, wordLongerThan4);
    expect(areAllLongWords1).toBe(true);

    const shortWords = ['a', 'be', 'see', 'd'];
    const areAllLongWords2 = myEvery(shortWords, wordLongerThan4);
    expect(areAllLongWords2).toBe(false);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('sortUsersBy - sorts users by the given sorting function', () => {
    const users = [
      { name: 'Alice', height: 22 },
      { name: 'Bob', height: 32 },
      { name: 'Charlie', height: 28 },
      { name: 'Diana', height: 40 },
    ];

    const usersSortedByAge = sortUsersBy(users, (a, b) => b.height - a.height);
    expect(usersSortedByAge).toEqual([
      { name: 'Diana', height: 40 },
      { name: 'Bob', height: 32 },
      { name: 'Charlie', height: 28 },
      { name: 'Alice', height: 22 },
    ]);

    // original users still unaffected
    expect(users).toEqual([
      { name: 'Alice', height: 22 },
      { name: 'Bob', height: 32 },
      { name: 'Charlie', height: 28 },
      { name: 'Diana', height: 40 },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('logEachName - logs each user to the console', () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana'];

    // remember, this is how Jest lets us check and see if console.log was ever called.
    // we need to "spy" on the method because there's no return value to check against
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    logEachName(names);

    expect(logSpy).toHaveBeenCalledTimes(4);
    // "nthCalledWith" says "on the nth call, the spy was called with these arguments" and then lists them out
    // so on call number 1, we should've called the spy with the first name, the index, and the whole array, see?
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Alice', 0, ['Alice', 'Bob', 'Charlie', 'Diana']);
    expect(logSpy).toHaveBeenNthCalledWith(2, 'Bob', 1, ['Alice', 'Bob', 'Charlie', 'Diana']);
    expect(logSpy).toHaveBeenNthCalledWith(3, 'Charlie', 2, ['Alice', 'Bob', 'Charlie', 'Diana']);
    expect(logSpy).toHaveBeenNthCalledWith(4, 'Diana', 3, ['Alice', 'Bob', 'Charlie', 'Diana']);
    logSpy.mockRestore();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('logEachUserBio - logs each user bio to the console', () => {
    const users = [
      { name: 'Alice', bio: 'Alice is a software engineer' },
      { name: 'Bob', bio: 'Bob is a teacher' },
      { name: 'Charlie', bio: 'Charlie is a student' },
      { name: 'Diana', bio: 'Diana is a doctor' },
    ];

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    logEachUserBio(users);

    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenNthCalledWith(1, 'Alice is a software engineer');
    expect(logSpy).toHaveBeenNthCalledWith(2, 'Bob is a teacher');
    expect(logSpy).toHaveBeenNthCalledWith(3, 'Charlie is a student');
    expect(logSpy).toHaveBeenNthCalledWith(4, 'Diana is a doctor');
    logSpy.mockRestore();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
