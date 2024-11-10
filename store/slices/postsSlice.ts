import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Post {
  id: string;
  content: string;
  comments: string[];
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const postsCollection = collection(db, "posts");
  const postSnapshot = await getDocs(postsCollection);
  const posts = postSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost: Omit<Post, "id">) => {
    const postsCollection = collection(db, "posts");
    const docRef = await addDoc(postsCollection, newPost);
    return { id: docRef.id, ...newPost };
  }
);

export const addCommentToPost = createAsyncThunk(
  "posts/addCommentToPost",
  async ({ postId, comment }: { postId: string; comment: string }) => {
    const postDoc = doc(db, "posts", postId);
    await updateDoc(postDoc, {
      comments: [
        ...(initialState.posts.find((p) => p.id === postId)?.comments || []),
        comment,
      ],
    });
    return { postId, comment };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.postId);
        if (post) {
          post.comments.push(action.payload.comment);
        }
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
