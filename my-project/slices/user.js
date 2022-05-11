import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSeq: null,
  accessToken: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userSeq = action.payload.userSeq;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.userSeq = null;
      state.accessToken = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
