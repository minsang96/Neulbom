import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSeq: null,
  accessToken: null,
  userInfo: null,
  isLoggin: false,
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
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoggin: (state, action) => {
      state.isLoggin = true;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
