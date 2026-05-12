import { useState, useEffect } from "react";
import { stackService } from "../services/StackService";
import { useAuthContext } from "../context/AuthorizationContext";

interface SearchItem {
  query: string;
  timestamp: number;
  type?: "movie" | "genre" | "keyword";
}

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  // Cargar búsquedas cuando el usuario se autentica
  useEffect(() => {
    const loadSearches = async () => {
      setLoading(true);
      try {
        if (user?.uid) {
          console.log("useRecentSearches: Loading searches for user:", user.uid);
          stackService.setUserId(user.uid);
          const searches = await stackService.loadSearchesFromFirebase();
          console.log("useRecentSearches: Loaded searches:", searches);
          setRecentSearches(searches);
        } else {
          console.log("useRecentSearches: No user authenticated");
          setRecentSearches([]);
        }
      } catch (error) {
        console.error("useRecentSearches: Error loading searches:", error);
        setRecentSearches([]);
      } finally {
        setLoading(false);
      }
    };

    loadSearches();
  }, [user?.uid]);

  // Agregar una nueva búsqueda
  const addSearch = async (query: string, type: "movie" | "genre" | "keyword" = "keyword") => {
    if (!query.trim() || !user?.uid) {
      console.warn("useRecentSearches: Cannot add search - missing query or user");
      return;
    }

    try {
      console.log("useRecentSearches: Adding search:", { query, type, userId: user.uid });
      await stackService.addSearch(query, type);
      const searches = stackService.getRecentSearches();
      console.log("useRecentSearches: Updated searches:", searches);
      setRecentSearches(searches);
    } catch (error) {
      console.error("useRecentSearches: Error adding search:", error);
    }
  };

  // Eliminar una búsqueda específica
  const removeSearch = async (query: string) => {
    try {
      console.log("useRecentSearches: Removing search:", query);
      await stackService.removeSearch(query);
      const searches = stackService.getRecentSearches();
      setRecentSearches(searches);
    } catch (error) {
      console.error("useRecentSearches: Error removing search:", error);
    }
  };

  // Limpiar todas las búsquedas
  const clearSearches = async () => {
    try {
      console.log("useRecentSearches: Clearing all searches");
      await stackService.clearAllSearches();
      setRecentSearches([]);
    } catch (error) {
      console.error("useRecentSearches: Error clearing searches:", error);
    }
  };

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches,
    loading,
  };
};


