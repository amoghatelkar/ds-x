import { DoubleLinkedList } from "../../src/linkedLists/DoubleLinkedList";

describe("DoubleLinkedList", () => {
  let list: DoubleLinkedList<number>;

  beforeEach(() => {
    list = new DoubleLinkedList<number>();
  });

  test("should append elements", () => {
    list.append(10);
    list.append(20);
    expect(list.toArrayForward()).toEqual([10, 20]);
    expect(list.toArrayBackward()).toEqual([20, 10]);
    expect(list.length).toBe(2);
  });

  test("should prepend elements", () => {
    list.append(10);
    list.prepend(5);
    expect(list.toArrayForward()).toEqual([5, 10]);
    expect(list.toArrayBackward()).toEqual([10, 5]);
  });

  test("should delete middle element", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.delete(2)).toBe(true);
    expect(list.toArrayForward()).toEqual([1, 3]);
    expect(list.toArrayBackward()).toEqual([3, 1]);
    expect(list.length).toBe(2);
  });

  test("should delete head and tail", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.delete(1); // head
    list.delete(3); // tail
    expect(list.toArrayForward()).toEqual([2]);
    expect(list.toArrayBackward()).toEqual([2]);
  });

  test("should clear the list", () => {
    list.append(10);
    list.append(20);
    list.clear();
    expect(list.length).toBe(0);
    expect(list.toArrayForward()).toEqual([]);
  });
});