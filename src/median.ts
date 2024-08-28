/**
 * Calculates the median of a numeric array.
 *
 * @param x - An array of numbers.
 * @param naRm - A boolean indicating whether NA (NaN) values should be removed before computation. Default is false.
 * @returns The median of the input array. Returns NaN if the array is empty or contains only NaN values.
 *
 * @example
 * median([1, 2, 3, 4, 5]); // Returns 3
 * median([1, 2, 3, 4, 5, NaN], true); // Returns 3
 * median([1, NaN, 2, NaN, 3], true); // Returns 2
 * median([NaN, NaN], true); // Returns NaN
 *
 * @throws {Error} If the input is not a numeric array.
 */
export function median(x: number[], naRm: boolean = false): number {
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

    // Sort the array
    x.sort((a, b) => a - b);

    // Calculate the median
    const half = Math.floor(n / 2);

    if (n % 2 === 1) {
        // Odd number of elements
        return x[half];
    } else {
        // Even number of elements
        return (x[half - 1] + x[half]) / 2;
    }
}
