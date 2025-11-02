import MinHeap from "../../../src/trees/Heap/MinHeap";
import MaxHeap from "../../../src/trees/Heap/MaxHeap";

describe("MinHeap", () => {
  test("should insert and maintain heap order", () => {
    const heap = new MinHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    expect(heap.peek()).toBe(1);
  });

  test("should extract elements in ascending order", () => {
    const heap = new MinHeap<number>();
    [5, 3, 8, 1].forEach((n) => heap.insert(n));
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(3);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(8);
  });

  test("should return null on empty heap extraction", () => {
    const heap = new MinHeap<number>();
    expect(heap.extractMin()).toBeNull();
  });
});

describe("MaxHeap", () => {
  test("should return max element", () => {
    const heap = new MaxHeap<number>();
    [1, 5, 3, 8].forEach((n) => heap.insert(n));
    expect(heap.peek()).toBe(8);
  });

  test("should extract elements in descending order", () => {
    const heap = new MaxHeap<number>();
    [1, 5, 3, 8].forEach((n) => heap.insert(n));
    expect(heap.extractMin()).toBe(8);
    expect(heap.extractMin()).toBe(5);
    expect(heap.extractMin()).toBe(3);
    expect(heap.extractMin()).toBe(1);
  });
});