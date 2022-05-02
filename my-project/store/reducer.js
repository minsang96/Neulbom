import { combineReducers } from "redux";

import imagesSlice from "../slices/images";

const rootReducer = combineReducers({
  images: imagesSlice.reducer,
});

export default rootReducer;
