import { quickSelect } from '../../utils/quickSelect';

/**
 * Calculates the mean of an array of numbers, with an option for trimmed mean.
 *
 * Uses the QuickSelect algorithm to efficiently calculate the trimmed mean.
 *
 * @param x - The input array of numbers
 * @param trim - The fraction of elements to trim from each end (default: 0) must be between 0 and 0.5
 * @param handleNonNums - If true, non-numeric values are ignored. If false, their presence will result in NaN.
 * @returns The mean value
 * @throws {Error} If the input array is empty or trim is invalid
 */
export function mean(
    x: number[],
    trim: number = 0,
    handleNonNums: boolean = false
): number {
    if (trim < 0 || trim >= 0.5) {
        throw new Error('Trim must be between 0 and 0.5');
    }
    const n = x.length;
    if (n === 0) return NaN;
    if (trim === 0 || n < 2) return simpleMean(x, handleNonNums);

    // Create a copy of the input array
    const arr = x.slice();

    const trimCount = Math.floor(n * trim);
    const lowTrim = trimCount;
    const highTrim = n - trimCount;

    // Find lower and upper trim points
    quickSelect(arr, lowTrim, 0, n - 1, handleNonNums);
    quickSelect(arr, highTrim - 1, 0, n - 1, handleNonNums);

    // Calculate mean of non-trimmed elements
    let sum = 0;
    let count = 0;

    for (let i = lowTrim; i < highTrim; i++) {
        if (
            !handleNonNums ||
            (typeof arr[i] === 'number' && !Number.isNaN(arr[i]))
        ) {
            sum += arr[i];
            count++;
        }
    }

    return count > 0 ? sum / count : NaN;
}

/**
 * Calculates the simple mean of an array of numbers.
 *
 * @param x - The input array of numbers
 * @param handleNonNums - If true, non-numeric values are ignored. If false, their presence will result in NaN.
 * @returns The mean value
 * @throws {Error} If the input array is empty or contains only non-numeric values when handleNonNums is true
 */
function simpleMean(x: number[], handleNonNums: boolean): number {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < x.length; i++) {
        if (
            !handleNonNums ||
            (typeof x[i] === 'number' && !Number.isNaN(x[i]))
        ) {
            sum += x[i];
            count++;
        }
    }

    if (count === 0) {
        throw new Error(
            'Cannot calculate mean: no valid numeric values in the array'
        );
    }

    return sum / count;
}
