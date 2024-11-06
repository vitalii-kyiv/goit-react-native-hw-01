import { createSelector } from "reselect";
import { RootState } from "../store";

const selectPostsState = (state: RootState) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.posts
);
