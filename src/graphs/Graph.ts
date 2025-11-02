/**
 * Graph Data Structure (Adjacency List)
 *
 * Supports directed or undirected graphs.
 * Allows adding/removing vertices and edges, 
 * and performing BFS & DFS traversals.
 */

export default class Graph<T> {
  private adjacencyList: Map<T, Set<T>>;
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  /** Add a new vertex */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  /** Add an edge between two vertices */
  addEdge(vertex1: T, vertex2: T): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1)?.add(vertex2);

    if (!this.directed) {
      this.adjacencyList.get(vertex2)?.add(vertex1);
    }
  }

  /** Remove an edge */
  removeEdge(vertex1: T, vertex2: T): void {
    this.adjacencyList.get(vertex1)?.delete(vertex2);
    if (!this.directed) {
      this.adjacencyList.get(vertex2)?.delete(vertex1);
    }
  }

  /** Remove a vertex and all its edges */
  removeVertex(vertex: T): void {
    this.adjacencyList.delete(vertex);
    for (const [v, edges] of this.adjacencyList.entries()) {
      edges.delete(vertex);
    }
  }

  /** Get neighbors of a vertex */
  getNeighbors(vertex: T): Set<T> | undefined {
    return this.adjacencyList.get(vertex);
  }

  /** Breadth-First Search traversal */
  bfs(start: T): T[] {
    const visited = new Set<T>();
    const queue: T[] = [start];
    const result: T[] = [];

    while (queue.length > 0) {
      const vertex = queue.shift()!;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        const neighbors = this.adjacencyList.get(vertex);
        if (neighbors) {
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) queue.push(neighbor);
          }
        }
      }
    }
    return result;
  }

  /** Depth-First Search traversal */
  dfs(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];

    const dfsHelper = (vertex: T) => {
      if (!vertex || visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex);
      const neighbors = this.adjacencyList.get(vertex);
      if (neighbors) {
        for (const neighbor of neighbors) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(start);
    return result;
  }
}