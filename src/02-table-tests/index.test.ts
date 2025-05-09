import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -100, b: 3, action: Action.Add, expected: -97 },
  { a: 33, b: 4, action: Action.Add, expected: 37 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 3, b: 3, action: '%', expected: null },
  { a: '10', b: '10', action: Action.Add, expected: null },
  { a: undefined, b: null, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should return correct result of the operation',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
