class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (vertex instanceof Node) this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      if (vertex instanceof Node) this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    for (let vertex of [v1, v2]) {
      if (!(vertex instanceof Node) || !this.nodes.has(vertex)) return;
    }
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    for (let vertex of [v1, v2]) {
      if (!(vertex instanceof Node) || !this.nodes.has(vertex)) return;
    }
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!(vertex instanceof Node) || !this.nodes.has(vertex)) return;
    for (let v of Array.from(this.nodes)) {
      this.removeEdge(v, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let seen = new Set(stack);
    let nodes = [];

    while (stack.length) {
      let curr = stack.pop();
      nodes.push(curr.value);

      for (let neighbor of curr.adjacent) {
        if (!seen.has(neighbor)) {
          stack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let nodes = [];

    while (queue.length) {
      let curr = queue.shift();
      nodes.push(curr.value);
      for (let neighbor of curr.adjacent) {
        if (!seen.has(neighbor)) {
          queue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodes;
  }

  shortestPath(start, end){
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        console.log(predecessors)
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(end.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
