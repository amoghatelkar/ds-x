import { LinkedList }  from "../../src/linkedLists/LinkedList";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test("should append elements", () => {
    list.append(10);
    list.append(20);
    expect(list.toArray()).toEqual([10, 20]);
    expect(list.length).toBe(2);
  });

  test("should prepend elements", () => {
    list.append(10);
    list.prepend(5);
    expect(list.toArray()).toEqual([5, 10]);
    expect(list.length).toBe(2);
  });

  test("should delete elements", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.delete(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.length).toBe(2);
  });

  test("should return null when finding non-existent value", () => {
    list.append(10);
    expect(list.find(99)).toBeNull();
  });

  test("should clear the list", () => {
    list.append(10);
    list.append(20);
    list.clear();
    expect(list.length).toBe(0);
    expect(list.toArray()).toEqual([]);
  });
});