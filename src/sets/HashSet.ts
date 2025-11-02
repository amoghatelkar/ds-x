/**
 * HashSet Implementation
 *
 * A Set is a collection of unique elements.
 * It uses a HashTable internally to achieve O(1)
 * average time complexity for add, has, and delete.
 */

import HashTable from "../maps/HashTable";

export default class HashSet<T extends string | number> {
  private table: HashTable<T, boolean>;

  constructor(capacity: number = 16) {
    this.table = new HashTable<T, boolean>(capacity);
  }

  /** Adds a new element to the set */
  add(value: T): void {
    this.table.set(value, true);
  }

  /** Checks if the element exists in the set */
  has(value: T): boolean {
    return this.table.has(value);
  }

  /** Removes an element from the set */
  delete(value: T): boolean {
    return this.table.delete(value);
  }

  /** Returns the number of elements in the set */
  size(): number {
    return this.table.size();
  }

  /** Removes all elements from the set */
  clear(): void {
    this.table.clear();
  }

  /** Returns all elements as an array */
  values(): T[] {
    const result: T[] = [];
    // Access private buckets (for simplicity, not best practice)
    // In a real library, we'd have an iterator API
    // @ts-ignore
    for (const bucket of this.table.buckets) {
      for (const [key] of bucket) {
        result.push(key);
      }
    }
    return result;
  }
}