/**
 * HashTable (Separate Chaining Implementation)
 *
 * A HashTable stores key-value pairs and provides O(1)
 * average time complexity for insertion, lookup, and deletion.
 */

export default class HashTable<K extends string | number, V> {
  private buckets: [K, V][][]; // Array of key-value pair arrays
  private capacity: number;
  private sizeCount: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.sizeCount = 0;
  }

  /** Hash function — converts key to bucket index */
  private hash(key: K): number {
    const strKey = key.toString();
    let hash = 0;
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 31 + strKey.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  /** Inserts or updates a key-value pair */
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // update existing
        return;
      }
    }

    bucket.push([key, value]);
    this.sizeCount++;

    // Resize if load factor > 0.75
    if (this.sizeCount / this.capacity > 0.75) {
      this.resize(this.capacity * 2);
    }
  }

  /** Retrieves a value by key */
  get(key: K): V | undefined {
    const index = this.hash(key);
    for (const [k, v] of this.buckets[index]) {
      if (k === key) return v;
    }
    return undefined;
  }

  /** Checks if a key exists */
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /** Deletes a key-value pair */
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const pos = bucket.findIndex(([k]) => k === key);
    if (pos !== -1) {
      bucket.splice(pos, 1);
      this.sizeCount--;
      return true;
    }
    return false;
  }

  /** Returns total number of key-value pairs */
  size(): number {
    return this.sizeCount;
  }

  /** Removes all key-value pairs */
  clear(): void {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.sizeCount = 0;
  }

  /** Doubles capacity and rehashes existing entries */
  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = Array.from({ length: newCapacity }, () => []);
    this.sizeCount = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}