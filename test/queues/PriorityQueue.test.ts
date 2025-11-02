import PriorityQueue from "../../src/queues/PriorityQueue";

describe("PriorityQueue", () => {
  test("should enqueue and dequeue elements in priority order (min-heap)", () => {
    const pq = new PriorityQueue<number>(true);
    pq.enqueue(10, 3);
    pq.enqueue(20, 1);
    pq.enqueue(30, 2);

    expect(pq.dequeue()).toBe(20);
    expect(pq.dequeue()).toBe(30);
    expect(pq.dequeue()).toBe(10);
  });

  test("should enqueue and dequeue elements in reverse priority order (max-heap)", () => {
    const pq = new PriorityQueue<string>(false);
    pq.enqueue("low", 1);
    pq.enqueue("medium", 5);
    pq.enqueue("high", 10);

    expect(pq.dequeue()).toBe("high");
    expect(pq.dequeue()).toBe("medium");
    expect(pq.dequeue()).toBe("low");
  });

  test("should return undefined when dequeueing from an empty queue", () => {
    const pq = new PriorityQueue<number>();
    expect(pq.dequeue()).toBeUndefined();
  });

  test("should correctly peek at the highest priority element", () => {
    const pq = new PriorityQueue<number>(true);
    pq.enqueue(5, 10);
    pq.enqueue(6, 2);
    expect(pq.peek()).toBe(6);
  });

  test("should report correct size", () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(1, 10);
    pq.enqueue(2, 5);
    expect(pq.size()).toBe(2);
    pq.dequeue();
    expect(pq.size()).toBe(1);
  });
});