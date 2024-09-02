/**
 * Calculate the mode of an array of numbers
 *
 * @param x - Array of type T
 * @returns The mode of the input array. Returns null if all elements repeat equally.
 *
 * @example
 * mode([1, 2, 3, 4, 5]); // Returns null
 * mode([1, 1, 1, 3, 2, 1, 5, 3]); // Returns 1
 * mode([1, 1]); // Returns 1
 * mode([]); // Returns null
 */
export function mode<T>(x: T[]): T | null {
    const freq: Map<T, number> = new Map();
    let maxFreq = 0;
    // returns null if all elements repeat equally
    let mode: T | null = null;

    // First pass: count the frequency of each item
    for (const item of x) {
        const count = (freq.get(item) || 0) + 1;
        freq.set(item, count);

        // Update the mode if necessary
        if (count > maxFreq) {
            maxFreq = count;
            mode = item;
        }
    }

    return mode;
}
