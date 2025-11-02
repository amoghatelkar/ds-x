/**
 * DoubleLinkedList.ts
 * A generic double linked list implementation.
 * Supports efficient insertions, deletions, and traversal in both directions.
 */

export class DoubleNode<T> {
  value: T;
  next: DoubleNode<T> | null = null;
  prev: DoubleNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoubleLinkedList<T> {
  private head: DoubleNode<T> | null = null;
  private tail: DoubleNode<T> | null = null;
  private size: number = 0;

  /** Returns the number of elements in the list */
  get length(): number {
    return this.size;
  }

  /** Adds a new element to the end of the list */
  append(value: T): void {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  /** Adds a new element to the start of the list */
  prepend(value: T): void {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  /** Deletes the first node that matches the given value */
  delete(value: T): boolean {
    if (!this.head) return false;

    // if deleting the head
    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      this.size--;
      return true;
    }

    let current = this.head.next;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        if (current === this.tail) this.tail = current.prev;
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /** Finds and returns the first node with the given value */
  find(value: T): DoubleNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  /** Converts the list to an array (forward order) */
  toArrayForward(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  /** Converts the list to an array (reverse order) */
  toArrayBackward(): T[] {
    const arr: T[] = [];
    let current = this.tail;
    while (current) {
      arr.push(current.value);
      current = current.prev;
    }
    return arr;
  }

  /** Clears the entire list */
  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }
}