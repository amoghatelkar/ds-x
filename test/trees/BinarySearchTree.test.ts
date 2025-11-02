import { BinarySearchTree } from '../../src/trees/BinarySearchTree';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  test('should insert elements correctly', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    expect(bst.inorder()).toEqual([3, 5, 7]);
  });

  test('should search elements correctly', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    expect(bst.search(5)).toBe(true);
    expect(bst.search(100)).toBe(false);
  });

  test('should delete a leaf node correctly', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.delete(3);
    expect(bst.inorder()).toEqual([5, 7]);
  });

  test('should delete node with one child correctly', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(7);
    bst.delete(5);
    expect(bst.inorder()).toEqual([7, 10]);
  });

  test('should delete node with two children correctly', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(12);
    bst.insert(18);
    bst.delete(15);
    expect(bst.inorder()).toEqual([5, 10, 12, 18]);
  });
});