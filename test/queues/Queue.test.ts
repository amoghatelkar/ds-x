import Queue from "../../src/queues/Queue";

describe("Queue Data Structure", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test("should enqueue elements correctly", () => {
    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(10);
  });

  test("should dequeue elements in FIFO order", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(1);
  });

  test("should return undefined when dequeuing from an empty queue", () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  test("should correctly identify empty and non-empty queue", () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(100);
    expect(queue.isEmpty()).toBe(false);
  });

  test("should clear the queue", () => {
    queue.enqueue(5);
    queue.enqueue(6);
    queue.clear();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });
});