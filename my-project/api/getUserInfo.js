import client from "./client";

export async function getMemberInfo(headers, userSeq) {
  const response = await client({
    method: "get",
    url: "/member/info",
    headers: { Authorization: headers },
    params: { userSeq: userSeq },
  });
  return response.data;
}

export async function getExpertInfo(headers, userSeq) {
  const response = await client({
    method: "get",
    url: "/expert/info",
    headers: { Authorization: headers },
    params: { userSeq: userSeq },
  });
  return response.data;
}
