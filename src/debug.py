def my_every(values, callback):
    for value in values:
        if callback:
            return False
    return True


def sort_users_by(users, key_func):
    return sorted(users, key=key_func())


def log_each_name(names):
    return list(map(print(), names))


def log_each_user_bio(users):
    return list(map(print(users["bio"]), users))
