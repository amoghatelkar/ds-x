/**
 * LinkedList.ts
 * A simple generic singly linked list implementation.
 * Supports basic operations like append, prepend, delete, find, and traversal.
 */

export class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  /** Returns the number of nodes in the list */
  get length(): number {
    return this.size;
  }

  /** Adds an element at the end of the list */
  append(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  /** Adds an element at the start of the list */
  prepend(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  /** Removes the first node that matches the given value */
  delete(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.size--;
      return true;
    }

    return false;
  }

  /** Finds and returns the first node with the given value */
  find(value: T): Node<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  /** Converts the linked list to an array */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  /** Clears the entire linked list */
  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }
}