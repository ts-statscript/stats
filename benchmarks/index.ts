import fs from 'fs';
import path from 'path';

import bVariance from './variance';

async function benchmarks(): Promise<void> {
    const mdTables: string[] = [await bVariance()];

    let markdown = '# Stats package benchmarks\n\n';

    // concatenate all result tables to one markdown file for output
    mdTables.forEach((tbl) => {
        markdown += tbl + '\n\n';
    });

    markdown += '\n';

    fs.writeFileSync(path.join(process.cwd(), 'docs/benchmarks.md'), markdown);
}

benchmarks();
