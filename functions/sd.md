[**@ts-statscript/stats**](../README.md) • **Docs**

***

[@ts-statscript/stats](../globals.md) / sd

# Function: sd()

> **sd**(`x`, `naRm`, `isSample`): `number`

Calculates the standard deviation of a numeric array.

## Parameters

• **x**: `number`[]

An array of numbers.

• **naRm**: `boolean` = `false`

A boolean indicating whether NA (NaN) values should be removed before computation. Default is false.

• **isSample**: `boolean` = `true`

A boolean indicating whether to calculate the sample standard deviation (n-1 in the denominator) or the population standard deviation (n in the denominator). Default is true.

## Returns

`number`

The standard deviation of the input array. Returns NaN if the array is empty or contains only NaN values.

## Example

```ts
sd([1, 2, 3, 4, 5]); // Returns 1.5811388300841898 (sample standard deviation)
sd([1, 2, 3, 4, 5], false, false); // Returns 1.4142135623730951 (population standard deviation)
sd([1, 2, NaN, 4, 5], true); // Returns 1.8257418583505538
sd([NaN, NaN], true); // Returns NaN
```

## Throws

If the input is not a numeric array.

## Defined in

[sd.ts:17](https://github.com/ts-statscript/stats/blob/ac0440da6cf82b781df938c09882a028b7219470/src/sd.ts#L17)
