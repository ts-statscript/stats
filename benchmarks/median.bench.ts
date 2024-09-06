import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { median } from '../src';

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

    const markdown = `
# Median benchmarks

## Algorithms

Simple sort:

\`\`\`typescript
${median_simple_sort.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${median.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = 'median.bench.md';
    writeMarkdownFile(outfile, markdown);

    return { name: 'median', path: outfile };
}
