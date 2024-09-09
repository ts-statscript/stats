import { median } from '../src';

describe('median function', () => {
    // TODO: implement a guard against non-numeric values
    // test('throws if elements are not numbers', () => {
    //     expect(() => median([1, 2, '3', 4, 5] as any)).toThrow();
    // });

    test('returns NaN for empty arrays', () => {
        expect(median([])).toBeNaN();
    });
});
