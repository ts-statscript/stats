[**@ts-statscript/stats**](../README.md) • **Docs**

***

[@ts-statscript/stats](../globals.md) / variance

# Function: variance()

> **variance**(`x`, `y`?): `number`

Computes the variance of a numeric array or the covariance between two arrays.

Mathematical explanation:

For variance (single array input):
Var(X) = Σ(x - μ)² / (n - 1)
where μ is the sample mean and n is the sample size.

For covariance (two array inputs):
Cov(X,Y) = Σ((x - μx)(y - μy)) / (n - 1)
where μx and μy are the sample means of X and Y respectively.

The function uses a numerically stable one-pass algorithm to compute these values:
1. Compute sums and sum of products
2. Calculate means
3. Use the formula: Σ(xy) - n * μx * μy for the numerator

We use n-1 (Bessel's correction) in the denominator to provide
an unbiased estimator of the population variance/covariance.

## Parameters

• **x**: `number`[]

Input array

• **y?**: `number`[]

Optional second array for covariance calculation

## Returns

`number`

Variance or covariance, or NaN if input is invalid

## Examples

```ts
// Compute variance of an array
const result1 = variance([1, 2, 3, 4, 5]);
```

```ts
// Compute covariance of two arrays
const result2 = variance([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
```

## Defined in

[descriptive/variance.ts:73](https://github.com/ts-statscript/stats/blob/228c1c4008100cbd23aeeceec98691e0698577b0/src/descriptive/variance.ts#L73)
