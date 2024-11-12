import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "./types";

const initialState: UserStateType = {
  access_token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<UserStateType>) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.access_token = null;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<UserStateType>>) => {
      if (action.payload.user) {
        state.user = action.payload.user;
      }

      if (action.payload.access_token) {
        state.access_token = action.payload.access_token;
      }
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUser } = authSlice.actions;

export default authSlice.reducer;
