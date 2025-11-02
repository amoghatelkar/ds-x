import HashTable from "../../src/maps/HashTable";

describe("HashTable", () => {
  let table: HashTable<string, number>;

  beforeEach(() => {
    table = new HashTable<string, number>(4);
  });

  test("should insert and retrieve values", () => {
    table.set("apple", 10);
    table.set("banana", 20);
    expect(table.get("apple")).toBe(10);
    expect(table.get("banana")).toBe(20);
  });

  test("should update existing key", () => {
    table.set("x", 1);
    table.set("x", 2);
    expect(table.get("x")).toBe(2);
  });

  test("should handle collisions correctly", () => {
    // Artificially collide by using small capacity
    table.set("a", 1);
    table.set("b", 2);
    expect(table.size()).toBe(2);
  });

  test("should delete keys", () => {
    table.set("key", 42);
    expect(table.delete("key")).toBe(true);
    expect(table.get("key")).toBeUndefined();
  });

  test("should resize when load factor exceeds 0.75", () => {
    for (let i = 0; i < 10; i++) {
      table.set(`key${i}`, i);
    }
    expect(table.size()).toBe(10);
  });

  test("should clear all entries", () => {
    table.set("a", 1);
    table.set("b", 2);
    table.clear();
    expect(table.size()).toBe(0);
  });
});