export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt?: string;
}
