import { MinHeap } from "../classes/Heap/MinHeap";
import type { Movie } from "../types/Movie";

export function getTopMoviesByRating(movies: Movie[], limit: number): Movie[] {
  if (limit <= 0 || movies.length === 0) {
    return [];
  }

  const heap = new MinHeap([]);

  for (const movie of movies) {
    heap.push(movie);
    if (heap.size() > limit) {
      heap.pop();
    }
  }

  return heap.toArray().sort((left, right) => right.avgRating - left.avgRating);
}
