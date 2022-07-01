// capitalized first letter of user's name
const capitalizedFirstLetter = (str) => {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
};

//All uppercase
const uppercaseAllLetters = (str) => {
  return str ? str.toUpperCase() : str;
};

module.exports = {
  capitalizedFirstLetter,
  uppercaseAllLetters,
};
