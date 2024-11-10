import { createSelector } from "reselect";

const selectCommentsState = (state) => state.comments;

export const selectCommentsForPost = createSelector(
  [selectCommentsState, (_, postId) => postId],
  (comments, postId) => comments[postId] || []
);
