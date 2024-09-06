import { mode } from '../src';
import { generateRandomNums } from '../benchmarks/utils';

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

function mode_simple(x: number[]): number {
    const counts = new Map<number, number>();
    for (const xi of x) {
        counts.set(xi, (counts.get(xi) || 0) + 1);
    }

    let mode = NaN;
    let maxCount = 0;
    for (const [xi, count] of counts.entries()) {
        if (count > maxCount) {
            mode = xi;
            maxCount = count;
        }
    }

    return mode;
}

const mode_res1 = mode(random_nums);
const mode_res3 = mode_simple(random_nums);

console.log('mode_res1:', mode_res1);
console.log('mode_res3:', mode_res3);
