import fs from 'fs';
import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';

import { BenchmarkPath, generateRandomNums } from './utils';
import { median } from '../src';
import path from 'path';

function median_simple_sort(x: number[]): number {
    const n = x.length;
    if (n === 0) return NaN;

    const x_copy = x.slice();
    x_copy.sort((a, b) => a - b);

    const half = Math.floor(n / 2);
    if (n % 2 === 1) {
        return x_copy[half];
    } else {
        return (x_copy[half - 1] + x_copy[half]) / 2;
    }
}

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: 'median - simple sort',
        fn: () => {
            median_simple_sort(random_nums);
        }
    },
    {
        name: 'median',
        fn: () => {
            median(random_nums);
        }
    }
];

export default async function benchmark(): Promise<BenchmarkPath> {
    const results = await microbenchmark(benchmarks, {
        times: 100,
        warmup: 10,
        unit: 'us'
    });

    const tbl = benchmarkToMarkdown(results);

    const mkdn = `
# Median benchmarks\n\n

## Algorithms\n\n

Simple sort:

\`\`\`typescript
function median_simple_sort(x: number[]): number {
    const n = x.length;
    if (n === 0) return NaN;

    const x_copy = x.slice();
    x_copy.sort((a, b) => a - b);

    const half = Math.floor(n / 2);
    if (n % 2 === 1) {
        return x_copy[half];
    } else {
        return (x_copy[half - 1] + x_copy[half]) / 2;
    }
}
\`\`\`

Quick select:

\`\`\`typescript
function median(x: number[]): number {
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
\`\`\`

## Results

${tbl}
`;

    const benchPath = 'benchmarks/median.bench.md';

    fs.writeFileSync(path.join(process.cwd(), benchPath), mkdn);

    return { name: 'median', path: benchPath };
}
