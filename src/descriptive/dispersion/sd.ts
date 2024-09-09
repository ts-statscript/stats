import { variance } from './variance';

export function sd(x: number[], usePop: boolean = false): number {
    const n = x.length;

    // Handle empty array
    if (n === 0) {
        return NaN;
    }

    // Return the standard deviation
    return Math.sqrt(variance(x, usePop));
}
