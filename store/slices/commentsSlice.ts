import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const commentsCollection = collection(db, `posts/${postId}/comments`);
    const commentSnapshot = await getDocs(commentsCollection);
    const comments = commentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { postId, comments };
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, comment }) => {
    const commentsCollection = collection(db, `posts/${postId}/comments`);
    const docRef = await addDoc(commentsCollection, comment);
    const addedComment = { id: docRef.id, ...comment };
    return { postId, comment: addedComment };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state[postId] = comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state[postId]) {
          state[postId] = [];
        }
        state[postId].push(comment);
      });
  },
});

export const selectComments = (state, postId) => state.comments[postId] || [];
export default commentsSlice.reducer;
