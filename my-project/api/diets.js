import client from "./client";

export async function getDiet(dietDate, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  return response.data.data.total;
}

export async function getBreakfast(dietDate, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/daily",
    params: { dietDate, userSeq },
  });
  return response.data.data.breakfast;
}
