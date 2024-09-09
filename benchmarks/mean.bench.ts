import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, random_nums_array } from './utils';
import { mean } from '../src';

const function_name: string = mean.name;

export function mean_simple(x: number[], trim: number = 0): number {
    const n = x.length;

    // Handle empty array
    if (n === 0) {
        return NaN;
    }

    // Apply trimming if necessary
    if (trim > 0) {
        // Sort the array
        x.sort((a, b) => a - b);

        // Calculate trimming indices
        const loIndex = Math.floor(n * trim);
        const hiIndex = n - loIndex;

        // Slice the array
        x = x.slice(loIndex, hiIndex);
    }

    // Calculate mean
    const sum = x.reduce((a, b) => a + b, 0);
    return sum / x.length;
}

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple`,
        fn: () => {
            mean_simple(random_nums_array.slice());
        }
    },
    {
        name: `${function_name} - simple; trimmed`,
        fn: () => {
            mean_simple(random_nums_array.slice(), 0.1);
        }
    },
    {
        name: `${function_name} - optimised`,
        fn: () => {
            mean(random_nums_array.slice());
        }
    },
    {
        name: `${function_name} - optimised; trimmed`,
        fn: () => {
            mean(random_nums_array.slice(), 0.1);
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
