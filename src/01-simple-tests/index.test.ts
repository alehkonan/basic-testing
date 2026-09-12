import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 1, b: 2, action: Action.Add });

    expect(res).toBe(3);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 9, action: Action.Multiply });

    expect(res).toBe(27);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 100, b: 10, action: Action.Divide });

    expect(res).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate });

    expect(res).toBe(27);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 3, b: 3, action: '%' });

    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: '2', b: '10', action: Action.Add });

    expect(res).toBeNull();
  });
});
