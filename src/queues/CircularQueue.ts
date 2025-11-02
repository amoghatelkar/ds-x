/**
 * Circular Queue (Fixed Size)
 *
 * A circular queue uses a fixed-size array.
 * It efficiently reuses memory by wrapping around
 * when reaching the end of the array.
 */

export default class CircularQueue<T> {
  private items: (T | null)[];
  private capacity: number;
  private front: number;
  private rear: number;
  private count: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }

    this.capacity = capacity;
    this.items = new Array(capacity).fill(null);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }

  /** Adds an element to the rear of the queue */
  enqueue(element: T): void {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }

    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = element;
    this.count++;
  }

  /** Removes and returns the front element from the queue */
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const element = this.items[this.front];
    this.items[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.count--;

    return element;
  }

  /** Returns the front element without removing it */
  peek(): T | null {
    return this.isEmpty() ? null : this.items[this.front];
  }

  /** Returns true if the queue is empty */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /** Returns true if the queue is full */
  isFull(): boolean {
    return this.count === this.capacity;
  }

  /** Returns the number of elements in the queue */
  size(): number {
    return this.count;
  }

  /** Clears all elements from the queue */
  clear(): void {
    this.items.fill(null);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
}