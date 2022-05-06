import { createSlice } from "@reduxjs/toolkit";

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducer: 액션이 실제로 실행되면 state를 바꾸는 로직
const initialState = {
  weeklyBloodPressure: [],
};
const weeklyReportSlice = createSlice({
  // 이름
  name: "weeklyReport",
  // 초기 상태
  initialState,
  // 리듀서
  reducers: {
    setWeeklyBloodPressureReport: (state, action) => {
      state.weeklyBloodPressure = [action.payload];
    },
  },
});

export const { setWeeklyBloodPressureReport } = weeklyReportSlice.actions;

export default weeklyReportSlice;
