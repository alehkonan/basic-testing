import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.useFakeTimers();

describe('throttledGetDataFromApi', () => {
  let mockGetFn: jest.Mock;

  beforeEach(() => {
    mockGetFn = jest.fn().mockResolvedValue({ data: 'data' });
    const mockAxiosInstance = { get: mockGetFn } as unknown as AxiosInstance;
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance);

    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/example');
    jest.advanceTimersByTime(THROTTLE_TIME);
    await Promise.resolve();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi('/example');
    jest.advanceTimersByTime(THROTTLE_TIME);
    await Promise.resolve();

    expect(mockGetFn).toHaveBeenCalledWith('/example');
  });

  test('should return response data', async () => {
    const promise = throttledGetDataFromApi('/example');
    jest.advanceTimersByTime(THROTTLE_TIME);
    const data = await promise;

    expect(data).toBe('data');
  });
});
