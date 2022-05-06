import { combineReducers } from "redux";

import imagesSlice from "../slices/images";
import dietdailySlice from "../slices/dietdaily";
import dailyReportSlice from "../slices/dailyReport";

const rootReducer = combineReducers({
  images: imagesSlice.reducer,
  dietdaily: dietdailySlice.reducer,
  dailyReport: dailyReportSlice.reducer,
});

export default rootReducer;
