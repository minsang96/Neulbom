import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendarList: [],
};
const calendarSlice = createSlice({
  // 이름
  name: "calendar",
  // 초기 상태
  initialState,
  // 리듀서
  reducers: {
    setCalendar: (state, action) => {
      state.calendarList = [action.payload];
    },
  },
});

export const { setCalendar } = calendarSlice.actions;

export default calendarSlice;
