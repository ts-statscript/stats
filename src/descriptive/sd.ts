import { variance } from './variance';

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * The standard deviation is the square root of the variance.
 *
 * @param x - The input array of numbers.
 * @returns The standard deviation of the array, or NaN if the array has fewer than 2 elements.
 */
export function sd2(x: number[]): number {
    if (x.length < 2) return NaN;
    const varianceValue = variance(x);
    return Math.sqrt(varianceValue);
}

/**
 * Calculates the standard deviation of a numeric array.
 *
 * @param x - An array of numbers.
 * @param naRm - A boolean indicating whether NA (NaN) values should be removed before computation. Default is false.
 * @param isSample - A boolean indicating whether to calculate the sample standard deviation (n-1 in the denominator) or the population standard deviation (n in the denominator). Default is true.
 * @returns The standard deviation of the input array. Returns NaN if the array is empty or contains only NaN values.
 *
 * @example
 * sd([1, 2, 3, 4, 5]); // Returns 1.5811388300841898 (sample standard deviation)
 * sd([1, 2, 3, 4, 5], false, false); // Returns 1.4142135623730951 (population standard deviation)
 * sd([1, 2, NaN, 4, 5], true); // Returns 1.8257418583505538
 * sd([NaN, NaN], true); // Returns NaN
 *
 * @throws {Error} If the input is not a numeric array.
 */
export function sd(
    x: number[],
    naRm: boolean = false,
    isSample: boolean = true
): number {
    // Check if input is numeric
    if (!x.every((val) => typeof val === 'number')) {
        throw new Error('Argument is not numeric: returning NaN');
    }

    // Remove NaN values if naRm is true
    if (naRm) {
        x = x.filter((val) => !isNaN(val));
    } else if (x.some((val) => isNaN(val))) {
        return NaN;
    }

    const n = x.length;

    // Handle empty array
    if (n === 0) {
        return NaN;
    }

    // Calculate the mean
    const meanValue = x.reduce((acc, val) => acc + val, 0) / n;

    // Calculate the variance
    const variance =
        x.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) /
        (isSample ? n - 1 : n);

    // Return the standard deviation
    return Math.sqrt(variance);
}
