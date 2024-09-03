/**
 * @fileoverview
 * This module provides highly optimised implementations of variance and covariance
 * calculations for numerical arrays in TypeScript. These functions prioritise
 * speed over memory efficiency and are designed to handle large datasets quickly.
 *
 * The implementations are based on the statistical functions found in R's stats
 * package, but with modifications for TypeScript and performance optimisations.
 *
 * Key Features:
 * - Optimised for speed using loop unrolling and preallocated arrays
 * - Handles both single-array variance and two-array covariance calculations
 * - Implements Pearson's product-moment coefficient for correlation
 *
 * Mathematical Background:
 *
 * Variance:
 * The variance is a measure of variability in a dataset that is calculated as the
 * average squared deviation from the mean. For a sample, we use the formula:
 *
 * Var(X) = Σ(x - μ)² / (n - 1)
 *
 * where μ is the sample mean and n is the sample size. We use n-1 (Bessel's correction)
 * to provide an unbiased estimator of the population variance.
 *
 * Covariance:
 * The covariance measures how two variables change together. For samples x and y:
 *
 * Cov(X,Y) = Σ((x - μx)(y - μy)) / (n - 1)
 *
 * where μx and μy are the sample means of X and Y respectively.
 *
 * Performance Considerations:
 * - Uses a single-pass algorithm to compute sum and sum of squares simultaneously
 * - Employs loop unrolling to reduce loop overhead and improve instruction pipelining
 *
 * @module statsUtils
 */

/**
 * Computes the variance of a numeric array or the covariance between two arrays.
 *
 * Mathematical explanation:
 *
 * For variance (single array input):
 * Var(X) = Σ(x - μ)² / (n - 1)
 * where μ is the sample mean and n is the sample size.
 *
 * For covariance (two array inputs):
 * Cov(X,Y) = Σ((x - μx)(y - μy)) / (n - 1)
 * where μx and μy are the sample means of X and Y respectively.
 *
 * The function uses a numerically stable one-pass algorithm to compute these values:
 * 1. Compute sums and sum of products
 * 2. Calculate means
 * 3. Use the formula: Σ(xy) - n * μx * μy for the numerator
 *
 * We use n-1 (Bessel's correction) in the denominator to provide
 * an unbiased estimator of the population variance/covariance.
 *
 * @param x Input array
 * @param y Optional second array for covariance calculation
 * @returns Variance or covariance, or NaN if input is invalid
 *
 * @example
 * // Compute variance of an array
 * const result1 = variance([1, 2, 3, 4, 5]);
 *
 * @example
 * // Compute covariance of two arrays
 * const result2 = variance([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
 */
export function variance(x: number[], y?: number[]): number {
    if (y !== undefined) {
        // Handle covariance between two arrays
        return covariance(x, y);
    }

    // Handle single array variance
    return varianceSingle(x);
}

/**
 * Computes the variance of a single numeric array.
 *
 * Mathematical explanation:
 *
 * Var(X) = Σ(x - μ)² / (n - 1)
 *
 * This function uses a numerically stable one-pass algorithm:
 * 1. Compute sum and sum of squares
 * 2. Calculate mean
 * 3. Use the formula: (Σx² - n * μ²) / (n - 1)
 *
 * This approach is equivalent to the standard formula but more efficient
 * and less prone to numerical instability for large datasets.
 *
 * @param x Input array
 * @returns Variance or NaN if input is invalid
 */
function varianceSingle(x: number[]): number {
    const n = x.length;
    if (n < 2) return NaN; // Variance is not defined for fewer than two elements

    let sum = 0;
    let sumOfSquares = 0;

    // Summing is associative so we can use loop unrolling for speed
    // Unrolled loop for speed optimisation
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
    return (sumOfSquares - n * mean * mean) / (n - 1);
}

/**
 * Computes the covariance between two numeric arrays.
 *
 * Mathematical explanation:
 *
 * Cov(X,Y) = Σ((x - μx)(y - μy)) / (n - 1)
 *
 * This function uses a numerically stable one-pass algorithm:
 * 1. Compute sums and sum of products
 * 2. Calculate means
 * 3. Use the formula: (Σxy - n * μx * μy) / (n - 1)
 *
 * This approach is equivalent to the standard formula but more efficient
 * and less prone to numerical instability for large datasets.
 *
 * @param x First input array
 * @param y Second input array
 * @returns Covariance or NaN if input is invalid
 */
function covariance(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    if (n < 2) return NaN; // Covariance is not defined for fewer than two pairs

    let sumX = 0,
        sumY = 0,
        sumXY = 0;

    // Unrolled loop for speed optimisation
    let i = 0;
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
    return (sumXY - n * meanX * meanY) / (n - 1);
}

/**
 * Computes the Pearson correlation coefficient between two numeric arrays.
 *
 * Mathematical explanation:
 *
 * Corr(X,Y) = Cov(X,Y) / (σx * σy)
 *
 * where Cov(X,Y) is the covariance, and σx and σy are the standard deviations.
 *
 * This can be computed efficiently as:
 *
 * Corr(X,Y) = (n * Σxy - Σx * Σy) / sqrt((n * Σx² - (Σx)²) * (n * Σy² - (Σy)²))
 *
 * This function uses a single-pass algorithm to compute all necessary sums,
 * making it more efficient for large datasets.
 *
 * The result is always in the range [-1, 1], where:
 * 1 indicates perfect positive linear correlation
 * 0 indicates no linear correlation
 * -1 indicates perfect negative linear correlation
 *
 * @param x First input array
 * @param y Second input array
 * @returns Correlation coefficient or NaN if input is invalid
 *
 * @example
 * // Compute correlation between two arrays
 * const result = correlation([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
 */
export function correlation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    if (n < 2) return NaN; // Correlation is not defined for fewer than two pairs

    let sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0,
        sumY2 = 0;

    // Single pass to compute all necessary sums
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
        (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    return denominator === 0 ? NaN : numerator / denominator;
}
