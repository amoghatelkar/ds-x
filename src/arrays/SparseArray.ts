/**
 * SparseArray
 * 
 * An efficient implementation for large arrays with many empty slots.
 * Internally uses a Map to store only non-empty indices.
 * 
 * @typeParam T - The type of elements stored in the array.
 */
export default class SparseArray<T> {
  private data: Map<number, T>;  // Stores index-value pairs for non-empty elements
  private length: number;        // Logical length of the array

  constructor(length = 0) {
    this.data = new Map<number, T>();
    this.length = length;
  }

  /**
   * Sets a value at a specific index.
   * Expands the logical length if needed.
   * 
   * @throws RangeError - if index is negative.
   */
  set(index: number, value: T): void {
    if (index < 0) throw new RangeError("Negative index not allowed");
    this.data.set(index, value);
    this.length = Math.max(this.length, index + 1);
  }

  /**
   * Retrieves a value at the given index.
   * Returns null if the index is not set.
   */
  get(index: number): T | null {
    return this.data.has(index) ? this.data.get(index)! : null;
  }

  /** Removes the value stored at the given index (if any). */
  delete(index: number): void {
    this.data.delete(index);
  }

  /** Returns the logical length (highest index + 1). */
  size(): number {
    return this.length;
  }

  /** Returns an array of all active indices in the sparse array. */
  keys(): number[] {
    return Array.from(this.data.keys());
  }

  /** Returns all stored values (without indices). */
  values(): T[] {
    return Array.from(this.data.values());
  }

  /** Converts the sparse array into a plain object with numeric keys. */
  toObject(): Record<number, T> {
    const obj: Record<number, T> = {};
    for (const [key, val] of this.data.entries()) {
      obj[key] = val;
    }
    return obj;
  }
}