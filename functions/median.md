[**@ts-statscript/stats**](../README.md) • **Docs**

***

[@ts-statscript/stats](../globals.md) / median

# Function: median()

> **median**(`x`): `number`

Calculates the median of an array of numbers using the QuickSelect algorithm.

How it works:
1. Pick a number from the array as a 'pivot' (usually the middle one).
2. Rearrange the array:
   - Put all numbers smaller than the pivot to its left.
   - Put all numbers larger than the pivot to its right.
   This is called 'partitioning' the array around the pivot.
3. After partitioning, the pivot is in its final sorted position.
4. Check if the pivot is in the middle of the array:
   - If yes, we've found the median.
   - If the pivot is too far left, repeat the process on the right portion.
   - If the pivot is too far right, repeat the process on the left portion.
5. Keep repeating steps 1-4 on smaller and smaller portions of the array
   until we find the middle position.

This method is faster than sorting the entire array because it only
partially sorts the array, focusing on finding the middle position.

## Parameters

• **x**: `number`[]

The input array of numbers.

## Returns

`number`

The median value of the array.

## Defined in

[descriptive/median.ts:24](https://github.com/ts-statscript/stats/blob/ac0440da6cf82b781df938c09882a028b7219470/src/descriptive/median.ts#L24)
