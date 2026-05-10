import Movie from "../Movie";
import { MinHeap } from "./MinHeap";
import { Trie } from "../Trie/Trie";

export function SearchTop(trie : Trie, prefix: string, k:number): Movie[] {
    const allMatches = trie.findSuggestions(prefix);

    if (allMatches.length <= k){
        return allMatches.sort((a,b) => b.rate - a.rate);
    }

    const minHeap = new MinHeap(allMatches);

    while(minHeap.size() > k){
        minHeap.pop();
    }

    return minHeap.toArray().sort((a,b) => b.rate - a.rate);
}