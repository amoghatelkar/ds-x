import MinHeap from "./MinHeap";

/**
 * MaxHeap Implementation
 * 
 * Extends MinHeap logic by inverting the comparison.
 */
export default class MaxHeap<T> extends MinHeap<T> {
  constructor(compareFn?: (a: T, b: T) => number) {
    super((a, b) => (compareFn ? -compareFn(a, b) : a > b ? -1 : a < b ? 1 : 0));
  }
}