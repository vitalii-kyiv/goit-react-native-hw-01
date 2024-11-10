import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  uid: null,
  displayName: null,
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ uid: string; displayName: string; email: string }>
    ) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectCurrentUser = (state) => state.user;

export default userSlice.reducer;
