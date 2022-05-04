import { combineReducers } from "redux";

import imagesSlice from "../slices/images";
import dailyReportSlice from "../slices/dailyReport";

const rootReducer = combineReducers({
  images: imagesSlice.reducer,
  dailyReport: dailyReportSlice.reducer,
});

export default rootReducer;
