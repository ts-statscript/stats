/**
 * Calculates the median of an array of numbers using the QuickSelect algorithm.
 *
 * How it works:
 * 1. Pick a number from the array as a 'pivot' (usually the middle one).
 * 2. Rearrange the array:
 *    - Put all numbers smaller than the pivot to its left.
 *    - Put all numbers larger than the pivot to its right.
 *    This is called 'partitioning' the array around the pivot.
 * 3. After partitioning, the pivot is in its final sorted position.
 * 4. Check if the pivot is in the middle of the array:
 *    - If yes, we've found the median.
 *    - If the pivot is too far left, repeat the process on the right portion.
 *    - If the pivot is too far right, repeat the process on the left portion.
 * 5. Keep repeating steps 1-4 on smaller and smaller portions of the array
 *    until we find the middle position.
 *
 * This method is faster than sorting the entire array because it only
 * partially sorts the array, focusing on finding the middle position.
 *
 * @param x - The input array of numbers.
 * @returns The median value of the array.
 */
export function median(x: number[]): number {
    const n = x.length;
    if (n === 0) return NaN;

    // shallow copy
    const x_copy = x.slice();

    function quickSelect(k: number, left: number, right: number): number {
        while (true) {
            if (left === right) return x_copy[left];
            let pivotIndex = Math.floor((left + right) / 2);
            let pivot = x_copy[pivotIndex];

            // Move pivot to end
            [x_copy[pivotIndex], x_copy[right]] = [
                x_copy[right],
                x_copy[pivotIndex]
            ];
            let storeIndex = left;

            for (let i = left; i < right; i++) {
                if (x_copy[i] < pivot) {
                    [x_copy[storeIndex], x_copy[i]] = [
                        x_copy[i],
                        x_copy[storeIndex]
                    ];
                    storeIndex++;
                }
            }

            // Move pivot to its final place
            [x_copy[right], x_copy[storeIndex]] = [
                x_copy[storeIndex],
                x_copy[right]
            ];

            if (storeIndex === k) return x_copy[storeIndex];
            if (k < storeIndex) right = storeIndex - 1;
            else left = storeIndex + 1;
        }
    }

    const half = Math.floor(n / 2);
    if (n % 2 === 1) {
        return quickSelect(half, 0, n - 1);
    } else {
        const left = quickSelect(half - 1, 0, n - 1);
        const right = quickSelect(half, 0, n - 1);
        return (left + right) / 2;
    }
}
