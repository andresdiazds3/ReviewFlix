import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useCollection } from "../hooks/useCollection";
import type { Review } from "../types/Review";
import { buildReviewMetricsByMovieId } from "../utils/reviewMetrics";

type ReviewsContextValue = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  metricsByMovieId: Map<string, { sum: number; count: number; reviewCount: number }>;
};

const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const { documents, loading, error } = useCollection("reviews");

  const reviews = useMemo(() => {
    return [...(documents as Review[])].sort((left, right) => {
      const leftTime = new Date(left.createdAt || left.updatedAt || 0).getTime();
      const rightTime = new Date(right.createdAt || right.updatedAt || 0).getTime();
      return rightTime - leftTime;
    });
  }, [documents]);

  const metricsByMovieId = useMemo(() => buildReviewMetricsByMovieId(reviews), [reviews]);

  const value: ReviewsContextValue = {
    reviews,
    loading,
    error,
    metricsByMovieId,
  };

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) {
    throw new Error("useReviews must be used within ReviewsProvider");
  }
  return ctx;
}
