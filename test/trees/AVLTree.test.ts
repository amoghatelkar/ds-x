import AVLTree from "../../src/trees/AVLTree";

describe("AVLTree Deletion", () => {
  let avl: AVLTree<number>;

  beforeEach(() => {
    avl = new AVLTree<number>();
  });

  test("should delete leaf nodes", () => {
    [10, 20, 30].forEach((n) => avl.insert(n));
    avl.delete(10);
    expect(avl.inorder()).toEqual([20, 30]);
  });

  test("should delete nodes with one child", () => {
    [20, 10, 30, 25].forEach((n) => avl.insert(n));
    avl.delete(30);
    expect(avl.inorder()).toEqual([10, 20, 25]);
  });

  test("should delete nodes with two children", () => {
    [50, 30, 70, 20, 40, 60, 80].forEach((n) => avl.insert(n));
    avl.delete(50);
    expect(avl.inorder()).toEqual([20, 30, 40, 60, 70, 80]);
  });

  test("should maintain balance after deletions", () => {
    [10, 20, 30, 40, 50, 25].forEach((n) => avl.insert(n));
    avl.delete(10);
    avl.delete(20);
    avl.delete(30);
    expect(avl.inorder()).toEqual([25, 40, 50]);
  });
});