from debug import log_each_name, log_each_user_bio, my_every, sort_users_by

TEST_SUITE_NAME = "Debug Tests"


def printed(capsys):
    return [line for line in capsys.readouterr().out.splitlines() if line.strip()]


def test_my_every():
    """my_every - returns True if every value makes the callback return True"""
    assert my_every([1, 3, 5, 7, 9], lambda num: num % 2) is True
    assert my_every([101, 19, 23, 42, 50], lambda num: num % 2) is False

    longer_than_4 = lambda word: len(word) > 4  # noqa: E731
    assert my_every(["apple", "banana", "orange", "strawberry"], longer_than_4) is True
    assert my_every(["a", "be", "see", "d"], longer_than_4) is False


def test_sort_users_by():
    """sort_users_by - sorts users by the given key function"""
    users = [
        {"name": "Alice", "height": 22},
        {"name": "Bob", "height": 32},
        {"name": "Charlie", "height": 28},
        {"name": "Diana", "height": 40},
    ]

    # negate the height to sort tallest first
    tallest_first = sort_users_by(users, lambda user: -user["height"])
    assert tallest_first == [
        {"name": "Diana", "height": 40},
        {"name": "Bob", "height": 32},
        {"name": "Charlie", "height": 28},
        {"name": "Alice", "height": 22},
    ]

    # the original list is left alone
    assert users == [
        {"name": "Alice", "height": 22},
        {"name": "Bob", "height": 32},
        {"name": "Charlie", "height": 28},
        {"name": "Diana", "height": 40},
    ]


def test_log_each_name(capsys):
    """log_each_name - prints each name"""
    log_each_name(["Alice", "Bob", "Charlie", "Diana"])
    assert printed(capsys) == ["Alice", "Bob", "Charlie", "Diana"]


def test_log_each_user_bio(capsys):
    """log_each_user_bio - prints each user's bio"""
    users = [
        {"name": "Alice", "bio": "Alice is a software engineer"},
        {"name": "Bob", "bio": "Bob is a teacher"},
        {"name": "Charlie", "bio": "Charlie is a student"},
    ]
    log_each_user_bio(users)
    assert printed(capsys) == [
        "Alice is a software engineer",
        "Bob is a teacher",
        "Charlie is a student",
    ]
