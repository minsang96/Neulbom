import client from "./client";

// export async function addExerciseRecode(code, otherDate, otherTime, userSeq) {
//   // console.log(otherDto);
//   const response = await client({
//     method: "post",
//     url: "/other/add",
//     data: {
//       code,
//       otherDate,
//       otherTime,
//       userSeq,
//     },
//   });
//   return response.data;
// }

export async function addExerciseRecode(otherDto) {
  // console.log(otherDto);
  const response = await client({
    method: "post",
    url: "/other/add",
    data: otherDto,
  });
  return response.data;
}
