# Callbacks & Higher Order Functions (HOFs)

- [Before You start](#before-you-start)
- [From Scratch](#from-scratch)
  - [Question 1: `myForEach`](#question-1-myforeach)
  - [Question 2: `myMap`](#question-2-mymap)
  - [Question 3: `myFind`](#question-3-myfind)
  - [Question 4: `myFilter`](#question-4-myfilter)
  - [Question 5: sortWords](#question-5-sortwords)
  - [Question 6: sortNumbers](#question-6-sortnumbers)
  - [Question 7: sortNumbersBetter](#question-7-sortnumbersbetter)
  - [Question 8: sortUsersByOrder](#question-8-sortusersbyorder)
  - [Question 9: sortUsersByName](#question-9-sortusersbyname)
- [Debug](#debug)
  - [Question 10: myEvery](#question-10-myevery)
  - [Question 11: sortUsersBy](#question-11-sortusersby)
  - [Question 12: the real forEach!](#question-12-the-real-foreach)
- [Next Steps](#next-steps)

## Before You start
Callbacks are an integral part of the JS ecosystem. JS has a ton of built in Higher Order Functions (HOFs) that use callbacks, and you'll learn a bunch of them tomorrow. But tonight, let's try building some of those HOFs ourselves! We want to demystify how JS uses callbacks so when you use them yourself, you'll see there's no magic involved.

> __*Since the challenge is to build from scratch, you can't use the real `array.forEach`, `array.map`, `array.find`, `array.filter` methods on this assignment*__

The test files on this assignment are super important! Since you don't know what callback will be passed into your HOF, you can get a better idea of what you should be doing by reading the tests.

## From Scratch

### Question 1: `myForEach`
Possibly the first HOF everyone uses is `array.forEach`, so lets build our own version! `myForEach` takes two arguments, an array and a callback function. You must pass each value from the given array into the provided callback (try a loop). The callback needs to be invoked by your function! Only pass the value to the callback (no need to pass anything else).

And just like the real `forEach`, `myForEach` should return `undefined` and should not alter the passed in array by default. Your callback's return value should be ignored.

```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie'];
const result = myForEach(myNames, (name) => console.log(`Hi, ${name}!`));
/* That will log */
// Hi, Alice!
// Hi, Bob!
// Hi, Charlie!
// Hi, Debbie!

console.log(result); // undefined
console.log(myNames); // ['Alice', 'Bob', 'Charlie', 'Debbie']
```

### Question 2: `myMap`
The real `array.map` is great for making modified copies of arrays. So our version, `myMap`, should return a new array made of the **return values of the callback on each item**. The callback here *does* need to return something, because each return value gets fed into the new array.
Do not modify the original array!

```js
const myNums = [1, 4, 9, 16];

// Pass a function to map
const myDoubledNums = myMap(myNums, (x) => x * 2);

console.log(myDoubledNums);
// expected output: [2, 8, 18, 32]
console.log(myNums);
// expected output: [1, 4, 9, 16] unaffected!
```

### Question 3: `myFind`
When you want to "find" the first match in an array, `array.find` is the go to. Our `myFind` function takes an array and a callback. Now, this callback is different than the other two so far. It must return a boolean (or truthy/falsy value). You'll need to iterate through the given array, and call the callback on each value of the array. If the callback returns `true`, return the *value itself* from `myFind`. If the callback never returns `true`,then `myFind` returns `undefined`. Do not modify the original array!


```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie', 'Barry'];
const nameHasB = myFind(myNames, (name) => name.includes('B'));
console.log(nameHasB); // 'Bob' not 'Barry' because 'Bob' is first

const nameHasZ = myFind(myNames, (name) => name.includes('Z'));
console.log(nameHasZ); // undefined
```

This is important: the callback returns `true` or `false``, the HOF itself returns a value or undefined, ok?

### Question 4: `myFilter`
Now that you know how to find the first match, let's find them *all*. The real `array.filter` returns a new array made up of all the values from the array that passed the callback's conditional. So our `myFilter` should do the same! It takes an array and a callback, and returns a new array made up of all the values that passed the callback test. If no matches are found, it returns an empty array. Do not modify the original array!

```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie', 'Barry'];
const namesWithB = myFilter(myNames, (name) => name.includes('B'));
console.log(namesWithB); // ['Bob', 'Barry']

const namesWithZ = myFilter(myNames, (name) => name.includes('Z'));
console.log(namesWithZ); // []
```

### Question 5: sortWords
Let's switch it up. Let's work with a built in HOF (`array.sort`) and pass in (or not pass in) the callbacks ourselves!

`sortWords` takes in an array of words and must sort them in ascending order (remember: ascend => start small get big, descending => start big get small). For the purposes of letters, ascending alphabetical means start with "a." You must return the new sorted array.

Do not modify the passed in array! Be careful, is that `.sort`'s default behavior?

```js
const unsortedNames = ['Charlie', 'Debbie', 'Alice', 'Bob'];
const sortedNames = sortWords(unsortedNames);

console.log(sortedNames); // ['Alice', 'Bob', 'Charlie', 'Debbie']
console.log(unsortedNames); // ['Charlie', 'Debbie', 'Alice', 'Bob']
```

### Question 6: sortNumbers
`sortNumbers` takes in an array of numbers and returns an array with the numbers sorted in ascending order. Do not modify the original array!

```js
const unsortedNums = [1, 100, 14, 3, 2, 11];
const sortedNums = sortNumbers(unsortedNums);

console.log(sortedNums); // [1, 2, 3, 11, 14, 100]
console.log(unsortedNums); // [1, 100, 14, 3, 2, 11]
```

### Question 7: sortNumbersBetter
`sortNumbersBetter` is just like the above function, but now we can pass in a second boolean argument, `isDescending`. It will determine if we want to sort in ascending or descending order. If the second argument is `true`, sort descending. If the second argument is `false`, sort ascending (this is the default behavior). Do not modify the original array!

```js
const unsortedNums = [1, 100, 14, 3, 2, 11];
const bigToSmall = sortNumbersBetter(unsortedNums, true);
console.log(bigToSmall); // [100, 14, 11, 3, 2, 1]

const smallToBig = sortNumbersBetter(unsortedNums); // default param
console.log(smallToBig); // [1, 2, 3, 11, 14, 100]
```


### Question 8: sortUsersByOrder
Let's make something a little more interesting. Now instead of sorting primitives, let's sort an array of objects! You will do this a bunch in the real world, often data is more complex than simple primitives can convey. But let's start simple! You'll have to sort an array of users that look like this:

```js
const users = [ { name: 'Alice', order: 1 }, /* .. */ ];
```

You must sort them by the `order` property, always ascending. Do not modify the original array!

```js
const users = [
  { name: 'Alice', order: 1 },
  { name: 'Bob', order: 3 },
  { name: 'Charlie', order: 2 },
  { name: 'Debbie', order: 4 },
];

const sortedUsers = sortUsersByOrder(users);
console.log(sortedUsers);
// [
//   { name: 'Alice', order: 1 },
//   { name: 'Charlie', order: 2 },
//   { name: 'Bob', order: 3 },
//   { name: 'Debbie', order: 4 },
// ]

```

### Question 9: sortUsersByName
And finally, `sortUsersByName`, which uses the same user objects from the previous function, but sorts by the `name` property instead. This is tricky! The default `.sort` behavior does do alphabetical orders, but you're comparing objects! You can't just use the default behavior, you have to use a callback. Keep your wits about you, and remember how `.sort`'s callback actually sorts things (negative, 0, positive). And of course, do not modify the original array!

## Debug
It looks like we're trying to use callbacks in `debug.js`, but haven't done very well. It's your job to read the tests and make each of the tests in `debug.spec.js` pass. The mistakes here are all very small, but *very* common. Make sure you understand what's going on so when you make them for real you can spot them!

### Question 10: myEvery
Alright, it looks like `myEvery` is *supposed* to return `true` if *every* value in the array passes the callback test. Make it so!

### Question 11: sortUsersBy
This function is supposed to properly sort a list of users by whatever sorting function is passed in. It's a more dynamic version of the code we've already written, can you spot the problem?

### Question 12: the real forEach!
This is cool! Looks like the last two functions are using the *real* `forEach` function. We already wrote a simpler version of `forEach` so this should be a small step up! Here are the [forEach docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), make sure you understand the arguments that get passed in by default!

## Next Steps
If you got 100% of tests to pass and gave coherent answers to the short answer questions, you can get a jump start on tomorrows code. We'll be going over the array higher order methods. They're listed below, give them a read.

- [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
