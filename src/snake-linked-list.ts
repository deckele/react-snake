import { Coordinate } from "./types";
import { hashXY } from "./utils";

export class SnakeNode {
  constructor(public coordiate: Coordinate, public next?: SnakeNode) {}
  toString() {
    return hashXY(this.coordiate);
  }
}

// a reverse linked list, tail leading to head through next links
export class SnakeLinkedList {
  static from(snakeLike: SnakeLinkedList | SnakeNode[] = []) {
    let nodes = snakeLike as SnakeNode[];
    if (snakeLike instanceof SnakeLinkedList) {
      nodes = [...snakeLike];
    }
    const snakeLinkedList = new SnakeLinkedList();
    nodes.forEach((node) => snakeLinkedList.addToHead(node));
    return snakeLinkedList;
  }
  hash: Record<string, SnakeNode> = {};
  head?: SnakeNode | null = null;
  tail?: SnakeNode | null = null;

  *[Symbol.iterator]() {
    let tail = this.tail;
    while (tail) {
      yield tail;
      tail = tail.next;
    }
  }

  addToHead(link: SnakeNode) {
    if (this.hash[link.toString()]) {
      return;
    }
    this.hash[link.toString()] = link;
    if (!this.head) {
      this.head = link;
      this.tail = link;
      return;
    }
    this.head.next = link;
    this.head = link;
  }
  popTail() {
    if (!this.tail) return;
    const tail = this.tail;
    if (this.head === tail) {
      this.head = null;
      this.tail = null;
    }
    this.tail = tail?.next;
    delete tail.next;
    delete this.hash[tail.toString()];
    return tail;
  }
}
