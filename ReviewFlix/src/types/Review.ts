export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  content: string;
  likes: number;
  liked?: boolean;
  createdAt: string;
  updatedAt?: string;
  parentId?: string | null;
  authorName?: string;
  authorAvatar?: string;
  authorUsername?: string;
  replies?: Review[];
}
