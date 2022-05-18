import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSeq: null,
  accessToken: null,
  userInfo: null,
  consultantProfileImageUri: null,
  consultantCertImageUri: null,
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
      state.userSeq = null
      state.accessToken = null
      state.userInfo = null
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setConsultantProfileImageUri: (state, action) => {
      state.consultantProfileImageUri = action.payload
    },
    setConsultantCertImageUri: (state, action) => {
      state.consultantCertImageUri = action.payload
      console.log(state.consultantCertImageUri)
    },
    setUpdateCareer: (state, action) => {
      state.userInfo.expertCareer.push(action.payload);
    },
  },
});

export const {
  login,
  logout,
  // 등록 안해도 됨..
  setConsultantProfileImageUri,
} = userSlice.actions;

export default userSlice;
