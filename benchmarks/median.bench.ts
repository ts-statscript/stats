import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';
import { writeMarkdownFile, BenchmarkPath, random_nums_array } from './utils';
import { median } from '../src';

const function_name: string = median.name;

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

const benchmarks: BenchmarkEntry[] = [
    {
        name: `${function_name} - simple sort`,
        fn: () => {
            median_simple_sort(random_nums_array);
        }
    },
    {
        name: `${function_name} - optimised`,
        fn: () => {
            median(random_nums_array);
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
${median_simple_sort.toString()}
\`\`\`

Quick select:

\`\`\`typescript
${median.toString()}
\`\`\`

## Results

${tbl}
`;

    const outfile = `${function_name}.bench.md`;
    writeMarkdownFile(outfile, markdown);

    return { name: function_name, path: outfile };
}
