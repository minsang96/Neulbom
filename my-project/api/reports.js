import client from "./client";

export async function getDailyBloodpressure(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/bloodpressure",
    params: { date, userSeq },
  });
  return response.data.data;
}
