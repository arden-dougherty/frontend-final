const isEven = function checkIsEven(num) {
  if (typeof num !== "number") throw new Error("Number must be of type number");
  return num % 2 === 0;
};

module.exports = isEven;
