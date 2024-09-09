import fs from 'fs';
import path from 'path';

export const config = {
    outDir: './benchmarks.out',
    benchmarksDir: 'benchmarks',
    get outFile() {
        return path.join(this.outDir, 'benchmarks.md');
    },
    get benchmarksPath() {
        return path.join(this.outDir, this.benchmarksDir);
    }
};

export function ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

export function writeMarkdownFile(filename: string, content: string): void {
    const filePath = path.join(config.benchmarksPath, filename);
    fs.writeFileSync(filePath, content);
}

export interface BenchmarkPath {
    name: string;
    path: string;
}

export function generateRandomNums(n: number): number[] {
    return Array.from({ length: n }, () => Math.random() * 100);
}

export const random_nums_array: number[] = fs
    .readFileSync('./data/random_pos_int.txt', 'utf-8')
    .split('\n')
    .map(Number);
