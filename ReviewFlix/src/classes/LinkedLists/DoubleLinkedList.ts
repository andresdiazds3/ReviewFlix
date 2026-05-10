import Node from "./Node"

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
  } else {
    newNode.prev = this.tail;
    this.tail!.next = newNode;
    this.tail = newNode;
  }

  this.length++;
}
  
  peek(value: any, current: Node | null = this.head): Node | null {
    while (current) {
      if (current.value.id === value) {
        return current;
      }
      current = current.next as Node | null;
    }
    return null;
  }

  remove(value: any) {
  if (!this.head) return null;

  let current: Node | null = this.head;

  while (current) {
    if (current.value.id === value) {

      // head
      if (current === this.head) {
        this.head = this.head.next;

        if (this.head) {
          this.head.prev = null;
        } else {
          this.tail = null;
        }
      }

      // tail
      else if (current === this.tail) {
        this.tail = this.tail.prev;
        this.tail!.next = null;
      }

      // medio
      else {
        current.prev!.next = current.next;
        current.next!.prev = current.prev;
      }

      // LA OTRA FORMA DE LAS DIAPOSITIVAS ES LA SIGUIENTE POR SI LA ANTERIOR DA BUG
      //if(current.prev) current.prev.next = current.next;
      //if(current.next) current.next.prev = current.prev;

      this.length--;
      return;
    }

    current = current.next as Node | null;
  }
}

  size(){
    return this.length;
  }

  print() {
  let current = this.head;
  let result = "";

  while (current) {
    result += current.value + " <-> ";
    current = current.next;
  }

  console.log(result + "null");
}
  
}