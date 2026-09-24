from from_scratch import (
    convert_to_booleans,
    double_every_number,
    get_even_numbers,
    log_each_value,
    make_people_happy,
    my_filter,
    my_find,
    my_for_each,
    my_map,
)

TEST_SUITE_NAME = "From Scratch Tests"


def printed(capsys):
    return [line for line in capsys.readouterr().out.splitlines() if line.strip()]


def test_log_each_value(capsys):
    """log_each_value - prints each value with its index, returns nothing"""
    letters = ["a", "b", "c"]
    assert log_each_value(letters) is None
    assert printed(capsys) == [
        "Value: a, index: 0.",
        "Value: b, index: 1.",
        "Value: c, index: 2.",
    ]
    assert letters == ["a", "b", "c"]

    names = ["Zo", "Maya", "Carms"]
    assert log_each_value(names) is None
    assert printed(capsys) == [
        "Value: Zo, index: 0.",
        "Value: Maya, index: 1.",
        "Value: Carms, index: 2.",
    ]
    assert names == ["Zo", "Maya", "Carms"]


def test_make_people_happy():
    """make_people_happy - sets is_happy on each person to True, returns nothing"""
    people = [
        {"name": "Zo", "is_happy": False},
        {"name": "Maya", "is_happy": False},
        {"name": "Carms", "is_happy": False},
    ]
    assert make_people_happy(people) is None
    assert people == [
        {"name": "Zo", "is_happy": True},
        {"name": "Maya", "is_happy": True},
        {"name": "Carms", "is_happy": True},
    ]


def test_get_even_numbers():
    """get_even_numbers - returns a new list of only the even numbers"""
    assert get_even_numbers([]) == []
    assert get_even_numbers([1]) == []
    assert get_even_numbers([1, 0, -3]) == [0]
    assert get_even_numbers([2]) == [2]
    assert get_even_numbers([2, 4, 6]) == [2, 4, 6]
    assert get_even_numbers([2, 4, 6, 8, 10, 11]) == [2, 4, 6, 8, 10]
    assert get_even_numbers([-12, -2, 6, 8, 10, 12]) == [-12, -2, 6, 8, 10, 12]

    untouched = [10, 21, 83]
    get_even_numbers(untouched)
    assert untouched == [10, 21, 83]


def test_double_every_number():
    """double_every_number - returns a new list with each number doubled"""
    assert double_every_number([]) == []
    assert double_every_number([1]) == [2]
    assert double_every_number([1, 0, 3]) == [2, 0, 6]
    assert double_every_number([2, 4, -6]) == [4, 8, -12]
    assert double_every_number([2, -4, 6, 8, 10]) == [4, -8, 12, 16, 20]

    untouched = [10, 21, 83]
    double_every_number(untouched)
    assert untouched == [10, 21, 83]


def test_convert_to_booleans():
    """convert_to_booleans - returns a new list with each value as a boolean"""
    assert convert_to_booleans([]) == []
    assert convert_to_booleans([1]) == [True]
    assert convert_to_booleans([1, 0, -3]) == [True, False, True]

    # Python's falsy values: 0, 0.0, "", None, and every empty collection
    assert convert_to_booleans(["", "Hello", 0, 0.0]) == [False, True, False, False]
    assert convert_to_booleans([None, [], {}, ()]) == [False, False, False, False]
    assert convert_to_booleans([[0], {"a": 1}, (0,), " "]) == [True, True, True, True]
    assert convert_to_booleans([not True, not False]) == [False, True]

    untouched = [10, 21, 83]
    convert_to_booleans(untouched)
    assert untouched == [10, 21, 83]


def test_my_for_each_calls_the_callback():
    """my_for_each - calls the provided callback on each element"""
    doubled = []
    my_for_each([1, 2, 3], lambda num: doubled.append(num * 2))
    assert doubled == [2, 4, 6]

    seen = []
    names = ["Alice", "Bob", "Charlie"]
    my_for_each(names, seen.append)
    assert seen == names


def test_my_for_each_returns_nothing():
    """my_for_each - does not return anything"""
    doubled = []
    result = my_for_each([1, 2, 3], lambda num: doubled.append(num * 2))
    assert result is None
    assert doubled == [2, 4, 6]


def test_my_for_each_does_not_mutate():
    """my_for_each - does not mutate the original list by default"""
    nums = [1, 2, 3]
    my_for_each(nums, lambda num: num / 2)
    assert nums == [1, 2, 3]

    # repeated so a do-nothing implementation cannot pass this test
    doubled = []
    result = my_for_each(nums, lambda num: doubled.append(num * 2))
    assert result is None
    assert doubled == [2, 4, 6]


def test_my_map():
    """my_map - returns a new list of the callback's return values"""
    assert my_map([1, 2, 3], lambda num: num * 2) == [2, 4, 6]
    assert my_map(["Alice", "Bob", "Charlie"], len) == [5, 3, 7]


def test_my_map_does_not_mutate():
    """my_map - does not mutate the original list"""
    nums = [1, 2, 3]
    doubled = my_map(nums, lambda num: num * 2)
    assert nums == [1, 2, 3]
    assert doubled == [2, 4, 6]


def test_my_filter():
    """my_filter - returns a new list of the elements the callback keeps"""
    assert my_filter([10, 20, 30, 50, 100, 300], lambda n: n > 50) == [100, 300]
    assert my_filter(["Alice", "Bob", "Charlie"], lambda n: len(n) > 5) == ["Charlie"]

    users = [
        {"name": "Alice", "height": 22},
        {"name": "Bob", "height": 32},
        {"name": "Charlie", "height": 28},
        {"name": "Diana", "height": 40},
    ]
    assert my_filter(users, lambda u: u["height"] > 30) == [
        {"name": "Bob", "height": 32},
        {"name": "Diana", "height": 40},
    ]


def test_my_filter_does_not_mutate():
    """my_filter - does not mutate the original list"""
    nums = [1, 2, 3]
    evens = my_filter(nums, lambda num: num % 2 == 0)
    assert nums == [1, 2, 3]
    assert evens == [2]


def test_my_find():
    """my_find - returns the first element the callback accepts"""
    assert my_find([1, 2, 3], lambda num: num % 2 == 0) == 2
    assert my_find(["Alice", "Bob", "Charlie"], lambda n: len(n) > 5) == "Charlie"

    users = [
        {"name": "Alice", "height": 22},
        {"name": "Bob", "height": 32},
        {"name": "Charlie", "height": 28},
        {"name": "Diana", "height": 40},
    ]
    assert my_find(users, lambda u: u["height"] > 30) == {"name": "Bob", "height": 32}


def test_my_find_returns_none():
    """my_find - returns None if no element makes the callback return True"""
    nums = [1, 3, 5]
    assert my_find(nums, lambda num: num % 2 == 0) is None
    assert my_find([], lambda num: True) is None

    # repeated so always returning None cannot pass this test
    assert my_find(nums, lambda num: num % 2) == 1
