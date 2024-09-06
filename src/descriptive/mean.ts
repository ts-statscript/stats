import { sum } from '@ts-statscript/base';

/**
 * Calculates the arithmetic mean (average) of an array of numbers.
 *
 * This function uses the optimised `sum` function from
 * `@ts-statscript/base` to compute the sum of the input array.
 *
 * @param x - The input array of numbers.
 * @returns The mean value of the array, or NaN if the array is empty.
 */
export function mean(x: number[]): number {
    if (x.length === 0) return NaN;
    const sum_res = sum(x);
    return sum_res / x.length;
}
