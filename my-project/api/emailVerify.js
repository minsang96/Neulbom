import axios from 'axios'

export function emailVerify(email) {
  // email검증
  axios.get('https://k6a104.p.ssafy.io/api/member/email/certified', {
    params: { email: email }
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}