import { variance } from './variance';

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * The standard deviation is the square root of the variance.
 *
 * @param x - The input array of numbers.
 * @returns The standard deviation of the array, or NaN if the array has fewer than 2 elements.
 */
export function sd(x: number[]): number {
    if (x.length < 2) return NaN;
    const varianceValue = variance(x);
    return Math.sqrt(varianceValue);
}
