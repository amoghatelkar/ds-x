import HashSet from "../../src/sets/HashSet";

describe("HashSet", () => {
  let set: HashSet<number>;

  beforeEach(() => {
    set = new HashSet<number>();
  });

  test("should add and check elements", () => {
    set.add(1);
    set.add(2);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    expect(set.has(3)).toBe(false);
  });

  test("should not count duplicates", () => {
    set.add(5);
    set.add(5);
    expect(set.size()).toBe(1);
  });

  test("should delete elements correctly", () => {
    set.add(10);
    set.add(20);
    expect(set.delete(10)).toBe(true);
    expect(set.has(10)).toBe(false);
    expect(set.size()).toBe(1);
  });

  test("should clear the set", () => {
    set.add(1);
    set.add(2);
    set.clear();
    expect(set.size()).toBe(0);
  });

  test("should return all values", () => {
    set.add(1);
    set.add(2);
    const vals = set.values();
    expect(vals.sort()).toEqual([1, 2]);
  });
});