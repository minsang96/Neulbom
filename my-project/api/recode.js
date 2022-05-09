import client from "./client";

export async function addOtherRecodeFunction(otherDto) {
  const response = await client({
    method: "post",
    url: "/other/add",
    data: otherDto,
  });
  return response.data;
}

export async function addBPRecodeFunction(bloodPressureDto) {
  const response = await client({
    method: "post",
    url: "/record/bp",
    data: bloodPressureDto,
  });
  return response.data;
}

export async function addBSRecodeFunction(bloodSugarDto) {
  const response = await client({
    method: "post",
    url: "/record/bs",
    data: bloodSugarDto,
  });
  return response.data;
}
