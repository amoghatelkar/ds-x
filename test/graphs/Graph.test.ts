import Graph from "../../src/graphs/Graph";

describe("Graph Data Structure", () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
  });

  test("should add vertices and edges correctly", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    expect(graph.getNeighbors("A")).toEqual(new Set(["B", "C"]));
    expect(graph.getNeighbors("B")).toContain("A");
  });

  test("should remove edge", () => {
    graph.addEdge("A", "B");
    graph.removeEdge("A", "B");
    expect(graph.getNeighbors("A")).not.toContain("B");
  });

  test("should remove vertex", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.removeVertex("A");
    expect(graph.getNeighbors("A")).toBeUndefined();
  });

  test("should perform BFS traversal", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "E");
    expect(graph.bfs("A")).toEqual(["A", "B", "C", "D", "E"]);
  });

  test("should perform DFS traversal", () => {
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "E");
    const result = graph.dfs("A");
    expect(result).toContain("A");
    expect(result.length).toBe(5);
  });
});