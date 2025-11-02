import DynamicArray from "../../src/arrays/DynamicArray";

describe("DynamicArray", () => {
  let arr: DynamicArray<number>;

  beforeEach(() => {
    arr = new DynamicArray<number>(2);
  });

  it("should start empty", () => {
    expect(arr.size()).toBe(0);
    expect(arr.toArray()).toEqual([]);
  });

  it("should add elements and resize dynamically", () => {
    arr.push(10);
    arr.push(20);
    expect(arr.size()).toBe(2);
    expect(arr.getCapacity()).toBe(2);

    // Trigger resize
    arr.push(30);
    expect(arr.size()).toBe(3);
    expect(arr.getCapacity()).toBe(4); // doubled
    expect(arr.toArray()).toEqual([10, 20, 30]);
  });

  it("should remove elements with pop()", () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    expect(arr.pop()).toBe(3);
    expect(arr.size()).toBe(2);
    expect(arr.toArray()).toEqual([1, 2]);
  });

  it("should return null when popping an empty array", () => {
    expect(arr.pop()).toBeNull();
  });

  it("should get elements by index", () => {
    arr.push(5);
    arr.push(10);
    expect(arr.get(0)).toBe(5);
    expect(arr.get(1)).toBe(10);
    expect(arr.get(2)).toBeNull(); // out of bounds
  });

  it("should update elements using set()", () => {
    arr.push(100);
    arr.push(200);
    arr.set(1, 999);
    expect(arr.get(1)).toBe(999);
  });

  it("should throw RangeError for invalid index in set()", () => {
    arr.push(1);
    expect(() => arr.set(5, 100)).toThrow(RangeError);
  });

  it("should shrink capacity when underutilized", () => {
    // Initial capacity = 2 → push to trigger resize
    arr.push(1);
    arr.push(2);
    arr.push(3);
    expect(arr.getCapacity()).toBe(4);

    // Pop enough to shrink
    arr.pop();
    arr.pop();
    expect(arr.getCapacity()).toBe(2); // shrinks
  });
});