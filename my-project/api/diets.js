import { useSelector } from "react-redux";
import client from "./client";

export async function getDiet(dietDate, userSeq) {
  // const dietdaily = useSelector((state) => state.dietdaily);
  console.log("input", dietDate, userSeq);
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  // const dispatch = useDispatch();
  // dispatch(dietdailySlice.actions.add_total(response.data.data.total));

  return response.data.data;
}

export async function getBreakfast(dietDate, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  return response.data.data.breakfast;
}

export async function getLaunch(dietDate, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  return response.data.data.lunch;
}

export async function getDinner(dietDate, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  return response.data.data.dinner;
}

export async function searchDiet(keyword) {
  const response = await client({
    method: "get",
    url: "diet/search",
    params: { keyword, page: 1, size: 10 },
  });
  return response.data.data;
}

// 음식 인식 temp 함수
export async function analyzeDiet(userSeq, file) {
  console.log("analyzeDiet", userSeq, file);
  const response = await client({
    method: "post",
    url: "/diet/analyze",
    data: file,
    params: { userSeq: userSeq },
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return response.data;
  // return { message: "음식 분석 실패, 음식 검색을 이용하세요." };
}

// 식단 저장
export async function recordDiet(diets) {
  const response = await client({
    method: "post",
    url: "/diet/record",
    data: diets,
  });
  return response.data;
}

export async function uploadS3(file, userSeq) {
  const response = await client({
    method: "post",
    url: "/s3/upload",
    params: { category: "Diet", userSeq: userSeq },
    data: file,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return response;
}

export async function removeDiet(userSeq, authorization, data) {
  console.log("input remove", userSeq, authorization, data);
  const response = await client({
    method: "post",
    url: "/diet/remove",
    params: { userSeq: userSeq },
    data: data,
    headers: { Authorization: authorization },
  });
  return response.data;
}
