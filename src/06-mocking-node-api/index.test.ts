import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const func = jest.fn();

    doStuffByTimeout(func, 1000);

    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback only after timeout', () => {
    const func = jest.fn();

    doStuffByTimeout(func, 1000);
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const func = jest.fn();

    doStuffByInterval(func, 1000);

    expect(jest.getTimerCount()).toBe(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const func = jest.fn();

    doStuffByInterval(func, 1000);
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const func = jest.spyOn(path, 'join');

    readFileAsynchronously('./file.txt');

    expect(func).toHaveBeenCalledWith(__dirname, './file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('./file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve('content'));

    const result = await readFileAsynchronously('./file.txt');

    expect(result).toBe('content');
  });
});
