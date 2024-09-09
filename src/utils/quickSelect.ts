/**
 * Performs the QuickSelect algorithm to find the kth smallest element in an array.
 *
 * QuickSelect is an efficient selection algorithm to find the kth smallest element in an unordered list.
 * It is related to the QuickSort sorting algorithm and has an average time complexity of O(n),
 * making it faster than sorting the entire array when only a specific order statistic is needed.
 *
 * Note: This function modifies the input array. If you need to preserve the original array,
 * make a copy before passing it to this function.
 *
 * Use cases:
 * 1. Finding medians without sorting the entire array
 * 2. Calculating percentiles or quartiles efficiently
 * 3. Implementing selection-based algorithms in computer graphics or statistics
 * 4. Efficient trimmed mean calculations
 *
 * @param arr - The input array of numbers
 * @param k - The kth position to select (0-indexed)
 * @param left - The left boundary of the current partition (default: 0)
 * @param right - The right boundary of the current partition (default: arr.length - 1)
 * @param handleNonNums - If true, non-numeric values are ignored and moved to the end of the array
 * @returns The kth smallest element in the array, or NaN if k is out of bounds after handling non-numeric values
 */
export function quickSelect(
    arr: number[],
    k: number,
    left: number = 0,
    right: number = arr.length - 1,
    handleNonNums: boolean = false
): number {
    while (true) {
        if (left === right) return arr[left];
        let pivotIndex = Math.floor((left + right) / 2);
        pivotIndex = partition(arr, left, right, pivotIndex, handleNonNums);

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
 * This function is used by quickSelect to efficiently partition the array.
 * It ensures that:
 * - Elements smaller than the pivot end up to its left
 * - Elements larger than the pivot end up to its right
 *
 * This partitioning is done in-place, which is memory efficient and faster than creating new arrays.
 *
 * @param arr - The input array of numbers
 * @param left - The left boundary of the partition
 * @param right - The right boundary of the partition
 * @param pivotIndex - The index of the chosen pivot element
 * @param handleNonNums - If true, non-numeric values are ignored and moved to the end of the array
 * @returns The new index of the pivot element after partitioning
 */
function partition(
    arr: number[],
    left: number,
    right: number,
    pivotIndex: number,
    handleNonNums: boolean
): number {
    let pivotValue = arr[pivotIndex];
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    let storeIndex = left;
    let nanCount = 0;

    for (let i = left; i < right; i++) {
        if (
            handleNonNums &&
            (typeof arr[i] !== 'number' || Number.isNaN(arr[i]))
        ) {
            [arr[i], arr[right - nanCount - 1]] = [
                arr[right - nanCount - 1],
                arr[i]
            ];
            nanCount++;
            i--; // Recheck the swapped element
        } else if (arr[i] < pivotValue) {
            [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
            storeIndex++;
        }
    }

    [arr[right - nanCount], arr[storeIndex]] = [
        arr[storeIndex],
        arr[right - nanCount]
    ];
    return storeIndex;
}
