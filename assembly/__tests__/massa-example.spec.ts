import { stringToBytes } from '@massalabs/as-types';
import { constructor, event, name } from '../contracts/main';

describe('Group test', () => {
  test('Testing event', () => {
    expect(event([])).toStrictEqual(10_000_000_000_000);
  });
});
