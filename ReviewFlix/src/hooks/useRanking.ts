import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Movie } from "../types/Movie";
import { LinkedList } from "../classes/LinkedLists/CircularDoubleLinkedList";

export function useRanking(movies: Movie[], seedIds: string[] = [], limit = 5) {
  const listRef = useRef(new LinkedList());
  const initializedRef = useRef(false);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  const refresh = useCallback(() => {
    setTopMovies(listRef.current.toArray(limit) as Movie[]);
  }, [limit]);

  useEffect(() => {
    if (!movies.length || initializedRef.current) return;

    const ids = seedIds.length ? seedIds : movies.slice(0, limit).map((m) => m.id);
    listRef.current.clear();
    for (const id of ids) {
      const movie = movies.find((m) => m.id === id);
      if (movie) listRef.current.append(movie);
    }

    initializedRef.current = true;
    refresh();
  }, [movies, seedIds, limit, refresh]);

  const addMovieById = useCallback((movieId: string) => {
    if (!movieId) return false;
    if (listRef.current.peek(movieId)) return false;
    if (listRef.current.size() >= limit) return false;

    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return false;

    listRef.current.append(movie);
    refresh();
    return true;
  }, [movies, limit, refresh]);

  const removeMovie = useCallback((movieId: string) => {
    listRef.current.remove(movieId);
    refresh();
  }, [refresh]);

  const moveMovie = useCallback((fromIndex: number, toIndex: number) => {
    listRef.current.move(fromIndex, toIndex);
    refresh();
  }, [refresh]);

  const availableMovies = useMemo(() => {
    const selectedIds = new Set(topMovies.map((m) => m.id));
    return movies.filter((m) => !selectedIds.has(m.id));
  }, [movies, topMovies]);

  return {
    topMovies,
    availableMovies,
    isFull: topMovies.length >= limit,
    addMovieById,
    removeMovie,
    moveMovie,
  };
}

export default useRanking;
