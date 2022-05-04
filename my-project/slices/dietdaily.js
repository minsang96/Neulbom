import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: [],
  breakfast: [],
  lunch: [],
  dinner: [],
};

const dietdailySlice = createSlice({
  name: "dietdaily",
  initialState,
  reducers: {
    add_total: (state, action) => {
      state.total.push({ total: action.payload, id: Date.now() });
    },
    remomve_total: (state, action) =>
      state.total.filter((total) => total.id !== action.payload),
  },
  add_breakfast: (state, action) =>
    state.breakfast.push({ breakfast: action.payload, id: Date.now() }),

  add_lunch: (state, action) =>
    state.lunch.push({ lunch: action.payload, id: Date.now() }),

  add_dinner: (state, action) =>
    state.dinner.push({ dinner: action.payload, id: Date.now() }),

  remomve_breakfast: (state, action) =>
    state.total.filter((breakfast) => breakfast.id !== action.payload),

  remomve_lunch: (state, action) =>
    state.total.filter((lunch) => lunch.id !== action.payload),

  remomve_dinner: (state, action) =>
    state.total.filter((dinner) => dinner.id !== action.payload),
});

export const {
  add_total,
  remomve_total,
  add_breakfast,
  add_lunch,
  add_dinner,
  remomve_breakfast,
  remomve_lunch,
  remomve_dinner,
} = dietdailySlice.actions;

export default dietdailySlice;
