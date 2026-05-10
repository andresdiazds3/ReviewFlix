import  { TrieNode } from "./TrieNode";
import Movie from "../Movie";

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(product: Movie) {
        let currentNode = this.root;
        for (const char of product.name.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.endWord = true;
        currentNode.movies.push(product);
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
        return results
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