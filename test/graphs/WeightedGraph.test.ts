import WeightedGraph from "../../src/graphs/WeightedGraph";

describe("WeightedGraph", () => {
  let graph: WeightedGraph<string>;

  beforeEach(() => {
    graph = new WeightedGraph<string>();
  });

  test("should add vertices and weighted edges correctly", () => {
    graph.addEdge("A", "B", 5);
    graph.addEdge("A", "C", 10);

    const edges = graph.getEdges("A");
    expect(edges?.get("B")).toBe(5);
    expect(edges?.get("C")).toBe(10);
  });

  test("should remove an edge correctly", () => {
    graph.addEdge("A", "B", 2);
    graph.removeEdge("A", "B");
    expect(graph.getEdges("A")?.has("B")).toBe(false);
  });

  test("should remove a vertex and its edges", () => {
    graph.addEdge("A", "B", 1);
    graph.addEdge("A", "C", 3);
    graph.removeVertex("A");
    expect(graph.getEdges("A")).toBeUndefined();
  });

  test("should compute shortest path using Dijkstra", () => {
    graph.addEdge("A", "B", 4);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "C", 5);
    graph.addEdge("B", "D", 10);
    graph.addEdge("C", "D", 3);

    const distances = graph.dijkstra("A");

    expect(distances.get("A")).toBe(0);
    expect(distances.get("B")).toBe(4);
    expect(distances.get("C")).toBe(2);
    expect(distances.get("D")).toBe(5);
  });

  test("should compute shortest paths using Bellman-Ford", () => {
    const g = new WeightedGraph<string>(true); // directed
    g.addEdge("A", "B", 4);
    g.addEdge("A", "C", 2);
    g.addEdge("C", "B", -2);
    g.addEdge("B", "D", 2);
    g.addEdge("C", "D", 3);

    const distances = g.bellmanFord("A");
    expect(distances.get("A")).toBe(0);
    expect(distances.get("B")).toBe(0); // via C (-2)
    expect(distances.get("C")).toBe(2);
    expect(distances.get("D")).toBe(2);
  });

  test("should detect negative weight cycle", () => {
    const g = new WeightedGraph<string>(true);
    g.addEdge("A", "B", 1);
    g.addEdge("B", "C", -2);
    g.addEdge("C", "A", -1);

    expect(() => g.bellmanFord("A")).toThrow("Graph contains a negative weight cycle");
  });
});