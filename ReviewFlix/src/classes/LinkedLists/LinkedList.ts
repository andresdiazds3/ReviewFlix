import Node from './Node'

class LinkedList{

    head : Node|null
    tail : Node|null
    
    constructor(){
        this.head = null
        this.tail = null
    }

    add(value: any): void{
        const node = new Node(value);
        if(!this.head){
            this.head = node;
            this.tail = node;
            return
        }
        
        this.tail!.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
}

export default LinkedList