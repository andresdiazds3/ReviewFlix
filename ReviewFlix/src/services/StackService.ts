import Stack from "../classes/Stack/Stack";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

interface SearchItem {
  query: string;
  timestamp: number;
  type?: "movie" | "genre" | "keyword";
}

const MAX_SEARCHES = 20;

/**
 * StackService maneja las búsquedas recientes usando una estructura de PILA
 * Almacena los datos en Firebase Firestore para persistencia entre sesiones
 * Estructura: users/{userId}/searchHistory/searches
 */
class StackService {
  private searchStack: Stack;
  private userId: string | null = null;

  constructor() {
    this.searchStack = new Stack();
  }

  /**
   * Establecer el ID del usuario actual
   */
  setUserId(userId: string) {
    if (!userId || userId.trim() === "") {
      console.warn("Invalid user ID provided");
      return;
    }
    this.userId = userId;
    console.log("StackService: User ID set to", userId);
  }

  /**
   * Cargar las búsquedas recientes del usuario desde Firebase
   */
  async loadSearchesFromFirebase(): Promise<SearchItem[]> {
    if (!this.userId) {
      console.warn("StackService: No user ID set. Cannot load searches from Firebase.");
      return [];
    }

    try {
      const userSearchesRef = doc(db, "users", this.userId, "searchHistory", "searches");
      console.log("StackService: Loading searches from path:", userSearchesRef.path);
      
      const docSnap = await getDoc(userSearchesRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const searches = data?.items || [];
        console.log("StackService: Loaded searches from Firebase:", searches);

        // Cargar en la pila
        this.searchStack = new Stack();
        // Firestore guarda el elemento superior primero, por eso se inserta al revés
        [...searches].reverse().forEach((search: SearchItem) => {
          this.searchStack.push(search);
        });

        return searches;
      } else {
        console.log("StackService: No search history document exists yet");
        return [];
      }
    } catch (error) {
      console.error("StackService: Error loading searches from Firebase:", error);
      return [];
    }
  }

  /**
   * Agregar una nueva búsqueda a la pila y guardar en Firebase
   */
  async addSearch(query: string, type: "movie" | "genre" | "keyword" = "keyword"): Promise<void> {
    if (!query.trim()) return;

    const cleaned = query.trim();
    const searchItem: SearchItem = {
      query: cleaned,
      timestamp: Date.now(),
      type,
    };

    // Agregar a la pila (LIFO)
    this.searchStack.push(searchItem);
    console.log("StackService: Search added to stack:", searchItem);

    // Limitar el tamaño de la pila
    if (this.searchStack.size() > MAX_SEARCHES) {
      const oldestFirst = this.searchStack.print().reverse();
      this.searchStack = new Stack();
      
      // Mantener solo los últimos MAX_SEARCHES elementos y conservar el orden de pila
      oldestFirst.slice(1).forEach((item) => {
        this.searchStack.push(item);
      });
      console.log("StackService: Stack trimmed to", MAX_SEARCHES, "items");
    }

    // Guardar en Firebase si hay usuario autenticado
    if (this.userId) {
      await this.saveSearchesToFirebase();
    }
  }

  /**
   * Guardar la pila actual en Firebase
   */
  private async saveSearchesToFirebase(): Promise<void> {
    if (!this.userId) {
      console.warn("StackService: No user ID available for saving");
      return;
    }

    try {
      const userSearchesRef = doc(db, "users", this.userId, "searchHistory", "searches");
      const searches = this.searchStack.print();

      console.log("StackService: Saving to Firestore at path:", userSearchesRef.path);
      console.log("StackService: Saving searches:", searches);

      await setDoc(userSearchesRef, {
        items: searches,
        lastUpdated: serverTimestamp(),
        userId: this.userId,
      }, { merge: true });

      console.log("StackService: Searches saved successfully to Firebase");
    } catch (error) {
      console.error("StackService: Error saving searches to Firebase:", error);
      throw error;
    }
  }

  /**
   * Obtener todas las búsquedas recientes en orden (más reciente primero)
   */
  getRecentSearches(): SearchItem[] {
    return this.searchStack.print();
  }

  /**
   * Eliminar una búsqueda específica
   */
  async removeSearch(query: string): Promise<void> {
    const allItems = this.searchStack.print().reverse();
    const filtered = allItems.filter(
      (item: SearchItem) => item.query.toLowerCase() !== query.toLowerCase()
    );

    this.searchStack = new Stack();
    filtered.forEach((item: SearchItem) => {
      this.searchStack.push(item);
    });

    console.log("StackService: Search removed:", query);

    if (this.userId) {
      await this.saveSearchesToFirebase();
    }
  }

  /**
   * Limpiar todas las búsquedas
   */
  async clearAllSearches(): Promise<void> {
    this.searchStack = new Stack();
    console.log("StackService: All searches cleared");

    if (this.userId) {
      try {
        const userSearchesRef = doc(db, "users", this.userId, "searchHistory", "searches");
        await setDoc(userSearchesRef, {
          items: [],
          lastUpdated: serverTimestamp(),
          userId: this.userId,
        }, { merge: true });

        console.log("StackService: Cleared all searches in Firebase");
      } catch (error) {
        console.error("StackService: Error clearing searches in Firebase:", error);
        throw error;
      }
    }
  }

  /**
   * Obtener el tamaño actual de la pila
   */
  getStackSize(): number {
    return this.searchStack.size();
  }

  /**
   * Obtener la búsqueda más reciente (tope de la pila)
   */
  peekLatestSearch(): SearchItem | null {
    return this.searchStack.peek();
  }
}

// Exportar una instancia única
export const stackService = new StackService();
export default StackService;

