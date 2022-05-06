import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ConsultantInfo() {
  const imgHeight = windowHeight*24/100
  const containerWidth = windowWidth*94/100
  const containerHiehgt = windowHeight*71.5/100
  return (
    <ScrollView style={styles.scrollviewContainer}>
      <View style={{...styles.container, borderRadius: containerWidth*4/100, height: containerHiehgt}}>
        <Text style={styles.name}>손형선</Text>
        <View style={{...styles.imgContainer}}>
          <Image
            source={require('../../../components/chat/me_160x200.jpg')}
            style={{...styles.img, height: imgHeight, borderRadius: imgHeight*16/100}}
          >
          </Image>
        </View>
        <Text style={styles.intro}>저는 양양사는 영양사입니다.</Text>
        <View style={styles.contents}>
          <Text style={styles.title}>자격 ✨</Text>
          <View style={styles.career}>
            <Text>  &#8226;  </Text>
            <Text>영양사 면허 (보건복지부)</Text>
          </View >
          <Text style={styles.title}>경력 📙</Text>
          <View style={styles.career}>
            <Text>  &#8226;  </Text>
            <Text>연세대학교 치의대학 2008년 졸업</Text>
          </View >
          <View style={styles.career}>
            <Text>  &#8226;  </Text>
            <Text>세브란스 병원 구강교정 레지던트 4년ddddddddddddddddddddddddddddddddddddddd</Text>
          </View >
        </View>

      </View>
    </ScrollView>
)}

const styles = StyleSheet.create({
  scrollviewContainer: {
    // paddingHorizontal: '9%',
  },
  container: {
    marginHorizontal: '6.5%',
    marginTop: '8%',
    paddingHorizontal: '6%',
    flex: 1,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#172A3A',
    // borderRadius: 14,
    // elevation: 10
  },
  name: {
    marginTop: '7.5%',
    fontSize: 23,
    fontWeight: '600',
  },
  imgContainer: { 
    marginTop: '5%',
    width: '45%',
  },
  img: {
    width: '100%',
  },
  intro: {
    marginTop: '7.5%',
    color: '#09BC8A',
    fontSize: 16,
    fontWeight: '600'
  },
  contents: {
    // marginTop: '5%',
    alignSelf: 'flex-start'
  },
  title: {
    marginTop: '5%',
    fontSize: 20,
  },
  career: {
    marginTop: '1%',
    flexDirection: 'row',
    paddingRight: '20%'
  }
})