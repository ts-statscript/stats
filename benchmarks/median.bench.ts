import {
    microbenchmark,
    BenchmarkEntry,
    benchmarkToMarkdown
} from '@ts-statscript/microbenchmark';

import { generateRandomNums } from './utils';
import { variance } from '../src';

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
        name: 'variance; covariance',
        fn: () => {
            variance(random_nums, random_nums2);
        }
    }
];

export default async function benchmark(): Promise<string> {
    const results = await microbenchmark(benchmarks, {
        times: 100,
        warmup: 10,
        unit: 'us'
    });

    return benchmarkToMarkdown(results, '## Variance');
}
