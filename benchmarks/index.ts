import fs from 'fs';
import path from 'path';

import bVariance from './variance.bench';
import bMedian from './median.bench';
import { BenchmarkPath } from './utils';

async function benchmarks(): Promise<void> {
    const benchmarks: BenchmarkPath[] = [await bMedian(), await bVariance()];

    let markdown = '# Benchmarks: stats\n\n';

    // concatenate all result tables to one markdown file for output
    benchmarks.forEach((b) => {
        // markdown += tbl + '\n\n';
        markdown += `- [${b.name}](${b.path})\n`;
    });

    markdown += '\n';

    fs.writeFileSync(path.join(process.cwd(), 'benchmarks.md'), markdown);
}

benchmarks();
