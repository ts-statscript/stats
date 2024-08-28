/**
 * Calculates the variance of a numeric array.
 *
 * @param x - A numeric vector or array.
 * @param naRm - A boolean indicating whether NA (NaN) values should be removed before computation. Default is false.
 * @returns The variance of the input array. Returns NaN if the array is empty or contains only NaN values.
 *
 * @example
 * var([1, 2, 3, 4, 5]); // Returns 2.5
 * var([1, 2, NaN, 4, 5], true); // Returns 3.125
 * var([NaN, NaN], true); // Returns NaN
 *
 * @throws {Error} If the input is not a numeric array.
 */
export function variance(x: number[], naRm: boolean = false): number {
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
    const varianceValue =
        x.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0) / (n - 1);

    return varianceValue;
}
