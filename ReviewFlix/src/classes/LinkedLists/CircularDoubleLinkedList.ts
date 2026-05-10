import Node from "./Node";

export class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;

      this.tail!.next = newNode;
      this.head.prev = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  peek(value: any) {
    if (!this.head) return null;

    let current = this.head;

    do {
      if (current.value.id === value) {
        return current;
      }
      current = current.next!;
    } while (current !== this.head);
  }

  remove(value: any) {
    if (!this.head) return null;

    let current = this.head;

    do {
      if (current.value.id === value) {

        // único nodo
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        }

        // eliminar head
        else if (current === this.head) {
          this.head = this.head.next;
          this.head!.prev = this.tail;
          this.tail!.next = this.head;
        }

        // eliminar tail
        else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail!.next = this.head;
          this.head!.prev = this.tail;
        }

        // nodo intermedio
        else {
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }

        this.length--;
        return;
      }

      current = current.next!;
    } while (current !== this.head);
  }

  size() {
    return this.length;
  }

  print() {
    if (!this.head) {
      console.log("Lista vacía");
      return;
    }

    let current = this.head;
    let result = "";

    do {
      result += current.value + " <-> ";
      current = current.next!;
    } while (current !== this.head);

    console.log(result + "(doble circular)");
  }
}