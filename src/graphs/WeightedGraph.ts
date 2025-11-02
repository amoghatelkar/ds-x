/**
 * Weighted Graph (Adjacency List)
 *
 * Supports directed or undirected graphs with edge weights.
 * Includes Dijkstra’s and Bellman-Ford shortest path algorithms.
 */

export default class WeightedGraph<T> {
    private adjacencyList: Map<T, Map<T, number>>;
    private directed: boolean;

    constructor(directed: boolean = false) {
        this.adjacencyList = new Map();
        this.directed = directed;
    }

    /** Add a vertex if it doesn't exist */
    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Map());
        }
    }

    /** Add a weighted edge */
    addEdge(vertex1: T, vertex2: T, weight: number): void {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1)?.set(vertex2, weight);
        if (!this.directed) {
            this.adjacencyList.get(vertex2)?.set(vertex1, weight);
        }
    }

    /** Remove an edge */
    removeEdge(vertex1: T, vertex2: T): void {
        this.adjacencyList.get(vertex1)?.delete(vertex2);
        if (!this.directed) {
            this.adjacencyList.get(vertex2)?.delete(vertex1);
        }
    }

    /** Remove a vertex and its edges */
    removeVertex(vertex: T): void {
        this.adjacencyList.delete(vertex);
        for (const [v, edges] of this.adjacencyList.entries()) {
            edges.delete(vertex);
        }
    }

    /** Get all edges from a vertex */
    getEdges(vertex: T): Map<T, number> | undefined {
        return this.adjacencyList.get(vertex);
    }

    /** Dijkstra’s shortest path algorithm */
    dijkstra(start: T): Map<T, number> {
        const distances = new Map<T, number>();
        const visited = new Set<T>();
        const pq: [T, number][] = [];

        for (const vertex of this.adjacencyList.keys()) {
            distances.set(vertex, vertex === start ? 0 : Infinity);
        }

        pq.push([start, 0]);

        while (pq.length > 0) {
            pq.sort((a, b) => a[1] - b[1]);
            const [current, dist] = pq.shift()!;
            if (visited.has(current)) continue;
            visited.add(current);

            const neighbors = this.adjacencyList.get(current);
            if (neighbors) {
                for (const [neighbor, weight] of neighbors.entries()) {
                    const newDist = dist + weight;
                    if (newDist < (distances.get(neighbor) ?? Infinity)) {
                        distances.set(neighbor, newDist);
                        pq.push([neighbor, newDist]);
                    }
                }
            }
        }

        return distances;
    }

    /**
     * Bellman-Ford Algorithm
     * Works even with negative edge weights.
     * Detects negative weight cycles.
     */
    bellmanFord(start: T): Map<T, number> {
        const distances = new Map<T, number>();
        const vertices = Array.from(this.adjacencyList.keys());

        // Step 1: Initialize distances
        for (const v of vertices) {
            distances.set(v, Infinity);
        }
        distances.set(start, 0);

        // Step 2: Relax all edges |V| - 1 times
        for (let i = 0; i < vertices.length - 1; i++) {
            for (const [u, edges] of this.adjacencyList.entries()) {
                const distU = distances.get(u)!;
                if (distU === Infinity) continue;

                for (const [v, weight] of edges.entries()) {
                    const newDist = distU + weight;
                    if (newDist < distances.get(v)!) {
                        distances.set(v, newDist);
                    }
                }
            }
        }

        // Step 3: Detect negative weight cycle
        for (const [u, edges] of this.adjacencyList.entries()) {
            const distU = distances.get(u)!;
            if (distU === Infinity) continue;

            for (const [v, weight] of edges.entries()) {
                if (distU + weight < distances.get(v)!) {
                    throw new Error("Graph contains a negative weight cycle");
                }
            }
        }

        return distances;
    }
}