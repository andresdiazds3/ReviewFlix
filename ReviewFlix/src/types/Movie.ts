export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  genres: string[];
  duration: number;
  posterUrl: string;
  backdropUrl: string;
  description: string;
  cast: string[];
  trailerUrl: string;
  avgRating: number;
  ratingCount: number;
  reviewCount: number;
  searchText: string;
  searchTokens: string[];
  createdAt?: string;
  updatedAt?: string;
}
