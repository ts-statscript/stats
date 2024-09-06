import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { sd } from '../src';

const function_name: string = sd.name;

function sd_simple(x: number[]): number {
    if (x.length < 2) return NaN;
    const mean = x.reduce((acc, val) => acc + val, 0) / x.length;
    const sum = x.reduce((acc, val) => acc + (val - mean) ** 2, 0);

    return Math.sqrt(sum / x.length);
}

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple`,
        fn: () => {
            sd_simple(random_nums);
        }
    },
    {
        name: `${function_name} - optimised`,
        fn: () => {
            sd(random_nums);
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
${sd_simple.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${sd.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = `${function_name}.bench.md`;
    writeMarkdownFile(outfile, markdown);

    return { name: function_name, path: outfile };
}
