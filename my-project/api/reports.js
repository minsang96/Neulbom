import client from "./client";

export async function getDailyBloodPressure(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/bloodpressure",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getDailyBloodSugar(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/bloodsugar",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getDailyCalorie(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/calorie",
    params: { date, userSeq },
  });
  return response.data.data;
}
