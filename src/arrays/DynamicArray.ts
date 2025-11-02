/**
 * DynamicArray
 * 
 * A resizable array implementation similar to Java's ArrayList.
 * It automatically grows and shrinks its internal capacity as elements are added or removed.
 * 
 * @typeParam T - The type of elements stored in the array.
 */
export default class DynamicArray<T> {
  private capacity: number;      // Maximum number of elements before resizing
  private length: number;        // Current number of elements in the array
  private data: (T | null)[];    // Underlying storage array

  constructor(initialCapacity = 4) {
    this.capacity = initialCapacity;
    this.length = 0;
    this.data = new Array<T | null>(this.capacity).fill(null);
  }

  /**
   * Resizes the internal array to a new capacity.
   * Copies existing elements to the new storage.
   */
  private resize(newCapacity: number): void {
    const newData = new Array<T | null>(newCapacity).fill(null);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
  }

  /**
   * Adds a new element at the end of the array.
   * Automatically doubles capacity if full.
   */
  push(value: T): void {
    if (this.length === this.capacity) {
      this.resize(this.capacity * 2);
    }
    this.data[this.length] = value;
    this.length++;
  }

  /**
   * Removes and returns the last element from the array.
   * Shrinks capacity if size becomes 1/4th of the total capacity.
   */
  pop(): T | null {
    if (this.length === 0) return null;

    const value = this.data[this.length - 1];
    this.data[this.length - 1] = null;
    this.length--;

    if (this.length > 0 && this.length <= this.capacity / 4) {
      this.resize(Math.floor(this.capacity / 2));
    }

    return value;
  }

  /**
   * Returns the element at a specific index.
   * Returns null if index is out of bounds.
   */
  get(index: number): T | null {
    if (index < 0 || index >= this.length) return null;
    return this.data[index];
  }

  /**
   * Updates the element at a specific index.
   * Throws RangeError if index is invalid.
   */
  set(index: number, value: T): void {
    if (index < 0 || index >= this.length) throw new RangeError("Index out of bounds");
    this.data[index] = value;
  }

  /** Returns the current number of elements in the array. */
  size(): number {
    return this.length;
  }

  /** Returns the current capacity (total allocated space). */
  getCapacity(): number {
    return this.capacity;
  }

  /** Returns a trimmed copy of the array (without null padding). */
  toArray(): (T | null)[] {
    return this.data.slice(0, this.length);
  }
}