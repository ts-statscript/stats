export interface BenchmarkPath {
    name: string;
    path: string;
}

export function generateRandomNums(n: number): number[] {
    return Array.from({ length: n }, () => Math.random() * 100);
}
