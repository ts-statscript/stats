import { quickSelect } from '../../utils/quickSelect';

/**
 * Calculates the mean of an array of numbers, with an option for trimmed mean.
 *
 * Uses the QuickSelect algorithm to efficiently calculate the trimmed mean.
 * Employs loop unrolling for maximum performance.
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

    // Calculate mean of non-trimmed elements using unrolled loop
    let sum = 0;
    let count = 0;

    let i = lowTrim;
    for (; i <= highTrim - 4; i += 4) {
        const v0 = arr[i];
        const v1 = arr[i + 1];
        const v2 = arr[i + 2];
        const v3 = arr[i + 3];

        if (!handleNonNums) {
            sum += v0 + v1 + v2 + v3;
            count += 4;
        } else {
            if (typeof v0 === 'number' && !Number.isNaN(v0)) {
                sum += v0;
                count++;
            }
            if (typeof v1 === 'number' && !Number.isNaN(v1)) {
                sum += v1;
                count++;
            }
            if (typeof v2 === 'number' && !Number.isNaN(v2)) {
                sum += v2;
                count++;
            }
            if (typeof v3 === 'number' && !Number.isNaN(v3)) {
                sum += v3;
                count++;
            }
        }
    }

    for (; i < highTrim; i++) {
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
 * Uses loop unrolling for maximum performance in all cases.
 *
 * @param x - The input array of numbers
 * @param handleNonNums - If true, non-numeric values are ignored. If false, their presence will result in NaN.
 * @returns The mean value
 * @throws {Error} If the input array is empty or contains only non-numeric values when handleNonNums is true
 */
function simpleMean(x: number[], handleNonNums: boolean): number {
    let sum = 0;
    let count = 0;

    let i = 0;
    for (; i <= x.length - 4; i += 4) {
        const v0 = x[i];
        const v1 = x[i + 1];
        const v2 = x[i + 2];
        const v3 = x[i + 3];

        if (!handleNonNums) {
            sum += v0 + v1 + v2 + v3;
            count += 4;
        } else {
            if (typeof v0 === 'number' && !Number.isNaN(v0)) {
                sum += v0;
                count++;
            }
            if (typeof v1 === 'number' && !Number.isNaN(v1)) {
                sum += v1;
                count++;
            }
            if (typeof v2 === 'number' && !Number.isNaN(v2)) {
                sum += v2;
                count++;
            }
            if (typeof v3 === 'number' && !Number.isNaN(v3)) {
                sum += v3;
                count++;
            }
        }
    }

    // Handle remaining elements
    for (; i < x.length; i++) {
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
