import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import postsReducer from "../slices/postsSlice";
import commentsReducer from "../slices/commentsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
