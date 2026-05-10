import Movie from "../Movie";

export class TrieNode {
    children: Map<string, TrieNode>;
    endWord: boolean;
    movies: Movie[];

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.endWord = false;
        this.movies = [];
    }
}