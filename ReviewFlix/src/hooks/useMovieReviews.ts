import { useCallback, useMemo } from "react";
import { useAuthContext } from "../context/AuthorizationContext";
import { NaryNode } from "../classes/Trees/Nary/NaryNode";
import { NaryTree } from "../classes/Trees/Nary/NaryTree";
import type { Review } from "../types/Review";
import { useReviews } from "./useReviews";
import { useCreate } from "./useCreate";
import { useUpdate } from "./useUpdate";
import { useDelete } from "./useDelete";

export type ReviewThread = Review & {
  replies?: ReviewThread[];
};

type SubmitReviewInput = {
  rating: number;
  content: string;
};

function buildThreadTree(movieId: string, reviews: Review[]) {
  const root = new NaryNode({
    id: `movie-${movieId}`,
    title: movieId,
    link: `/movie/${movieId}`,
  });
  const tree = new NaryTree({ root });
  const nodes = new Map<string, NaryNode>();

  const ordered = [...reviews].sort((left, right) => {
    const leftTime = new Date(left.createdAt || left.updatedAt || 0).getTime();
    const rightTime = new Date(right.createdAt || right.updatedAt || 0).getTime();
    return leftTime - rightTime;
  });

  for (const review of ordered) {
    nodes.set(review.id, new NaryNode({
      id: review.id,
      title: review.content,
      link: review.authorUsername || review.userId,
      data: review,
    }));
  }

  for (const review of ordered) {
    const node = nodes.get(review.id);
    if (!node) {
      continue;
    }

    if (review.parentId && nodes.has(review.parentId)) {
      tree.addChild(review.parentId, node);
    } else {
      root.addChild(node);
    }
  }

  return tree;
}

function nodeToThread(node: NaryNode): ReviewThread | null {
  if (!node.data) {
    return null;
  }

  return {
    ...node.data,
    replies: node.children
      .map(nodeToThread)
      .filter((reply): reply is ReviewThread => Boolean(reply)),
  };
}

export function useMovieReviews(movieId: string) {
  const { reviews: allReviews, loading, error } = useReviews();
  const { createDocument } = useCreate("reviews");
  const { updateDocument } = useUpdate("reviews");
  const { deleteDocument } = useDelete("reviews");
  const { user } = useAuthContext();

  const reviews = useMemo(() => {
    return allReviews.filter((review) => review.movieId === movieId);
  }, [allReviews, movieId]);

  const tree = useMemo(() => buildThreadTree(movieId, reviews), [movieId, reviews]);

  const threadedReviews = useMemo(() => {
    return tree.root.children
      .map(nodeToThread)
      .filter((review): review is ReviewThread => Boolean(review));
  }, [tree]);

  const submitReview = useCallback(async ({ rating, content }: SubmitReviewInput) => {
    if (!movieId || !user?.uid) {
      return null;
    }

    const trimmedContent = content.trim();
    const now = new Date().toISOString();
    const existing = reviews.find((review) => review.userId === user.uid && !review.parentId);
    const payload = {
      movieId,
      userId: user.uid,
      rating,
      content: trimmedContent,
      likes: existing?.likes ?? 0,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      parentId: null,
      authorName: user.displayName || user.email || "Usuario",
      authorAvatar: user.photoURL || "",
      authorUsername: user.email?.split("@")[0] || user.displayName || "usuario",
    };

    if (existing) {
      await updateDocument(existing.id, payload);
      return existing.id;
    }

    const created = await createDocument(payload);
    return created.id;
  }, [createDocument, movieId, reviews, updateDocument, user?.displayName, user?.email, user?.photoURL, user?.uid]);

  const replyToReview = useCallback(async (parentId: string, content: string) => {
    if (!movieId || !user?.uid) {
      return null;
    }

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return null;
    }

    const now = new Date().toISOString();
    const created = await createDocument({
      movieId,
      userId: user.uid,
      rating: 0,
      content: trimmedContent,
      likes: 0,
      createdAt: now,
      updatedAt: now,
      parentId,
      authorName: user.displayName || user.email || "Usuario",
      authorAvatar: user.photoURL || "",
      authorUsername: user.email?.split("@")[0] || user.displayName || "usuario",
    });

    return created.id;
  }, [createDocument, movieId, user?.displayName, user?.email, user?.photoURL, user?.uid]);

  const deleteReviewThread = useCallback(async (reviewId: string) => {
    if (!reviewId) {
      return;
    }

    const childrenByParentId = new Map<string, string[]>();

    for (const review of allReviews) {
      if (!review.parentId) {
        continue;
      }

      const children = childrenByParentId.get(review.parentId) ?? [];
      children.push(review.id);
      childrenByParentId.set(review.parentId, children);
    }

    const idsToDelete: string[] = [];
    const visit = (currentId: string) => {
      idsToDelete.push(currentId);
      for (const childId of childrenByParentId.get(currentId) ?? []) {
        visit(childId);
      }
    };

    visit(reviewId);

    await Promise.all(idsToDelete.map((id) => deleteDocument(id)));
  }, [allReviews, deleteDocument]);

  return {
    reviews: threadedReviews,
    flatReviews: reviews,
    tree,
    loading,
    error,
    submitReview,
    replyToReview,
    deleteReviewThread,
  };
}

export default useMovieReviews;