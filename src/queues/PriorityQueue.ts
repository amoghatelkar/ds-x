/**
 * Priority Queue using Binary Heap
 *
 * A priority queue stores elements with priorities.
 * The element with the highest (or lowest) priority
 * is always dequeued first.
 *
 * This implementation supports both min-heap and max-heap modes.
 */

export default class PriorityQueue<T> {
  private heap: { value: T; priority: number }[];
  private isMinHeap: boolean;

  constructor(isMinHeap: boolean = true) {
    this.heap = [];
    this.isMinHeap = isMinHeap;
  }

  /** Returns true if the queue is empty */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Returns the number of elements in the queue */
  size(): number {
    return this.heap.length;
  }

  /** Adds an element with a given priority */
  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp();
  }

  /** Removes and returns the element with the highest/lowest priority */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return root.value;
  }

  /** Returns the element with the highest/lowest priority without removing it */
  peek(): T | undefined {
    return this.heap[0]?.value;
  }

  /** Internal helper to compare priorities */
  private compare(a: number, b: number): boolean {
    return this.isMinHeap ? a < b : a > b;
  }

  /** Moves the last element up to its correct position */
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[parent].priority, this.heap[index].priority))
        break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  /** Moves the root element down to its correct position */
  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let swapIndex = index;

      if (
        left < length &&
        !this.compare(this.heap[swapIndex].priority, this.heap[left].priority)
      ) {
        swapIndex = left;
      }

      if (
        right < length &&
        !this.compare(this.heap[swapIndex].priority, this.heap[right].priority)
      ) {
        swapIndex = right;
      }

      if (swapIndex === index) break;
      [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
      index = swapIndex;
    }
  }
}