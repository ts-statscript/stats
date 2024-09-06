import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, generateRandomNums } from './utils';
import { mean } from '../src';

const function_name: string = mean.name;

function mean_simple(x: number[]): number {
    if (x.length === 0) return NaN;
    const sum = x.reduce((acc, val) => acc + val, 0);
    return sum / x.length;
}

const n: number = 100_000;
const random_nums: number[] = generateRandomNums(n);

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple`,
        fn: () => {
            mean_simple(random_nums);
        }
    },
    {
        name: `${function_name} - optimised`,
        fn: () => {
            mean(random_nums);
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
${mean_simple.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${mean.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = `${function_name}.bench.md`;
    writeMarkdownFile(outfile, markdown);

    return { name: function_name, path: outfile };
}
