import { mean } from '../src';

describe('mean function', () => {
    // TODO: implement a guard against non-numeric values
    // test('throws if elements are not numbers', () => {
    //     expect(() => mean([1, 2, '3', 4, 5] as any)).toThrow();
    // });

    test('returns NaN for empty arrays', () => {
        expect(mean([])).toBeNaN();
    });

    test('handles arrays with NaN values', () => {
        expect(mean([1, 2, NaN, 4, 5])).toBeNaN();
    });

    test('calculates the arithmetic mean of numeric values', () => {
        expect(mean([1, 2, 3, 4, 5])).toBe(3);
    });

    test('handles arrays with a single element', () => {
        expect(mean([42])).toBe(42);
    });

    test('calculates trimmed mean', () => {
        expect(mean([1, 2, 3, 4, 50], 0.2)).toBe(3);
    });

    test('error when 0 < trim < 0.5', () => {
        expect(() => mean([1, 2, 3], -0.1)).toThrow(
            'Trim must be between 0 and 0.5'
        );

        expect(() => mean([1, 2, 3], 0.6)).toThrow(
            'Trim must be between 0 and 0.5'
        );
    });

    test('handles arrays with very small and very large numbers', () => {
        expect(mean([1e-10, 1e10])).toBe(5e9);
    });

    test('returns the correct result for arrays with positive and negative numbers', () => {
        expect(mean([-10, -5, 0, 5, 10])).toBe(0);
    });
});
