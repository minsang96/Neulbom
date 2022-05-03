import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import ButtonGray from '../../../components/button/ButtonSignUp';
import ButtonGreen2 from '../../../components/button/ButtonGreen2'
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const login = () => {

}

export default function UserLogin({ navigation: { navigate }} ) {
  // const navigation = useNavigation();
  const loginBoxHeight = windowHeight*28/100
  const loginBoxWidth = windowWidth*80/100
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <Text style={styles.text}>안녕하세요</Text>
        <Text style={styles.text}>늘봄에 오신 것을 환영합니다.</Text>
      </View>
      <View style={{...styles.loginBox, height: loginBoxHeight, width: loginBoxWidth, borderRadius: loginBoxWidth*5/100}}>
        <TextInput
          style={styles.input}
          placeholder='이메일'
          keyboardType='email-address'
        ></TextInput>
        <View style={styles.inputline}></View>
        <TextInput
          style={styles.input}
          placeholder='비밀번호'
          secureTextEntry={true}
        ></TextInput>
        <View style={styles.inputline}></View>
        <ButtonGreen2
          onPressButton={() => navigate('MainPage')}
          buttonName='로그인'
          fontSize={15}
          padding={9.5}
        ></ButtonGreen2>
      </View>
      <ButtonGray
        onPressButton={() => navigate('UserSignUp')}
        buttonName='일반회원 회원가입'
        ></ButtonGray>
      <ButtonGray
        onPressButton={() => navigate('ConsultantSignUp')}
        buttonName='전문가 회원가입'
      ></ButtonGray>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '28%',
    backgroundColor: '#fff',
    height: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    marginBottom: '12%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  loginBox: {
    marginHorizontal: '20%',
    backgroundColor: 'rgba(226,226,226,0.2)',
    paddingHorizontal: '10%',
    paddingTop: '5%',
    elevation: 1,
    marginBottom: '5%'
  },
  inputline: {
    backgroundColor: '#172A3A',
    width: '100%',
    height: 1,
    marginTop: '1%',
    marginBottom: '5%'
  },
  input: {
    alignSelf: 'flex-start',
    marginTop: '4%'
  },
})