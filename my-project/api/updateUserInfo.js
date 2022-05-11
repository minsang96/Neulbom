import client from "./client";

export async function updateMemeberInfo(headers, data) {
  const response = await client({
    method: "put",
    url: "/member/modify",
    headers: { Authorization: headers },
    data,
  });
  return response.data;
}
