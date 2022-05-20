import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageurls: null,
  addS3url: null,
};
const userImageSlice = createSlice({
  // 이름
  name: "userImage",
  // 초기 상태
  initialState,
  // 리듀서
  reducers: {
    addS3url: (state, action) => {
      state.addS3url = action.payload;
    },
    addImageUrls: (state, action) => {
      state.imageurls = action.payload;
    },
  },
});

export const { setCalendar } = userImageSlice.actions;

export default userImageSlice;
