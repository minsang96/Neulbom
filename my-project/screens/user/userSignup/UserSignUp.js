import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import ButtonGreen2 from '../../../components/button/ButtonGreen2'

const windowWidth = Dimensions.get('window').width;

export default function UserSignUp({ navigation: {navigate} } ) {
  return (
    <View style={styles.container}>
      <View style={styles.textInputs}>
        <TextInput
          style={styles.input}
          placeholder='이메일'
          keyboardType='email-address'
        ></TextInput>
          <View style={styles.inputline}></View>
        <View style={styles.certification}>
          <View style={styles.certificationInput}>
            <TextInput
              style={styles.input}
              placeholder='인증번호'
              keyboardType='number-pad'
            ></TextInput>
            <View style={{...styles.inputline, width: '80%'}}></View>
          </View>
          <View
            style={styles.certificationButton}
          >
            <ButtonGreen2
              width={windowWidth*30/100}
              buttonName='이메일 인증'
              padding={8}
            ></ButtonGreen2>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder='비밀번호'
          secureTextEntry={true}
        ></TextInput>
        <View style={styles.inputline}></View>
        <TextInput
          style={styles.input}
          placeholder='비밀번호 확인'
          secureTextEntry={true}
        ></TextInput>
        <View style={styles.inputline}></View>
      </View>

      <ButtonGreen2
        width='100%'
        buttonName='늘봄 시작하기'
        padding={9.5}
        onPressButton={() => navigate('SuccessSignUpUser')}
      ></ButtonGreen2>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '8%',
    backgroundColor: '#fff',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  inputline: {
    backgroundColor: '#172A3A',
    width: '100%',
    height: 1,
    marginTop: '1%',
    marginBottom: '5%',
  },
  input: {
    alignSelf: 'flex-start',
    marginTop: '4%'
  },
  textInputs: {
    width: '100%',
    paddingHorizontal: '10%'
  },
  certification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '1%'
  },
  certificationInput: {
    width: '50%'
  },
  certificationButton: {
    marginBottom: '-3%'
  }
})