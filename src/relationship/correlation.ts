export function correlation(
    x: number[],
    y: number[],
    usePop: boolean = false
): number {
    const n = x.length;
    if (n !== y.length) throw new Error('Arrays must have the same length');
    if (n < 2) return NaN; // Correlation is not defined for fewer than two elements

    let sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0,
        sumY2 = 0;
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
        sumX2 +=
            x[i] * x[i] +
            x[i + 1] * x[i + 1] +
            x[i + 2] * x[i + 2] +
            x[i + 3] * x[i + 3];
        sumY2 +=
            y[i] * y[i] +
            y[i + 1] * y[i + 1] +
            y[i + 2] * y[i + 2] +
            y[i + 3] * y[i + 3];
    }

    // Handle remaining elements
    for (; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    // Calculate means
    const meanX = sumX / n;
    const meanY = sumY / n;

    // Use appropriate divisor based on population or sample statistics
    const divisor = usePop ? n : n - 1;

    // Calculate covariance and standard deviations
    const covariance = (sumXY - n * meanX * meanY) / divisor;
    const stdDevX = Math.sqrt((sumX2 - n * meanX * meanX) / divisor);
    const stdDevY = Math.sqrt((sumY2 - n * meanY * meanY) / divisor);

    // Calculate correlation
    return covariance / (stdDevX * stdDevY);
}
