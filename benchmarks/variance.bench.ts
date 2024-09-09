import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, random_nums_array } from './utils';
import { variance } from '../src';

const function_name: string = variance.name;

function varaince_simple(x: number[]): number {
    if (x.length === 0) return NaN;

    const mean = x.reduce((acc, val) => acc + val, 0) / x.length;
    const sum = x.reduce((acc, val) => acc + (val - mean) ** 2, 0);

    return sum / x.length;
}

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple`,
        fn: () => {
            varaince_simple(random_nums_array);
        }
    },
    {
        name: `${function_name} - optimised`,
        fn: () => {
            variance(random_nums_array);
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
${varaince_simple.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${variance.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = `${function_name}.bench.md`;
    writeMarkdownFile(outfile, markdown);

    return { name: function_name, path: outfile };
}
