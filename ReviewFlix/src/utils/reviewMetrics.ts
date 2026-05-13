import type { Movie } from "../types/Movie";
import type { Review } from "../types/Review";

export type MovieReviewMetrics = {
  sum: number;
  count: number;
  reviewCount: number;
};

export function buildReviewMetricsByMovieId(reviews: Review[]) {
  const metricsByMovieId = new Map<string, MovieReviewMetrics>();

  for (const review of reviews) {
    if (!review.movieId || review.rating <= 0) {
      continue;
    }

    const current = metricsByMovieId.get(review.movieId) ?? { sum: 0, count: 0, reviewCount: 0 };
    current.sum += review.rating;
    current.count += 1;
    current.reviewCount += 1;
    metricsByMovieId.set(review.movieId, current);
  }

  return metricsByMovieId;
}

export function enrichMoviesWithReviewMetrics(movies: Movie[], metricsByMovieId: Map<string, MovieReviewMetrics>) {
  return movies.map((movie) => {
    const metrics = metricsByMovieId.get(movie.id);
    if (!metrics || metrics.count === 0) {
      return movie;
    }

    return {
      ...movie,
      avgRating: Number((metrics.sum / metrics.count).toFixed(1)),
      ratingCount: metrics.count,
      reviewCount: Math.max(movie.reviewCount || 0, metrics.reviewCount),
    };
  });
}
