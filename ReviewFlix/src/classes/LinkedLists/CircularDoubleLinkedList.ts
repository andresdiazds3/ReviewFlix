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

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  toArray(limit?: number) {
    const result: any[] = [];
    if (!this.head) return result;

    const max = limit ?? this.length;
    let current = this.head;
    let count = 0;

    do {
      result.push(current.value);
      current = current.next!;
      count++;
    } while (current !== this.head && count < max);

    return result;
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

  getNodeAt(index: number) {
    if (!this.head || index < 0 || index >= this.length) return null;

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next!;
      i++;
    }

    return current;
  }

  insertAt(index: number, value: any) {
    if (index <= 0 || !this.head) {
      const newNode = new Node(value);

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = newNode;
        newNode.prev = newNode;
      } else {
        newNode.next = this.head;
        newNode.prev = this.tail;
        this.head.prev = newNode;
        this.tail!.next = newNode;
        this.head = newNode;
      }

      this.length++;
      return;
    }

    if (index >= this.length) {
      this.append(value);
      return;
    }

    const current = this.getNodeAt(index);
    if (!current) return;

    const newNode = new Node(value);
    const prev = current.prev!;
    prev.next = newNode;
    newNode.prev = prev;
    newNode.next = current;
    current.prev = newNode;
    this.length++;
  }

  removeAt(index: number) {
    if (!this.head || index < 0 || index >= this.length) return null;

    if (this.length === 1) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }

    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.next;
      this.head!.prev = this.tail;
      this.tail!.next = this.head;
      this.length--;
      return value;
    }

    if (index === this.length - 1) {
      const value = this.tail!.value;
      this.tail = this.tail!.prev;
      this.tail!.next = this.head;
      this.head!.prev = this.tail;
      this.length--;
      return value;
    }

    const current = this.getNodeAt(index);
    if (!current) return null;

    current.prev!.next = current.next;
    current.next!.prev = current.prev;
    this.length--;
    return current.value;
  }

  move(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    if (!this.head || this.length < 2) return;

    const value = this.removeAt(fromIndex);
    if (value === null || value === undefined) return;

    this.insertAt(toIndex, value);
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