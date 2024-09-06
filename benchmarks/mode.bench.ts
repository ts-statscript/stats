import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { mode } from '../src';

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

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: 'mode - simple',
        fn: () => {
            mode_simple(random_nums);
        }
    },
    {
        name: 'mode',
        fn: () => {
            mode(random_nums);
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
# Mode benchmarks

## Algorithms

Simple mode:

\`\`\`typescript
${mode_simple.toString()}
\`\`\`

Optimized mode:

\`\`\`typescript
${mode.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = 'mode.bench.md';
    writeMarkdownFile(outfile, markdown);

    return { name: 'mode', path: outfile };
}
