import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: [],
  breakfast: [],
  total_breakfast: [],
  lunch: [],
  total_lunch: [],
  dinner: [],
  total_dinner: [],
  recommend: [],
};

const dietdailySlice = createSlice({
  name: "dietdaily",
  initialState,
  reducers: {
    set_diet: (state, action) => {
      state.total = [{ total: action.payload.total, id: Date.now() }];
      state.breakfast = action.payload.breakfast.dietList;
      state.total_breakfast = action.payload.breakfast.total;
      state.lunch = action.payload.lunch.dietList;
      state.total_lunch = action.payload.lunch.total;
      state.dinner = action.payload.dinner.dietList;
      state.total_dinner = action.payload.dinner.total;
      console.log(state);
    },

    set_recommend: (state, action) => {
      state.recommend = action.payload.recommend;
    },

    set_total: (state, action) => {
      state.total = [{ total: action.payload, id: Date.now() }];
    },

    remomve_total: (state, action) => {
      state.total.filter((total) => total.id !== action.payload);
    },

    set_breakfast: (state, action) => {
      state.breakfast = [{ total: action.payload, id: Date.now() }];
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
  },
});

export const {
  set_diet,
  set_total,
  set_breakfast,
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
