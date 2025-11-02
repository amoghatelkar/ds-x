/**
 * Binary Search Tree Implementation
 * ---------------------------------
 * Supports insert, search, delete, and traversal operations.
 */

class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (!node) return new BSTNode(value);
    if (value < node.value) node.left = this.insertNode(node.left, value);
    else if (value > node.value) node.right = this.insertNode(node.right, value);
    return node;
  }

  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: BSTNode<T> | null, value: T): boolean {
    if (!node) return false;
    if (node.value === value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    else return this.searchNode(node.right, value);
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: Get inorder successor
      node.value = this.minValue(node.right);
      node.right = this.deleteNode(node.right, node.value);
    }
    return node;
  }

  private minValue(node: BSTNode<T>): T {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  inorder(): T[] {
    const result: T[] = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  private inorderTraversal(node: BSTNode<T> | null, result: T[]): void {
    if (!node) return;
    this.inorderTraversal(node.left, result);
    result.push(node.value);
    this.inorderTraversal(node.right, result);
  }
}