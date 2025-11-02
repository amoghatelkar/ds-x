/**
 * MinHeap Implementation
 * 
 * Maintains the smallest element at the top.
 * Supports insert, extractMin, peek, and size.
 */
export default class MinHeap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compareFn || ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /** Returns the size of the heap */
  size(): number {
    return this.heap.length;
  }

  /** Returns the smallest element without removing it */
  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /** Inserts a new element and restores heap order */
  insert(value: T): void {
    this.heap.push(value);
    this._heapifyUp(this.heap.length - 1);
  }

  /** Removes and returns the smallest element */
  extractMin(): T | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this._heapifyDown(0);
    return min;
  }

  /** Heapify up (used in insert) */
  private _heapifyUp(index: number): void {
    let parent = Math.floor((index - 1) / 2);
    while (index > 0 && this.compare(this.heap[index], this.heap[parent]) < 0) {
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  /** Heapify down (used in extractMin) */
  private _heapifyDown(index: number): void {
    const length = this.heap.length;
    let smallest = index;

    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
      smallest = left;
    }

    if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this._heapifyDown(smallest);
    }
  }
}