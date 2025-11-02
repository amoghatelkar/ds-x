import SparseArray from "../../src/arrays/SparseArray";

describe("SparseArray", () => {
  let sparse: SparseArray<number>;

  beforeEach(() => {
    sparse = new SparseArray<number>(100);
  });

  it("should start with given logical length", () => {
    expect(sparse.size()).toBe(100);
  });

  it("should set and get elements correctly", () => {
    sparse.set(5, 42);
    expect(sparse.get(5)).toBe(42);
  });

  it("should return null for unset indices", () => {
    expect(sparse.get(10)).toBeNull();
  });

  it("should delete elements", () => {
    sparse.set(7, 99);
    sparse.delete(7);
    expect(sparse.get(7)).toBeNull();
  });

  it("should increase length when setting higher index", () => {
    sparse.set(200, 10);
    expect(sparse.size()).toBe(201); // index 200 → length = 201
  });

  it("should throw RangeError for negative index", () => {
    expect(() => sparse.set(-1, 50)).toThrow(RangeError);
  });

  it("should return all keys and values", () => {
    sparse.set(1, 10);
    sparse.set(5, 20);
    expect(sparse.keys().sort()).toEqual([1, 5]);
    expect(sparse.values().sort()).toEqual([10, 20]);
  });

  it("should convert to object correctly", () => {
    sparse.set(2, 15);
    sparse.set(4, 30);
    expect(sparse.toObject()).toEqual({ 2: 15, 4: 30 });
  });
});