import { config, BenchmarkPath, ensureDirectoryExists } from './utils';
import fs from 'fs';
import path from 'path';

import bMedian from './median.bench';
import bMode from './mode.bench';
import bSd from './sd.bench';
import bVariance from './variance.bench';

async function runBenchmarks(): Promise<void> {
    ensureDirectoryExists(config.outDir);
    ensureDirectoryExists(config.benchmarksPath);

    const benchmarks: BenchmarkPath[] = [
        await bMedian(),
        await bMode(),
        await bSd(),
        await bVariance()
    ];

    let markdown = '# Benchmarks: stats\n\n';
    benchmarks.forEach((b) => {
        markdown += `- [${b.name}](${path.join(config.benchmarksDir, b.path)})\n`;
    });

    fs.writeFileSync(config.outFile, markdown);
}

runBenchmarks();
