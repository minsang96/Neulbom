import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageurls: [],
};
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    add: (state, action) => {
      state.imageurls.push({ imageurls: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.imageurls.filter((image) => image.id !== action.payload),
  },
});

export const { add, remove } = imagesSlice.actions;

export default imagesSlice;
