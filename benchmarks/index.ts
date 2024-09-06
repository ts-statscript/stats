import { config, BenchmarkPath, ensureDirectoryExists } from './utils';
import fs from 'fs';
import path from 'path';
import bVariance from './variance.bench';
import bMedian from './median.bench';
import bMode from './mode.bench';

async function runBenchmarks(): Promise<void> {
    ensureDirectoryExists(config.outDir);
    ensureDirectoryExists(config.benchmarksPath);

    const benchmarks: BenchmarkPath[] = [
        await bMedian(),
        await bVariance(),
        await bMode()
    ];

    let markdown = '# Benchmarks: stats\n\n';
    benchmarks.forEach((b) => {
        markdown += `- [${b.name}](${path.join(config.benchmarksDir, b.path)})\n`;
    });

    fs.writeFileSync(config.outFile, markdown);
}

runBenchmarks();
