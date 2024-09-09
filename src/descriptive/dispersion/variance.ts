export function variance(x: number[], usePop: boolean = false): number {
    const n = x.length;
    if (n < 2) return NaN; // Variance is not defined for fewer than two elements

    let sum = 0;
    let sumOfSquares = 0;

    // Unrolled loop for speed optimization
    let i = 0;
    for (; i < n - 3; i += 4) {
        sum += x[i] + x[i + 1] + x[i + 2] + x[i + 3];
        sumOfSquares +=
            x[i] * x[i] +
            x[i + 1] * x[i + 1] +
            x[i + 2] * x[i + 2] +
            x[i + 3] * x[i + 3];
    }
    // Handle remaining elements
    for (; i < n; i++) {
        sum += x[i];
        sumOfSquares += x[i] * x[i];
    }

    const mean = sum / n;
    const divisor = usePop ? n : n - 1;
    return (sumOfSquares - n * mean * mean) / divisor;
}
