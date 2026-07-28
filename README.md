# Callbacks & Higher Order Functions (HOFs)

- [Reminders](#reminders)
  - [Asking ChatGPT for Help](#asking-chatgpt-for-help)
  - [Be Okay With Being "Provisionally Complete"](#be-okay-with-being-provisionally-complete)
- [Setup](#setup)
- [Before You start](#before-you-start)
- [From Scratch Questions](#from-scratch-questions)
  - [Question 1: logEachValue — forEach](#question-1-logeachvalue--foreach)
  - [Question 2: makePeopleHappy — forEach](#question-2-makepeoplehappy--foreach)
  - [Question 3: getEvenNumbers — filter](#question-3-getevennumbers--filter)
  - [Question 4: doubleEveryNumber — map](#question-4-doubleeverynumber--map)
  - [Question 5: convertToBooleans — map](#question-5-converttobooleans--map)
  - [Question 6: `myForEach`](#question-6-myforeach)
  - [Question 7: `myMap`](#question-7-mymap)
  - [Question 8: `myFilter`](#question-8-myfilter)
  - [Question 9: `myFind`](#question-9-myfind)
- [Debug Questions](#debug-questions)
  - [Question 10: myEvery](#question-10-myevery)
  - [Question 11: sortUsersBy](#question-11-sortusersby)
  - [Question 12: the real forEach!](#question-12-the-real-foreach)

## Reminders

### Asking ChatGPT for Help

If you’re stuck, you may use ChatGPT to clarify the assignment — but not to solve it for you. To do this, copy the meta-prompt below into ChatGPT along with the assignment question.

> You are acting as a tutor. Your job is to explain what this coding question is asking, clarify confusing wording, and highlight the relevant concepts students need to know — but do not provide the full solution or code that directly answers the question. Instead, focus on rephrasing the problem in simpler terms, identifying what’s being tested, and suggesting what steps or thought processes might help. Ask guiding questions to ensure the student is thinking critically. Do not write the final function, algorithm, or code implementation.

Be mindful of your AI usage on assignments. AI can be a great tool to help your learning but it can also be detrimental if you let it do too much of the thinking for you.

### Be Okay With Being "Provisionally Complete"

At Marcy, we will deem an assignment as "complete" if the solution passes at least **75%** of the automated tests. 

However, we know many of you will feel the urge to hold off on submitting until your assignment feels 100% perfect. That drive for excellence is an asset!

But perfectionism can also get in the way of learning — especially when we need to cover a lot in a short amount of time.

That’s why we encourage you to be comfortable with being **“provisionally complete.”** This means:

- Submitting your work even if it isn’t perfect yet
- Treating submission as a checkpoint, not a finish line
- Committing to return, revise, and improve later

Learning to move forward with provisional completeness will help you make steady progress while still building the habit of continuous improvement.

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

Here are some useful commands to remember.

```sh
npm i                   # install dependencies
git checkout -b draft   # switch to the draft branch before starting

npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

## From Scratch Questions

These first questions involve making callbacks for higher-order functions.

### Question 1: logEachValue — forEach
Given an array of values, you must print each value next to it's index in a single string like: `Value: [VALUE], index: [INDEX].`

`forEach` is the best choice here because we want to execute a side-effect (printing) for every single value in the array

**Usage Example:**  
```js
logEachValue(["a", "b", "c"]);
// Console output:
// Value: a, index: 0
// Value: b, index: 1
// Value: c, index: 2
```

### Question 2: makePeopleHappy — forEach
Given an array of people objects, mutate it so that each object has their `isHappy` property set to `true`. return nothing.

`forEach` is the best choice here because we DO want to mutate each value in the original array. If we were to use `map`, the original array would remain unchanged. 

Remember, `forEach` is best when we want a side effect to occur for every value in the array.

**Usage Example:**  
```js
const people = [
  { name: "Alice", isHappy: false },
  { name: "Bob", isHappy: false }
];

makePeopleHappy(people);

console.log(people);
// → [
//   { name: "Alice", isHappy: true },
//   { name: "Bob", isHappy: true }
// ]
```

### Question 3: getEvenNumbers — filter
Given an array of numbers, return a new array of only the even numbers from the array.

`filter` is the best choice here because we want to return all of the values in the array that match a particular criteria.

**Usage Example:**  
```js
getEvenNumbers([1, 2, 3, 4, 5, 6]);
// → [2, 4, 6]
```

### Question 4: doubleEveryNumber — map
Given an array of numbers, return a _new_ array where every element is doubled.

Do not modify the original array.

`map` is the best choice here because we want to return a new array containing a changed version of every value in the original array.

**Usage Example:**  
```js
doubleEveryNumber([1, 2, 3]);
// → [2, 4, 6]
```


### Question 5: convertToBooleans — map
Given an array of values, return a new array where each value is converted to a boolean. That means that if the value is truthy, the new value should be `true` and if the value is falsy, the new value should be `false`.

Do not modify the original array.

`map` is again the best choice here because we want to return a new array containing a changed version of every value in the original array.

**Usage Example:**  
```js
convertToBooleans([0, 1, "", "hello", null]);
// → [false, true, false, true, false]
```

### Question 6: `myForEach`

The next set of questions involve re-creating popular higher-order array functions from scratch.

Possibly the first HOF everyone uses is `array.forEach`, so lets build our own version! 

Write a function called `myForEach` that takes two arguments, an `array` and a `callback` function. It should:
* Iterate through the provided `array`. On each iteration:
  * Invoke the `callback` with the value at the current index as the only argument
* Do not return anything (or manually return `undefined`)

**Usage Example**  

```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie'];
const result = myForEach(myNames, (name) => {
  console.log(`Hi, ${name}!`)
});
/* That will log */
// Hi, Alice!
// Hi, Bob!
// Hi, Charlie!
// Hi, Debbie!

console.log(result); // undefined
console.log(myNames); // ['Alice', 'Bob', 'Charlie', 'Debbie']
```

### Question 7: `myMap`
The real `array.map` is great for making modified copies of arrays. It applies a callback function that transforms every value in an array and creates an array of the newly transformed values.

Write a function called `myMap` that takes in two arguments: an `array` and a `transform` callback function. It should
* Create a new array to return.
* Iterate through the input `array`. On each iteration:
  * Invoke `transform()` with the value at the current index as the only argument
  * Take the value returned by `transform()` and add it to the new array
* Return the new array containing all of the transformed values.

Do not modify the original array!

**Usage Example**

```js
const myNums = [1, 4, 9, 16];

// Pass a function to map
const myDoubledNums = myMap(myNums, (x) => x * 2);

console.log(myDoubledNums);
// expected output: [2, 8, 18, 32]
console.log(myNums);
// expected output: [1, 4, 9, 16] unaffected!
```

### Question 8: `myFilter`

While `array.find` is used to get the first value that passes a `test` callback, `array.filter` is used to get an array of ALL values that pass the `test`callback.

Write a function called `myFilter` that takes in two arguments: an `array` and a `test` callback function. It should
* Create a new array to return.
* Iterate through the input `array`. On each iteration:
  * Invoke `test()` with the value at the current index as the only argument
  * If the value returned by `test()` is truthy, **add the array value at the current index to the new array**.
  * Otherwise, do nothing and continue on to the next value in the array.
* Return the new array containing all values that passed the test.

**Usage Example**

```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie', 'Barry'];
const namesWithB = myFilter(myNames, (name) => name.includes('B'));
console.log(namesWithB); // ['Bob', 'Barry']

const namesWithZ = myFilter(myNames, (name) => name.includes('Z'));
console.log(nameHasZ); // []
```

### Question 9: `myFind`
When you want to "find" a value in an array, `array.find` is the go to. `array.find` uses a callback to test each value in the array and return the first value that passes the test. 

Write a function called `myFind` that takes in two arguments: an `array` and a `test` callback function. It should
* Iterate through the input `array`. On each iteration:
  * Invoke `test()` with the value at the current index as the only argument
  * If the value returned by `test()` is truthy, **return the array value at the current index**
  * Otherwise, do nothing and continue on to the next value in the array.

**Usage Example**

```js
const myNames = ['Alice', 'Bob', 'Charlie', 'Debbie', 'Barry'];
const nameHasB = myFind(myNames, (name) => name.includes('B'));
console.log(nameHasB); // 'Bob' not 'Barry' because 'Bob' is first

const nameHasZ = myFind(myNames, (name) => name.includes('Z'));
console.log(nameHasZ); // undefined
```

This is important: the callback returns `true` or `false``, the HOF itself returns a value or undefined, ok?

## Debug Questions
It looks like we're trying to use callbacks in `debug.js`, but haven't done very well. It's your job to read the tests and make each of the tests in `debug.spec.js` pass. The mistakes here are all very small, but *very* common. Make sure you understand what's going on so when you make them for real you can spot them!

### Question 10: myEvery
Alright, it looks like `myEvery` is *supposed* to return `true` if *every* value in the array passes the callback test. Make it so!

### Question 11: sortUsersBy
This function is supposed to properly sort a list of users by whatever sorting function is passed in. It's a more dynamic version of the code we've already written, can you spot the problem?

### Question 12: the real forEach!
This is cool! Looks like the last two functions are using the *real* `forEach` function. We already wrote a simpler version of `forEach` so this should be a small step up! Here are the [forEach docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), make sure you understand the arguments that get passed in by default!
