import { variance } from '../src';

describe('variance function', () => {
    test('calculates the variance of a numeric array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(variance(values)).toBe(2.5);
    });

    test('handles arrays with NaN values when naRm is true', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(variance(values, true)).toBe(3.125);
    });

    test('returns NaN when array contains NaN and naRm is false', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(variance(values)).toBeNaN();
    });

    test('calculates the variance of an array with only one element', () => {
        const values = [42];
        expect(variance(values)).toBe(0);
    });

    test('returns NaN for an empty array', () => {
        const values: number[] = [];
        expect(variance(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values when naRm is false', () => {
        const values = [NaN, NaN];
        expect(variance(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values when naRm is true', () => {
        const values = [NaN, NaN];
        expect(variance(values, true)).toBeNaN();
    });

    test('throws an error if the input is not numeric', () => {
        const values = [1, 2, 'three', 4, 5] as any;
        expect(() => variance(values)).toThrow(
            'Argument is not numeric: returning NaN'
        );
    });

    test('calculates the variance after removing NaN values when naRm is true', () => {
        const values = [3, NaN, 1, NaN, 2];
        expect(variance(values, true)).toBe(1);
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
        expect(variance(values)).toBe(12.5);
    });
});
