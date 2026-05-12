import { TrieNode } from "./TrieNode";
import type { Movie } from "../../types/Movie";

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(movie: Movie) {
        const terms = new Set<string>();
        terms.add(movie.title);
        for (const genre of movie.genres) {
            terms.add(genre);
        }
        for (const token of movie.searchTokens) {
            terms.add(token);
        }

        for (const term of terms) {
            this.insertTerm(term, movie);
        }
    }

    private insertTerm(term: string, movie: Movie) {
        let currentNode = this.root;
        const normalized = term.trim().toLowerCase();

        if (!normalized) {
            return;
        }

        for (const char of normalized) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.endWord = true;
        currentNode.movies.push(movie);
    }

    findSuggestions(prefix: string): Movie[] {
        let currentNode = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return [];
            }
            currentNode = currentNode.children.get(char)!;
        }
        const results: Movie[] = [];
        this.collectAll(currentNode, results);
        return results;
    }

    collectAll(node: TrieNode, results: Movie[]) {
        // Add any movies stored at this node
        if (node.movies && node.movies.length > 0) {
            for (const m of node.movies) {
                results.push(m);
            }
        }
        // Recurse into children
        for (const child of node.children.values()) {
            this.collectAll(child, results);
        }
    }

    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode.endWord;
    }
}