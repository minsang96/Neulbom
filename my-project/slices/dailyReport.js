import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todayBloodPressure: [],
};
const dailyReportSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    add: (state, action) => {
      state.todayBloodPressure.push({ todayBloodPressure: action.payload });
    },
  },
});

export const { add } = dailyReportSlice.actions;

export default dailyReportSlice;
