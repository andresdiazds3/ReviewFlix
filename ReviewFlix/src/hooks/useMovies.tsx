import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { Trie } from "../classes/Trie/Trie";
import type { Movie } from "../types/Movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const ref = collection(firestore, "movies");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const docs: Movie[] = [];
        snap.forEach((d) => {
          const data = d.data() as any;
          docs.push({
              id: d.id,
              title: data.title || "",
              year: data.year || 0,
              director: data.director || "",
              genres: data.genres || [],
              duration: data.duration || 0,
              posterUrl: data.posterUrl || data.poster || "",
              backdropUrl: data.backdropUrl || data.backdrop || (data.posterUrl || data.poster) || "",
              description: data.description || "",
              cast: data.cast || [],
              trailerUrl: data.trailerUrl || "",
              avgRating: data.avgRating ?? 0,
              ratingCount: data.ratingCount ?? 0,
              reviewCount: data.reviewCount ?? 0,
              searchText: data.searchText || "",
              searchTokens: data.searchTokens || [],
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            });
        });
        setMovies(docs);
        setLoading(false);
      },
      (err) => {
        console.error('useMovies snapshot error', err);
        setError(String(err));
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const trie = useMemo(() => {
    const t = new Trie();
    for (const m of movies) {
      try { t.insert(m); } catch (e) { /* ignore single insert errors */ }
    }
    return t;
  }, [movies]);

  return { movies, loading, error, trie };
}

export default useMovies;
