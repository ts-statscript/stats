/**
 * Calculates the mode value of an array of numbers.
 *
 * Executes a single pass through the array to count the occurrences of each
 *
 * @param x - The input array of numbers.
 * @returns The mode value of the array.
 */
export function mode(x: number[]): number | undefined {
    const len = x.length;
    if (len === 0) return undefined;
    if (len === 1) return x[0];

    const counts = new Map<number, number>();
    let maxCount = 0;
    let modeValue: number | undefined = undefined;

    for (let i = 0; i < len; i++) {
        const value = x[i];
        const count = (counts.get(value) || 0) + 1;
        counts.set(value, count);

        if (count > maxCount) {
            maxCount = count;
            modeValue = value;
        }
    }

    return modeValue;
}
