const { capitalizedFirstLetter, uppercaseAllLetters } = require("./helper.js");

//UNIT TESTING

describe("Can handle empty string and a single character", () => {
  it("Empty string returns empty string", () => {
    expect(capitalizedFirstLetter("").toBe(""));
  });
  it("Empty string returns empty string", () => {
    expect(uppercaseAllLetters("").toBe(""));
  });
});
