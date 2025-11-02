/**
 * Queue Data Structure (Array Implementation)
 * 
 * A queue is a First-In-First-Out (FIFO) data structure.
 * Supports enqueue, dequeue, peek, and size operations.
 */

export default class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /** Adds an element to the end of the queue */
  enqueue(element: T): void {
    this.items.push(element);
  }

  /** Removes and returns the element from the front of the queue */
  dequeue(): T | undefined {
    return this.items.shift();
  }

  /** Returns the front element without removing it */
  peek(): T | undefined {
    return this.items[0];
  }

  /** Returns true if the queue is empty */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Returns the number of elements in the queue */
  size(): number {
    return this.items.length;
  }

  /** Clears all elements from the queue */
  clear(): void {
    this.items = [];
  }
}