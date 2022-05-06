import { View, Text, StyleSheet } from 'react-native'
import ButtonGreen2 from '../../../components/button/ButtonGreen2'

export default function SuccessSignUp({navigation: {navigate}}) {
  return (
    <View style={styles.textContainer}>
      <Text>가입이 완료되었습니다!</Text>
      <Text>자격 인증이 완료되면입력하신 이메일로 알려드리겠습니다!</Text>
      <ButtonGreen2
        width='100%'
        buttonName='홈으로 이동'
        padding={9.5}
        onPressButton={() => navigate('Chat')}
      ></ButtonGreen2>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: '10%',
    alignItems: 'center'
  }
})