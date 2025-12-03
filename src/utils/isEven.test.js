const isEven = require("./isEven");

describe("isEven", () => {
  it("returns true if number is even", () => {
    expect(isEven(2)).toBe(true);
  });

  it("returns false if number is odd", () => {
    expect(isEven(3)).toBe(false);
  });

  it("throws an error if the number is not a number", () => {
    expect(() => isEven("hello world")).toThrow(
      "Number must be of type number"
    );
  });
});
