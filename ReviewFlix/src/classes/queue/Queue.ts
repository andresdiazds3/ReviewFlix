export class Queue {
    items: Array<any>
    constructor(){
        this.items = []
    }

    enqueue(value: any){
        this.items.push(value)
    }

    dequeue(){
        return this.items.length > 0 ? this.items.shift() : null
    }

    peek(){
        return this.items.length > 0 ? this.items[0] : null
    }

    isEmpty(){
        return this.items.length === 0
    }

    size(){
        return this.items.length
    }

    print(){
        return this.items;
    }
}
