import { variance } from '../src';

describe('variance function', () => {
    test('calculates the variance of a numeric array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(variance(values)).toBe(2.5);
    });

    // Remove tests for naRm parameter
    test('returns NaN when array contains NaN', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(variance(values)).toBeNaN();
    });

    test('returns NaN for an array with only one element', () => {
        const values = [42];
        expect(variance(values)).toBeNaN();
    });

    test('returns NaN for an empty array', () => {
        const values: number[] = [];
        expect(variance(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values', () => {
        const values = [NaN, NaN];
        expect(variance(values)).toBeNaN();
    });

    test('handles arrays with all identical values', () => {
        const values = [5, 5, 5, 5, 5];
        expect(variance(values)).toBe(0);
    });

    test('calculates the variance for large arrays', () => {
        const largeArray = Array(1000001)
            .fill(1)
            .map((_, i) => i + 1);
        expect(variance(largeArray)).toBeCloseTo(83333333334.5, 10);
    });

    test('calculates the variance for an array with mixed positive and negative numbers', () => {
        const values = [-5, -1, 0, 1, 5];
        expect(variance(values)).toBe(14);
    });
});
