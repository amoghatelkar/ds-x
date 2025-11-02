/**
 * AVL Tree (Self-Balancing Binary Search Tree)
 * Supports insert, delete, search, and inorder traversal.
 */

class AVLNode<T> {
  value: T;
  height: number;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

export default class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.compare = compareFn || ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  contains(value: T): boolean {
    let current = this.root;
    while (current) {
      const cmp = this.compare(value, current.value);
      if (cmp === 0) return true;
      current = cmp < 0 ? current.left : current.right;
    }
    return false;
  }

  inorder(): T[] {
    const result: T[] = [];
    const traverse = (node: AVLNode<T> | null) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (!node) return new AVLNode(value);

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    else return node; // duplicates not allowed

    node.height = 1 + Math.max(this._h(node.left), this._h(node.right));
    return this._balance(node);
  }

  private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._delete(node.left, value);
    else if (cmp > 0) node.right = this._delete(node.right, value);
    else {
      // Node found
      if (!node.left || !node.right) {
        node = node.left ?? node.right;
      } else {
        const successor = this._minValueNode(node.right);
        node.value = successor.value;
        node.right = this._delete(node.right, successor.value);
      }
    }

    if (!node) return null;

    node.height = 1 + Math.max(this._h(node.left), this._h(node.right));
    return this._balance(node);
  }

  private _minValueNode(node: AVLNode<T>): AVLNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _balance(node: AVLNode<T>): AVLNode<T> {
    const balance = this._b(node);

    // LL
    if (balance > 1 && this._b(node.left) >= 0) return this._rotateRight(node);
    // LR
    if (balance > 1 && this._b(node.left) < 0) {
      node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }
    // RR
    if (balance < -1 && this._b(node.right) <= 0) return this._rotateLeft(node);
    // RL
    if (balance < -1 && this._b(node.right) > 0) {
      node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }

    return node;
  }

  private _rotateRight(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = 1 + Math.max(this._h(y.left), this._h(y.right));
    x.height = 1 + Math.max(this._h(x.left), this._h(x.right));
    return x;
  }

  private _rotateLeft(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(this._h(x.left), this._h(x.right));
    y.height = 1 + Math.max(this._h(y.left), this._h(y.right));
    return y;
  }

  private _h(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private _b(node: AVLNode<T> | null): number {
    return node ? this._h(node.left) - this._h(node.right) : 0;
  }
}