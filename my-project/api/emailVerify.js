import axios from 'axios'

export function emailVerify(email) {
  // email검증
  axios.get('https://neulbom_url/api/member/email/certified', {
    params: { email: email }
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}