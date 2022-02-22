const scorefun = require("./components/scorefunction");
//(quote_length, quote_uniq, errors, duration)

//1.TESTING QUOTE LENGTHS
test("QUOTE LENGTH", () => {
  expect(scorefun(80, 20, 0, 40000)).toBe(244);
  expect(scorefun(70, 20, 0, 40000)).toBe(220);
});

//2.TESTING UNIQUE CHARACTERS
test("UNIQUE CHARACTERS", () => {
  expect(scorefun(80, 20, 0, 40000)).toBe(244);
  expect(scorefun(80, 18, 0, 40000)).toBe(239);
});

//3.TESTING ERRORS
test("NUMBER OF ERRORS", () => {
  expect(scorefun(80, 20, 0, 40000)).toBe(244);
  expect(scorefun(80, 20, 6, 40000)).toBe(213);
});

//4.TESTING GAME DURATION

test("TIME DURATION", () => {
  expect(scorefun(80, 20, 0, 40000)).toBe(244);
  expect(scorefun(80, 20, 0, 45000)).toBe(217);
});
