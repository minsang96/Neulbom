import client from "./client";

export async function updateMemeberInfo(headers, params) {
  const response = await client({
    method: "post",
    url: "/member/modify",
    headers: { Authorization: headers },
    params: { memberModifyDto: params },
  });
  return response.data.data;
}
