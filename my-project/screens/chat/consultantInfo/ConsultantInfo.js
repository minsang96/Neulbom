import { View, Text, Image, ScrollView, StyleSheet, Dimensions, LogBox } from 'react-native';
import ButtonGreen2 from '../../../components/button/ButtonGreen2';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import { useEffect, useState } from 'react';
import { retrieveChatList } from '../../../api/retrieveChatList';
import axios from 'axios';
import SockJS from "sockjs-client";
import Stomp from 'stompjs'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ConsultantInfo(props) {
  console.log('Page: ConsultantInfo')
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const imgHeight = windowHeight*24/100
  const containerWidth = windowWidth*94/100
  const containerHiehgt = windowHeight*71.5/100
  const consultantSeq = props.route.params.userSeq
  const chatList = useSelector((state) => state.chat.chatList);
  const [ consultantInfo, setConsultantInfo ] = useState({});
  const userSeq = useSelector((state) => state.user.userSeq);
  const getConsultantInfo = async () => {
    await axios.get('https://k6a104.p.ssafy.io/api/expert/detail', {
      params: {userSeq: consultantSeq}
    }).then(res=> {
      setConsultantInfo(res.data.data)
    })
  }

  const toChatRoom = async () => {
    if (!chatList.includes(consultantSeq)) {
      console.log('new consultant')
      try {
        if (chatList.length > 0) {
          await EncryptedStorage.setItem(
            "chat_list",
            JSON.stringify({
              chatList: [...chatList, consultantSeq]
            })
          )
        } else {
          await EncryptedStorage.setItem(
            "chat_list",
            JSON.stringify({
              chatList: [consultantSeq]
            })
          )
          console.log('chatList was empty and one added')
        }
      } catch (error) {
        
      } finally {
        console.log('chatList stored')
        retrieveChatList(dispatch)
        var sock = new SockJS('https://k6a104.p.ssafy.io/api/ws-stomp');
        var ws = Stomp.over(sock);
        var reconnect = 0;
        function connect() {
          // pub/sub event
          console.log('first time connect')
          ws.connect({}, function(frame) {
            ws.subscribe(`/api/sub/user/${userSeq}`, function(message) {
              var recv = JSON.parse(message.body);
              console.log('received msg: ', recv)
          });
            ws.send("/pub/chat/message", {}, JSON.stringify({type:'CREATE', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq, recvSeq: consultantSeq, message: 'created'}));
          }, function(error) {
              console.log('error:')
              console.log(error)
              if(reconnect++ <= 5) {
                  setTimeout(function() {
                      console.log("connection reconnect");
                      sock = new SockJS("https://k6a104.p.ssafy.io/api/ws-stomp");
                      ws = Stomp.over(sock);
                      connect();
                  },10*1000);
              }
          });
        }
        connect()
      }
    }
    navigation.navigate("ChatRoom", {consultantName: consultantInfo.expertName, consultantSeq: consultantSeq})
  }

  useEffect(() => {
    getConsultantInfo()
    LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.'])
  }, [])

  // const userSeq = useSelector(state => state.user.userSeq)
  // const toChatRoom = async () => {
  //   const room_name = 'halo'
  //   let params = new URLSearchParams();
  //   params.append("name", room_name);
  //   const findAllRoom = async () => {
  //     try {
  //       await axios.get('https://k6a104.p.ssafy.io/api/chat/rooms').then(response => { this.chatrooms = response.data; });
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  //   await axios.get(`https://k6a104.p.ssafy.io/api/chat/room/enter/${String(userSeq)}`)
  //   .then(
  //     response => {
  //       alert(response.data.name+"방 개설에 성공하였습니다.")
  //       navigation.navigate("ChatRoom")
  //     }
  //   ).catch( response => { alert("채팅방 개설에 실패하였습니다."); console.log(response)} );
  // }

  return (
    <ScrollView style={styles.scrollviewContainer}>
      <View style={{...styles.container, borderRadius: containerWidth*4/100}}>
        <Text style={styles.name}>{consultantInfo.expertName}</Text>
        <View style={{...styles.imgContainer}}>
          <Image
            source={require('../../../components/chat/me_160x200.jpg')}
            style={{...styles.img, height: imgHeight, borderRadius: imgHeight*16/100}}
          >
          </Image>
        </View>
        <Text style={styles.intro}>{consultantInfo.expertDesc}</Text>
        <View style={styles.contents}>
          <Text style={styles.title}>자격 ✨</Text>
          <View style={styles.career}>
            <Text>  &#8226;  </Text>
            <Text>{consultantInfo.expertCert}</Text>
          </View >
          <Text style={styles.title}>경력 📙</Text>
          {consultantInfo.expertCareer && consultantInfo.expertCareer.map(c => 
          <View style={styles.career}>
            <Text>  &#8226;  </Text>
            <Text>{c.careerContent}</Text>
          </View >
          )}
        </View>
        <ButtonGreen2 
          buttonName='상담하기'
          width='100%'
          padding={10}
          borderRadius={10}
          onPressButton={() => toChatRoom()}></ButtonGreen2>
      </View>
    </ScrollView>
)}

const styles = StyleSheet.create({
  scrollviewContainer: {
    // paddingHorizontal: '9%',
    backgroundColor: 'white'
  },
  container: {
    marginHorizontal: '6.5%',
    marginTop: '8%',
    marginBottom: '4%',
    paddingHorizontal: '6%',
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#172A3A',
    paddingBottom: '2%',
    // borderRadius: 14,
    elevation: 1
  },
  name: {
    marginTop: '9.5%',
    fontSize: 23,
    fontWeight: '600',
  },
  imgContainer: { 
    marginTop: '8%',
    width: '45%',
  },
  img: {
    width: '100%',
  },
  intro: {
    marginTop: '8%',
    color: '#09BC8A',
    fontSize: 17,
    fontWeight: '600'
  },
  contents: {
    marginTop: '0.5%',
    alignSelf: 'flex-start',
    marginBottom: '2%'
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