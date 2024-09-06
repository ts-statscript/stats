import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { mode } from '../src';

const function_name: string = mode.name;

function mode_simple(x: number[]): number {
    if (x.length === 0) return NaN;

    const counts: Map<number, number> = new Map();
    for (const val of x) {
        counts.set(val, (counts.get(val) || 0) + 1);
    }

    let max_count = 0;
    let mode_val = NaN;
    for (const [val, count] of counts) {
        if (count > max_count) {
            max_count = count;
            mode_val = val;
        }
    }

    return mode_val;
}

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple`,
        fn: () => {
            mode_simple(random_nums);
        }
    },
    {
        name: `${function_name} - optimised`,
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
# ${function_name} benchmarks

## Algorithms

Simple sort:

\`\`\`typescript
${mode_simple.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${mode.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = `${function_name}.bench.md`;
    writeMarkdownFile(outfile, markdown);

    return { name: function_name, path: outfile };
}
