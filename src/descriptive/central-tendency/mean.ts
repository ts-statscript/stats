/**
 * This module provides statistical functions implemented in TypeScript,
 * focusing on efficient mean calculation, including trimmed mean.
 */

/**
 * Performs the QuickSelect algorithm to find the kth smallest element in an array.
 *
 * In the context of calculating trimmed means:
 * This function is crucial for efficiently finding the trim points without fully sorting the array.
 * It's called twice in the mean function:
 * 1. To find the lower trim point (kth smallest element where k = number of elements to trim)
 * 2. To find the upper trim point (kth smallest element where k = array length - number of elements to trim)
 *
 * By using QuickSelect, we achieve O(n) average time complexity for finding these trim points,
 * compared to O(n log n) if we were to sort the entire array.
 *
 * How it helps in trimmed mean calculation:
 * - After the first call, all elements smaller than the lower trim point are to its left (effectively trimmed)
 * - After the second call, all elements larger than the upper trim point are to its right (effectively trimmed)
 * - The elements between these points are exactly those needed to calculate the trimmed mean
 *
 * @param arr - The input array of numbers
 * @param k - The kth position to select (0-indexed)
 * @param left - The left boundary of the current partition (default: 0)
 * @param right - The right boundary of the current partition (default: arr.length - 1)
 * @returns The kth smallest element in the array
 */
function quickSelect(
    arr: number[],
    k: number,
    left: number = 0,
    right: number = arr.length - 1
): number {
    while (true) {
        if (left === right) return arr[left];

        let pivotIndex = Math.floor((left + right) / 2);
        pivotIndex = partition(arr, left, right, pivotIndex);

        if (k === pivotIndex) {
            return arr[k];
        } else if (k < pivotIndex) {
            right = pivotIndex - 1;
        } else {
            left = pivotIndex + 1;
        }
    }
}

/**
 * Partitions an array around a pivot element.
 *
 * In trimmed mean calculation:
 * This function is used by quickSelect to efficiently partition the array around the trim points.
 * It ensures that:
 * - Elements smaller than the lower trim point end up to its left
 * - Elements larger than the upper trim point end up to its right
 * - The elements needed for the trimmed mean are between these points
 *
 * This partitioning is done in-place, which is memory efficient and faster than creating new arrays.
 *
 * @param arr - The input array of numbers
 * @param left - The left boundary of the partition
 * @param right - The right boundary of the partition
 * @param pivotIndex - The index of the chosen pivot element
 * @returns The new index of the pivot element after partitioning
 */
function partition(
    arr: number[],
    left: number,
    right: number,
    pivotIndex: number
): number {
    let pivotValue = arr[pivotIndex];
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
            storeIndex++;
        }
    }

    [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]];
    return storeIndex;
}

/**
 * Calculates the mean of an array of numbers, with an option for trimmed mean.
 *
 * The trimmed mean is calculated by removing a fraction of elements from each end of the sorted array.
 *
 * In order to efficiently find the trim points without fully sorting the array, a QuickSelect algorithm around
 * a pivot element is used. This allows for O(n) average time complexity, compared to O(n log n) if the array was sorted.
 *
 * Note: in R if a trim greater than 0.5 is passed then the median is returned; we throw an error instead.
 *
 * @param x - The input array of numbers
 * @param trim - The fraction of elements to trim from each end (default: 0) must be between 0 and 0.5
 * @returns The mean value
 * @throws {Error} If the input array is empty or trim is invalid
 *
 * TODO: make sure this does not affect the original array by reference.
 */
export function mean(x: number[], trim: number = 0): number {
    if (trim < 0 || trim >= 0.5) {
        throw new Error('Trim must be between 0 and 0.5');
    }
    const n = x.length;
    if (n === 0) return NaN;
    if (trim === 0 || n < 2) return simpleMean(x);

    const trimCount = Math.floor(n * trim);
    const lowTrim = trimCount;
    const highTrim = n - trimCount;

    // Find lower and upper trim points
    quickSelect(x, lowTrim);
    quickSelect(x, highTrim - 1);

    // Calculate mean of non-trimmed elements
    let sum = 0;
    let count = 0;

    let i = lowTrim;
    for (; i < highTrim - 3; i += 4) {
        sum += x[i] + x[i + 1] + x[i + 2] + x[i + 3];
        count += 4;
    }
    for (; i < highTrim; i++) {
        sum += x[i];
        count++;
    }

    return sum / count;
}

/**
 * Calculates the simple mean of an array of numbers.
 *
 * @param x - The input array of numbers
 * @returns The mean value
 * @throws {Error} If the input array is empty
 */
function simpleMean(x: number[]): number {
    if (x.length === 0)
        throw new Error('Cannot calculate mean of an empty array');

    let sum = 0;
    let i = 0;
    const n = x.length;

    for (; i < n - 3; i += 4) {
        sum += x[i] + x[i + 1] + x[i + 2] + x[i + 3];
    }
    for (; i < n; i++) {
        sum += x[i];
    }

    return sum / n;
}
