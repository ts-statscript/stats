import { sum } from '@ts-statscript/base';
import { variance } from './variance';

/**
 * Calculates the arithmetic mean (average) of an array of numbers.
 *
 * @param x - The input array of numbers.
 * @returns The mean value of the array, or NaN if the array is empty.
 */
export function mean(x: number[]): number {
    if (x.length === 0) return NaN;
    // const sum = x.reduce((acc, val) => acc + val, 0);
    const sum_res = sum(x);
    return sum_res / x.length;
}

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * The standard deviation is the square root of the variance.
 *
 * @param x - The input array of numbers.
 * @returns The standard deviation of the array, or NaN if the array has fewer than 2 elements.
 */
export function standardDeviation(x: number[]): number {
    if (x.length < 2) return NaN;
    const varianceValue = variance(x);
    return Math.sqrt(varianceValue);
}
