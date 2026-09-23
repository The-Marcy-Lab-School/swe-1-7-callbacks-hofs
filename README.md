# Callbacks and Higher-Order Functions

Practice passing functions to other functions, then build your own versions of
`map`, `filter` and `find`.

**Practicing:** callbacks, higher-order functions, `lambda`

- [AI Use on This Assignment](#ai-use-on-this-assignment)
- [Setup](#setup)
- [Before You Start](#before-you-start)
- [From Scratch](#from-scratch)
  - [Question 1: `log_each_value`](#question-1-log_each_value)
  - [Question 2: `make_people_happy`](#question-2-make_people_happy)
  - [Question 3: `get_even_numbers`](#question-3-get_even_numbers)
  - [Question 4: `double_every_number`](#question-4-double_every_number)
  - [Question 5: `convert_to_booleans`](#question-5-convert_to_booleans)
  - [Question 6: `my_for_each`](#question-6-my_for_each)
  - [Question 7: `my_map`](#question-7-my_map)
  - [Question 8: `my_filter`](#question-8-my_filter)
  - [Question 9: `my_find`](#question-9-my_find)
- [Debug](#debug)
  - [Question 10: `my_every`](#question-10-my_every)
  - [Question 11: `sort_users_by`](#question-11-sort_users_by)
  - [Question 12: `log_each_name`](#question-12-log_each_name)
  - [Question 13: `log_each_user_bio`](#question-13-log_each_user_bio)
- [Resources](#resources)
- [Submitting](#submitting)
- [Good luck!](#good-luck)

## AI Use on This Assignment

Use whichever mode matches where you are with this material. Both are fine,
and most people move between them as a concept clicks.

**Tutor mode.** The AI explains, questions, quizzes, and critiques, and you
write every line you submit. For this assignment that means asking it what the
difference is between `print` and `print()`, or having it quiz you until you
can predict what your own code will do. Ask it a hundred questions — that is
the whole point. What you do not do is ask it for the function. Paste this at
the start of a chat and it will hold for the rest of the conversation:

> You are acting as a tutor. Your job is to explain what this coding question
> is asking, clarify confusing wording, and highlight the relevant concepts I
> need to know — but do not provide the full solution or code that directly
> answers the question. Instead, rephrase the problem in simpler terms,
> identify what is being tested, and suggest what steps or thought processes
> might help. Ask me guiding questions to make sure I am thinking critically.
> Do not write the final function, algorithm, or code implementation.

**Implementer mode.** You write a specification first, the AI writes code from
it, and then you verify that code line by line. For this assignment your spec
must say what each function does with its callback, and whether it returns a
new list or changes the one it was given. If what comes back does more than
you asked for, reject it — over-delivery is a defect, and catching it is part
of the job.

You own every line either way, and you will be asked to explain it.

## Setup

Work in `development/mod-1`. Make a draft branch before you start.

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
git checkout -b draft
```

Run `pytest` for everything, or `pytest -k my_filter` for one question. Scores
land in `scores/scores.json`.

75% of tests passing counts as complete. Submit at that point even if it is
not perfect. Treat submitting as a checkpoint rather than a finish line, and
come back to improve it.

## Before You Start

In Python a function is a value, like a number or a string. You can hand one
to another function, and that is all a **callback** is: a function given to
another function to be called later.

The single most important thing in this whole assignment:

```python
print       # the function itself
print()     # CALLS it right now, and evaluates to None
```

Passing `print` hands over the function. Passing `print()` runs it immediately
and hands over `None`, which is not callable. Every debug question here is a
version of that mistake. Watch for those parentheses.

A **higher-order function** is one that takes a function as an argument, or
returns one. Python has several built in:

```python
list(map(lambda n: n * 2, [1, 2, 3]))      # [2, 4, 6]
list(filter(lambda n: n > 1, [1, 2, 3]))   # [2, 3]
sorted(users, key=lambda u: u["height"])   # sorted by height
```

A `lambda` is a small function written inline, for when a name would be
overkill. Questions 6 to 9 ask you to build your own versions of these, which
is the best way to understand what they are actually doing.

## From Scratch

Write your solutions in `src/from_scratch.py`.

### Question 1: `log_each_value`

Write a function `log_each_value` that takes a list and prints each value
along with its index. It returns nothing and leaves the list alone.

```text
Value: a, index: 0.
Value: b, index: 1.
```

You need the index as well as the value. Look up
[`enumerate()`](https://www.w3schools.com/python/ref_func_enumerate.asp),
which hands you both.

### Question 2: `make_people_happy`

Write a function `make_people_happy` that takes a list of people dictionaries
and sets `is_happy` to `True` on every one. It changes them in place and
returns nothing.

### Question 3: `get_even_numbers`

Write a function `get_even_numbers` that returns a **new** list of only the
even numbers. The original list is untouched.

```python
get_even_numbers([2, 4, 6, 8, 10, 11])   # [2, 4, 6, 8, 10]
```

Careful: `0` is even, and so are negative numbers.

### Question 4: `double_every_number`

Write a function `double_every_number` that returns a **new** list with every
number doubled.

```python
double_every_number([2, -4, 6])   # [4, -8, 12]
```

### Question 5: `convert_to_booleans`

Write a function `convert_to_booleans` that returns a **new** list with every
value converted to `True` or `False`.

```python
convert_to_booleans([1, 0, -3])       # [True, False, True]
convert_to_booleans([None, [], {}])   # [False, False, False]
convert_to_booleans([[0], " "])       # [True, True]
```

Python's **falsy** values are `0`, `0.0`, `""`, `None`, and every empty
collection. Everything else is truthy — including `[0]` and `" "`, which
contain something even though that something is itself falsy. HmmmmMMMMmmm?

### Question 6: `my_for_each`

Write a function `my_for_each` that takes a list and a callback, and calls the
callback on every value. It returns nothing.

```python
doubled = []
my_for_each([1, 2, 3], lambda num: doubled.append(num * 2))
print(doubled)   # [2, 4, 6]
```

This is your own version of a loop that somebody else wrote. Four lines, and
then you understand every HOF you will ever use.

### Question 7: `my_map`

Write a function `my_map` that takes a list and a callback, and returns a
**new** list of whatever the callback returned for each value.

```python
my_map([1, 2, 3], lambda num: num * 2)   # [2, 4, 6]
my_map(["Alice", "Bob"], len)            # [5, 3]
```

Note the second example passes `len` itself, with no parentheses.

### Question 8: `my_filter`

Write a function `my_filter` that takes a list and a callback, and returns a
**new** list of only the values the callback said `True` to.

```python
my_filter([10, 50, 100], lambda n: n > 50)   # [100]
```

### Question 9: `my_find`

Write a function `my_find` that returns the **first** value the callback says
`True` to, or `None` if there is no such value.

```python
my_find([1, 2, 3], lambda num: num % 2 == 0)   # 2
my_find([1, 3, 5], lambda num: num % 2 == 0)   # None
```

Stop as soon as you find one. There is no point checking the rest.

## Debug

Every function in `src/debug.py` is broken, and three of the four break the
same way.

### Question 10: `my_every`

`my_every` should return `True` only if the callback says `True` to every
value. It returns `False` every time.

Look hard at `if callback:`. What is that actually asking about? A function
object is always truthy, so this never checks anything at all.

### Question 11: `sort_users_by`

Oh man. `sort_users_by` should sort a copy of the users with the key function
it was given. It raises a `TypeError` instead.

```python
sort_users_by(users, lambda user: -user["height"])
# TypeError: <lambda>() missing 1 required positional argument
```

The error is telling you exactly what happened: something called the key
function with no arguments. Find where, and stop it.

### Question 12: `log_each_name`

`log_each_name` should print each name. It prints one blank line and then
raises `TypeError: 'NoneType' object is not callable`.

Same mistake as question 11, in a different disguise. What does `print()`
evaluate to, and what is `map` then being handed?

### Question 13: `log_each_user_bio`

`log_each_user_bio` should print each user's `bio`. It has the same callback
problem, plus it reaches for `bio` on the whole list instead of on each user.

Fix both. A `lambda` or a plain loop will do.

## Resources

- [W3Schools: lambda](https://www.w3schools.com/python/python_lambda.asp) —
  short, with examples
- [W3Schools: map()](https://www.w3schools.com/python/ref_func_map.asp) and
  [filter()](https://www.w3schools.com/python/ref_func_filter.asp)
- [Real Python: Lambda Functions](https://realpython.com/python-lambda/) —
  longer, and covers when *not* to use one

## Submitting

```sh
git add -A
git commit -m "your message"
git push
```

Open a pull request to your instructor for feedback.

## Good luck!

Once passing functions around feels normal, a huge amount of Python stops
looking like magic. You got this!
