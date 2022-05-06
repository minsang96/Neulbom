import client from "./client";
import { useDispatch, useSelector } from "react-redux";
import dietdailySlice from "../slices/dietdaily";

export async function getDiet(dietDate, userSeq) {
  // const dietdaily = useSelector((state) => state.dietdaily);
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
