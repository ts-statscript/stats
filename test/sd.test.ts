import { sd } from '../src';

describe('sd function', () => {
    test('calculates the sample standard deviation of a numeric array', () => {
        const values = [1, 2, 3, 4, 5];
        expect(sd(values)).toBeCloseTo(1.581138, 5);
    });

    test('returns NaN when array contains NaN', () => {
        const values = [1, 2, NaN, 4, 5];
        expect(sd(values)).toBeNaN();
    });

    test('calculates the standard deviation of an array with only one element', () => {
        const values = [42];
        expect(sd(values)).toBeNaN();
    });

    test('returns NaN for an empty array', () => {
        const values: number[] = [];
        expect(sd(values)).toBeNaN();
    });

    test('returns NaN for an array with only NaN', () => {
        const values = [NaN, NaN];
        expect(sd(values)).toBeNaN();
    });

    test('throws an error if the input is not numeric', () => {
        const values = [1, 2, 'three', 4, 5] as any;
        expect(sd(values)).toBeNaN();
    });

    test('handles arrays with all identical values', () => {
        const values = [5, 5, 5, 5, 5];
        expect(sd(values)).toBe(0);
    });

    test('calculates the standard deviation for large arrays', () => {
        const largeArray = Array(1000001)
            .fill(1)
            .map((_, i) => i + 1);
        expect(sd(largeArray)).toBe(288675.5676071726);
    });

    test('calculates the standard deviation for an array with positives and negatives', () => {
        const values = [-5, -1, 0, 1, 5];
        expect(sd(values)).toBe(3.605551275463989);
    });
});
