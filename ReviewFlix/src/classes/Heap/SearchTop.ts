import type { Movie } from "../../types/Movie";
import { MinHeap } from "./MinHeap";
import { Trie } from "../Trie/Trie";

export function SearchTop(trie : Trie, prefix: string, k:number): Movie[] {
    const allMatches = trie.findSuggestions(prefix);
    const uniqueMatches = Array.from(new Map(allMatches.map(movie => [movie.id, movie])).values());

    if (uniqueMatches.length <= k){
        return uniqueMatches.sort((a,b) => b.avgRating - a.avgRating);
    }

    const minHeap = new MinHeap(uniqueMatches);

    while(minHeap.size() > k){
        minHeap.pop();
    }

    return minHeap.toArray().sort((a,b) => b.avgRating - a.avgRating);
}