import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native'
import ButtonGreen2 from '../../../components/button/ButtonGreen2'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ConsultantInfo(props) {
  const navigation = useNavigation();
  const imgHeight = windowHeight*24/100
  const containerWidth = windowWidth*94/100
  const containerHiehgt = windowHeight*71.5/100

  const userSeq = useSelector(state => state.user.userSeq)
  const toChatRoom = async () => {
    const room_name = 'halo'
    let params = new URLSearchParams();
    params.append("name", room_name);
    const findAllRoom = async () => {
      try {
        await axios.get('https://k6a104.p.ssafy.io/api/chat/rooms').then(response => { this.chatrooms = response.data; });
      } catch(err) {
        console.log(err)
      }
    }
    await axios.get(`https://k6a104.p.ssafy.io/api/chat/room/enter/${String(userSeq)}`)
    .then(
      response => {
        alert(response.data.name+"방 개설에 성공하였습니다.")
        // findAllRoom();
        navigation.navigate("ChatRoom")
      }
      )
      .catch( response => { alert("채팅방 개설에 실패하였습니다."); console.log(response)} );
  }

  return (
    <ScrollView style={styles.scrollviewContainer}>
      <View style={{...styles.container, borderRadius: containerWidth*4/100}}>
        <Text style={styles.name}>{}손형선</Text>
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
        <ButtonGreen2 
          buttonName='상담하기'
          width='100%'
          padding={10}
          onPressButton={() => toChatRoom()}></ButtonGreen2>
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