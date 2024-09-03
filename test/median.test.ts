import { median } from '../src';

describe('median function', () => {
    test('calculates the median of an odd-length array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(median(values)).toBe(3);
    });

    test('calculates the median of an even-length array', () => {
        const values = [1, 2, 3, 4, 5, 6];
        expect(median(values)).toBe(3.5);
    });

    // Remove tests for naRm parameter
    test('returns NaN when array contains NaN', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(median(values)).toBeNaN();
    });

    test('calculates the median of an array with only one element', () => {
        const values = [42];
        expect(median(values)).toBe(42);
    });

    test('returns NaN for an empty array', () => {
        const values: number[] = [];
        expect(median(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values', () => {
        const values = [NaN, NaN];
        expect(median(values)).toBeNaN();
    });

    test('handles arrays with all identical values', () => {
        const values = [5, 5, 5, 5, 5];
        expect(median(values)).toBe(5);
    });

    test('calculates the median for large arrays', () => {
        const largeArray = Array(1000001)
            .fill(1)
            .map((_, i) => i + 1);
        expect(median(largeArray)).toBe(500001);
    });

    test('calculates the median for an array with mixed positive and negative numbers', () => {
        const values = [-5, -1, 0, 1, 5];
        expect(median(values)).toBe(0);
    });
});
