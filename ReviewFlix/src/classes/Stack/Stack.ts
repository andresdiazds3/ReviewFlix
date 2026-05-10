class Stack{
    items : Array<any>
    constructor(){
        this.items = []
    }

    push(value:any){
        this.items.push(value)
    }

    pop(){
        return this.items.length > 0 ? this.items.pop() : null;
    }

    peek(){
        return this.items.length > 0 ? this.items [this.items.length-1]:null;
    }

    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    print(){
        return this.items.slice().reverse()
    }


}

export default Stack