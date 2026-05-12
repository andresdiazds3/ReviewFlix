import type { Movie } from "../../types/Movie";

export class MinHeap {
    heap: Movie[];
    initial : Movie[];

    constructor(initial: Movie[]) {
        this.heap = [];
        this.initial = initial;

        if (initial.length > 0) {
            this.heap = [...initial];
            this.heapify();
        }
    }

    push(value: Movie) {
        this.heap.push(value);
        this.percolateUp();
    }

    pop() : Movie | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        const n = this.heap.length;
        this.swap(0, n - 1);

        const min = this.heap.pop();
        this.percolateDown(0);
        return min;
    }

    heapify() {
        const start = Math.floor(this.heap.length / 2) - 1;
        for (let i = start; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    percolateDown(index: number) : void{
        let curr = index;
        while(2*curr + 1 < this.heap.length) {
            const left = 2*curr + 1;
            const right = 2*curr + 2;

            const minChild = (right < this.heap.length && this.heap[right].avgRating < this.heap[left].avgRating) 
            ? right : left;

            if (this.heap[curr].avgRating > this.heap[minChild].avgRating) {
                this.swap(curr, minChild);
                curr = minChild;
            }else {
                break;
            }
        }
    }

    percolateUp() : void{
        let curr = this.heap.length - 1;

        while(curr > 0) {
            const parent = Math.floor((curr - 1) / 2);
            if (this.heap[curr].avgRating < this.heap[parent].avgRating) {
                this.swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }

    swap(i: number, j: number) : void{
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    size() : number {
        return this.heap.length;
    }

    toArray() : Movie[] {
        return [...this.heap];
    }
}