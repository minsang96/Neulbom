import { Text } from 'react-native'

export const stylePasswordVerify = (info) => {
  let style
  if (!info.passwordVerification) {
    style = {height: 0}
  }
  return (
    style
  )
}
export const passwordVerify = (info) => {
  return (
    <>
      {info.password !== info.passwordVerification && <Text style={{color: 'red'}}>x</Text>}
      {info.password === info.passwordVerification && <Text style={{color: 'green'}}>✓</Text>}
    </>
  )
}