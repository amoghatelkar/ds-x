/**
 * Trie (Prefix Tree)
 *
 * A tree-based data structure used for efficient retrieval of strings.
 * Supports insertion, search, prefix checking, and deletion.
 */

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /** Insert a word into the trie */
  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  /** Search if a word exists in the trie */
  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  /** Check if any word starts with the given prefix */
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }

  /** Delete a word from the trie */
  delete(word: string): void {
    this.deleteHelper(this.root, word, 0);
  }

  private deleteHelper(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[depth];
    const child = node.children.get(char);
    if (!child) return false;

    const shouldDelete = this.deleteHelper(child, word, depth + 1);

    if (shouldDelete) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}