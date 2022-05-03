import { View, Text, StyleSheet, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function UserLogin() {
  const loginBoxHeight = windowHeight*20/100
  const loginBoxWidth = windowWidth*80/100
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>안녕하세요</Text>
        <Text style={styles.text}>늘봄에 오신 것을 환영합니다.</Text>
      </View>
      <View style={{...styles.loginBox, height: loginBoxHeight, width: loginBoxWidth, borderRadius: loginBoxHeight*10/100}}>
        <Text>ㅎㅇ</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '25%',
    backgroundColor: '#fff',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  loginBox: {
    marginHorizontal: '20%',
    backgroundColor: '#e2e2e2',
  },
  textContainer: {
    marginBottom: '15%'
  }
})