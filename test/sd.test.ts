import { sd } from '../src';

describe('sd function', () => {
    test('calculates the sample standard deviation of a numeric array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(sd(values)).toBeCloseTo(1.5811388300841898, 10);
    });

    test('calculates the population standard deviation of a numeric array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(sd(values, false, false)).toBeCloseTo(1.4142135623730951, 10);
    });

    test('handles arrays with NaN values when naRm is true', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(sd(values, true)).toBeCloseTo(1.8257418583505538, 10);
    });

    test('returns NaN when array contains NaN and naRm is false', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(sd(values)).toBeNaN();
    });

    test('calculates the standard deviation of an array with only one element', () => {
        const values = [42];
        expect(sd(values)).toBeNaN(); // Changed from 0 to NaN
    });

    test('returns NaN for an empty array', () => {
        const values: number[] = [];
        expect(sd(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values when naRm is false', () => {
        const values = [NaN, NaN];
        expect(sd(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN values when naRm is true', () => {
        const values = [NaN, NaN];
        expect(sd(values, true)).toBeNaN();
    });

    test('throws an error if the input is not numeric', () => {
        const values = [1, 2, 'three', 4, 5] as any;
        expect(() => sd(values)).toThrow(
            'Argument is not numeric: returning NaN'
        );
    });

    test('calculates the standard deviation after removing NaN values when naRm is true', () => {
        const values = [3, NaN, 1, NaN, 2];
        expect(sd(values, true)).toBeCloseTo(1, 10);
    });

    test('handles arrays with all identical values', () => {
        const values = [5, 5, 5, 5, 5];
        expect(sd(values)).toBe(0);
    });

    test('calculates the standard deviation for large arrays', () => {
        const largeArray = Array(1000001)
            .fill(1)
            .map((_, i) => i + 1);
        expect(sd(largeArray)).toBeCloseTo(288675.1345948129, 10);
    });

    test('calculates the standard deviation for an array with mixed positive and negative numbers', () => {
        const values = [-5, -1, 0, 1, 5];
        expect(sd(values)).toBeCloseTo(3.7416573867739413, 10);
    });
});
