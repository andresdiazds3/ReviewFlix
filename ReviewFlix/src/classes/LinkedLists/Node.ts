class Node {
    value : any;
    next : Node | null; 
    prev : Node | null;

    constructor(value:any){
        this.value = value
        this.next = null
        this.prev = null
    }
}

export default Node;