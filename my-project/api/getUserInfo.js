

export default async function getUserInfo() {
  try {
    const response = await axios.get('https://k6a104.p.ssafy.io/api/member/info', {
      headers: { Authorization: res.data.data.accessToken },
      params: { userSeq: res.data.data.userSeq }
    })
    dispatch(userSlice.actions.setUserInfo(response.data.data))
  } catch(err) {
    console.log(err)
  }
}