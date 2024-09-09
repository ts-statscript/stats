export function covariance(
    x: number[],
    y: number[],
    usePop: boolean = false
): number {
    const n = x.length;
    if (n !== y.length) throw new Error('Arrays must have the same length');
    if (n < 2) return NaN; // Covariance is not defined for fewer than two elements

    let sumX = 0,
        sumY = 0,
        sumXY = 0;
    let i = 0;

    // Unrolled loop for speed optimization
    for (; i < n - 3; i += 4) {
        sumX += x[i] + x[i + 1] + x[i + 2] + x[i + 3];
        sumY += y[i] + y[i + 1] + y[i + 2] + y[i + 3];
        sumXY +=
            x[i] * y[i] +
            x[i + 1] * y[i + 1] +
            x[i + 2] * y[i + 2] +
            x[i + 3] * y[i + 3];
    }
    // Handle remaining elements
    for (; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
    }

    const meanX = sumX / n;
    const meanY = sumY / n;
    const divisor = usePop ? n : n - 1;
    return (sumXY - n * meanX * meanY) / divisor;
}
