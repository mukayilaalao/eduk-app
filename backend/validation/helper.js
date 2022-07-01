// capitalized first letter of user's name
const capitalizedFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

//All uppercase
const uppercaseAllLetters = (str) => {
  return str.toUpperCase();
};

module.exports = {
  capitalizedFirstLetter,
  uppercaseAllLetters,
};
