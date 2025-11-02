/**
 * Stack Data Structure (Array Implementation)
 * 
 * A stack is a Last-In-First-Out (LIFO) data structure.
 * Supports push, pop, peek, and size operations.
 */

export default class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /** Adds an element to the top of the stack */
  push(element: T): void {
    this.items.push(element);
  }

  /** Removes and returns the top element of the stack */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Returns the top element without removing it */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Returns true if the stack is empty */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Returns the number of elements in the stack */
  size(): number {
    return this.items.length;
  }

  /** Clears all elements from the stack */
  clear(): void {
    this.items = [];
  }
}