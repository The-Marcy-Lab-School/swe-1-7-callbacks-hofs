const myEvery = (arr, callback) => {
  for (const value of arr) {
    if (callback) return false;
  }
  return true;
};

const sortUsersBy = (users, sortingFunction) => {
  return [...users].sort(sortingFunction());
};

const logEachName = (names) => {
  return names.forEach(console.log());
};

const logEachUserBio = (users) => {
  return users.forEach(console.log(users.bio));
};

module.exports = {
  myEvery,
  sortUsersBy,
  logEachName,
  logEachUserBio,
};
