import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// [배달앱 클론코딩 - 리덕스 연결하기 편]
// 미들웨어 쓰는 이유
// redux-flipper 쓰기 때문
