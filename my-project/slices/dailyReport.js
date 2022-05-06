import { createSlice } from "@reduxjs/toolkit";

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducer: 액션이 실제로 실행되면 state를 바꾸는 로직
const initialState = {
  // 혈압
  todayBloodPressure: [],
  yesterdayBloodPressure: [],
  todayBloodSugar: [],
  yesterdayBloodSugar: [],
  calorie: [],
};
const dailyReportSlice = createSlice({
  // 이름
  name: "dailyReport",
  // 초기 상태
  initialState,
  // 리듀서
  reducers: {
    setDailyBloodPressureReport: (state, action) => {
      state.todayBloodPressure = action.payload.today;
      state.yesterdayBloodPressure = action.payload.yesterday;
    },
    setDailyBloodSugarReport: (state, action) => {
      state.todayBloodSugar = action.payload.today;
      state.yesterdayBloodSugar = action.payload.yesterday;
    },
    setDailyCalroieReport: (state, action) => {
      state.calorie = action.payload;
    },
  },
});

export const {
  setDailyBloodPressureReport,
  setDailyBloodSugarReport,
  setDailyCalroieReport,
} = dailyReportSlice.actions;

export default dailyReportSlice;
