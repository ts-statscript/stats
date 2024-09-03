[**@ts-statscript/stats v0.0.1**](../README.md) • **Docs**

***

[@ts-statscript/stats v0.0.1](../globals.md) / mode

# Function: mode()

> **mode**\<`T`\>(`x`): `T` \| `null`

Calculate the mode of an array of numbers

## Type Parameters

• **T**

## Parameters

• **x**: `T`[]

Array of type T

## Returns

`T` \| `null`

The mode of the input array. Returns null if all elements repeat equally.

## Example

```ts
mode([1, 2, 3, 4, 5]); // Returns null
mode([1, 1, 1, 3, 2, 1, 5, 3]); // Returns 1
mode([1, 1]); // Returns 1
mode([]); // Returns null
```

## Defined in

[descriptive/mode.ts:13](https://github.com/ts-statscript/stats/blob/dceb26cb9061e91eee4cc8c843a1713ba4debe0f/src/descriptive/mode.ts#L13)
