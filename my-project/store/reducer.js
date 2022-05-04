import { combineReducers } from "redux";

import imagesSlice from "../slices/images";
import dietdailySlice from "../slices/dietdaily";

const rootReducer = combineReducers({
  images: imagesSlice.reducer,
  dietdaily: dietdailySlice.reducer,
});

export default rootReducer;
