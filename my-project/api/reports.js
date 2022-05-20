import client from "./client";

export async function getCalendarList(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/calendar/list",
    params: { date, userSeq },
  });
  return response.data.data;
}

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

export async function getDailyNutirent(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/nutrient",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getDailyOtherReport(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/daily/other",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getWeeklyBloodPressure(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/weekly/bloodpressure",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getWeeklyBloodSugar(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/weekly/bloodsugar",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getWeeklyCalorie(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/weekly/calorie",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getWeeklyNutirent(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/report/weekly/nutrient",
    params: { date, userSeq },
  });
  return response.data.data;
}

export async function getWeeklyDiet(date, userSeq) {
  const response = await client({
    method: "get",
    url: "/diet/weekly",
    params: { date, userSeq },
  });
  return response.data.data;
}
