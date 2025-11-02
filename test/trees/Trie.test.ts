import Trie from "../../src/trees/Trie";

describe("Trie", () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test("should insert and search words correctly", () => {
    trie.insert("apple");
    expect(trie.search("apple")).toBe(true);
    expect(trie.search("app")).toBe(false);
  });

  test("should check prefixes correctly", () => {
    trie.insert("apple");
    expect(trie.startsWith("app")).toBe(true);
    expect(trie.startsWith("apl")).toBe(false);
  });

  test("should delete a word correctly", () => {
    trie.insert("apple");
    trie.insert("app");
    trie.delete("apple");

    expect(trie.search("apple")).toBe(false);
    expect(trie.search("app")).toBe(true); // app still exists
  });

  test("should handle non-existent word deletion gracefully", () => {
    trie.insert("cat");
    trie.delete("dog");
    expect(trie.search("cat")).toBe(true);
  });
});