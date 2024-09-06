import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { variance } from '../src';

function variance_simple(x: number[], y?: number[]): number {
    const n = x.length;
    if (n === 0) return NaN;

    let sum_x = 0;
    let sum_y = 0;
    for (let i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y ? y[i] : 0;
    }

    const mean_x = sum_x / n;
    const mean_y = sum_y / n;

    let sum_sq_x = 0;
    let sum_sq_y = 0;
    let sum_coproduct = 0;
    for (let i = 0; i < n; i++) {
        const dx = x[i] - mean_x;
        const dy = y ? y[i] - mean_y : 0;
        sum_sq_x += dx * dx;
        sum_sq_y += dy * dy;
        sum_coproduct += dx * dy;
    }

    return (sum_sq_x + sum_sq_y - 2 * sum_coproduct) / n;
}

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);
const random_nums2: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: 'variance',
        fn: () => {
            variance(random_nums);
        }
    },
    {
        name: 'variance - covariance',
        fn: () => {
            variance(random_nums, random_nums2);
        }
    },
    {
        name: 'variance_simple',
        fn: () => {
            variance_simple(random_nums);
        }
    },
    {
        name: 'variance - covariance (simple)',
        fn: () => {
            variance_simple(random_nums, random_nums2);
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

    const markdown = `
# Variance benchmarks

## Algorithms

Simple variance:

\`\`\`typescript
${variance_simple.toString()}
\`\`\`

Optimized variance:

\`\`\`typescript
${variance.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = 'variance.bench.md';
    writeMarkdownFile(outfile, markdown);

    return { name: 'variance', path: outfile };
}
