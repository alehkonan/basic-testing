import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(['1', '2']);

    expect(list).toStrictEqual({
      value: '1',
      next: {
        value: '2',
        next: { next: null, value: null },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(['4', '5', '6']);

    expect(list).toMatchSnapshot();
  });
});
