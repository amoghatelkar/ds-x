import CircularQueue from "../../src/queues/CircularQueue";

describe("CircularQueue", () => {
  let queue: CircularQueue<number>;

  beforeEach(() => {
    queue = new CircularQueue<number>(3);
  });

  test("should enqueue and dequeue elements correctly", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.isFull()).toBe(true);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(4);
    expect(queue.peek()).toBe(2);
  });

  test("should throw error when enqueueing to a full queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(() => queue.enqueue(4)).toThrow("Queue is full");
  });

  test("should return null when dequeueing from an empty queue", () => {
    expect(queue.dequeue()).toBeNull();
  });

  test("should maintain correct size after operations", () => {
    queue.enqueue(10);
    queue.enqueue(20);
    queue.dequeue();
    queue.enqueue(30);
    expect(queue.size()).toBe(2);
  });

  test("should clear all elements", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });
});