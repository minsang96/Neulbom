import client from "./client";

export async function getMemeberInfo(headers, userSeq) {
  const response = await client({
    method: "get",
    url: "/member/info",
    headers: { Authorization: headers },
    params: { userSeq: userSeq },
  });
  return response.data;
}
