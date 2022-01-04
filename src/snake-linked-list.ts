import { hashXY } from "./utils";

export class SnakeNode {
  constructor(public x: number, public y: number, public next?: SnakeNode) {}
  toString() {
    return hashXY(this.x, this.y);
  }
}

// a reverse linked list, tail leading to head through next links
export class SnakeLinkedList {
  static from(
    snakeLike: SnakeLinkedList | SnakeNode[] = [],
    onCollision: () => void = () => {}
  ) {
    let nodes = snakeLike as SnakeNode[];
    if (snakeLike instanceof SnakeLinkedList) {
      nodes = [...snakeLike];
      onCollision = snakeLike.onCollision;
    }
    const snakeLinkedList = new SnakeLinkedList(onCollision);
    nodes.forEach((node) => snakeLinkedList.addToHead(node));
    return snakeLinkedList;
  }
  hash: Record<string, SnakeNode> = {};
  head?: SnakeNode | null = null;
  tail?: SnakeNode | null = null;

  constructor(public onCollision: () => void) {}

  *[Symbol.iterator]() {
    let tail = this.tail;
    while (tail) {
      yield tail;
      tail = tail.next;
    }
  }

  addToHead(link: SnakeNode) {
    if (this.hash[link.toString()]) {
      this.onCollision();
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
    this.tail = tail?.next;
    if (this.head === tail) this.head = null;
    delete this.hash[tail.toString()];
    return tail;
  }
}
