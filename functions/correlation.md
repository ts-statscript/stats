[**@ts-statscript/stats v0.0.1**](../README.md) • **Docs**

***

[@ts-statscript/stats v0.0.1](../globals.md) / correlation

# Function: correlation()

> **correlation**(`x`, `y`): `number`

Computes the Pearson correlation coefficient between two numeric arrays.

Mathematical explanation:

Corr(X,Y) = Cov(X,Y) / (σx * σy)

where Cov(X,Y) is the covariance, and σx and σy are the standard deviations.

This can be computed efficiently as:

Corr(X,Y) = (n * Σxy - Σx * Σy) / sqrt((n * Σx² - (Σx)²) * (n * Σy² - (Σy)²))

This function uses a single-pass algorithm to compute all necessary sums,
making it more efficient for large datasets.

The result is always in the range [-1, 1], where:
1 indicates perfect positive linear correlation
0 indicates no linear correlation
-1 indicates perfect negative linear correlation

## Parameters

• **x**: `number`[]

First input array

• **y**: `number`[]

Second input array

## Returns

`number`

Correlation coefficient or NaN if input is invalid

## Example

```ts
// Compute correlation between two arrays
const result = correlation([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
```

## Defined in

[descriptive/variance.ts:208](https://github.com/ts-statscript/stats/blob/a75c9408d625640867618c02c90e8cbacb3c2fa4/src/descriptive/variance.ts#L208)
