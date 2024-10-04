/**
 * Merges two objects if the predicate is true.
 * If the predicate is false, the defaultObject will be returned.
 */
export const mergeIf = <T extends object>(
  predicate: boolean,
  defaultObject: T,
  objectToMerge: T
) => (predicate ? { ...defaultObject, ...objectToMerge } : defaultObject)

export type ConditionallyMergedObject<T extends object> = [
  /**
   * If true, the objectToMerge will be merged with the defaultObject.
   * If false, the defaultObject will be returned.
   */
  boolean,
  /**
   * The object to merge with the defaultObject if the predicate is true.
   */
  T
]

/**
 * Merges multiple objects if the predicates are true.
 * If the predicate is false, the defaultObject will be returned.
 */
export const mergeManyIfs = <T extends object>(
  startingObject: T,
  conditionalObjects: ReadonlyArray<ConditionallyMergedObject<T>>
) => ({
  ...conditionalObjects.reduce(
    (acc, [predicate, objectToMerge]) => mergeIf(predicate, acc, objectToMerge),
    startingObject
  )
})
