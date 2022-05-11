import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageurls: [],
  breakfast: [],
  total_breakfast: [],
  lunch: [],
  total_lunch: [],
  dinner: [],
  total_dinner: [],
  add: [],
};

let nextId = 1;
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    set: (state, action) => {
      state.total = [{ total: action.payload.total, id: Date.now() }];
      state.breakfast = action.payload.breakfast.dietList;
      state.total_breakfast = action.payload.breakfast.total;
      state.lunch = action.payload.lunch.dietList;
      state.total_lunch = action.payload.lunch.total;
      state.dinner = action.payload.dinner.dietList;
      state.total_dinner = action.payload.dinner.total;
    },
    add: (state, action) => {
      state.add.push({ food: action.payload, id: nextId });
      nextId += 1;
    },
    remove: (state, action) =>
      state.imageurls.filter((image) => image.id !== action.payload),
  },
});

export const { set, add, remove } = imagesSlice.actions;

export default imagesSlice;
