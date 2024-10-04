export type Option<T> = T | undefined | null

export const isSome = <T>(x: T): x is Exclude<T, null | undefined> =>
  x !== null && x !== undefined

export const isNone = <T>(x: T) => !isSome(x)
