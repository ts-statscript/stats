import { quickSelect } from '../../utils/quickSelect';

/**
 * Calculates the median of an array of numbers using the QuickSelect algorithm.
 *
 * @param x - The input array of numbers.
 * @param handleNonNums - If true, non-numeric values are ignored. If false, their presence will result in NaN.
 * @returns The median value of the array, or NaN if the array is empty or contains only non-numeric values when handleNonNums is true.
 * @throws {TypeError} If the input is not an array.
 */
export function median(x: number[], handleNonNums: boolean = true): number {
    if (!Array.isArray(x)) {
        throw new TypeError('Input must be an array');
    }

    const n = x.length;
    if (n === 0) return NaN;

    // Create a copy of the input array
    const arr = x.slice();

    const half = Math.floor(n / 2);
    if (n % 2 === 1) {
        return quickSelect(arr, half, 0, n - 1, handleNonNums);
    } else {
        const left = quickSelect(arr, half - 1, 0, n - 1, handleNonNums);
        const right = quickSelect(arr, half, 0, n - 1, handleNonNums);
        return (left + right) / 2;
    }
}
