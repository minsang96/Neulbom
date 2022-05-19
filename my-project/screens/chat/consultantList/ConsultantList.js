import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import ConsultantCard from '../../../components/chat/ConsultantCard'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatSlice from '../../../slices/chat'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import { retrieveChatList } from "../../../api/retrieveChatList";
import EncryptedStorage from "react-native-encrypted-storage";

const ConsultantList = () => {
  const dispatch = useDispatch();
  const consultants = useSelector(state => state.chat.consultants)
  const chatList = useSelector((state) => state.chat.chatList);

  console.log('Redux ChatList:', chatList)
  const getConsultantList = async() => {
    try {
      const res = await axios.get('https://k6a104.p.ssafy.io/api/consulting/expert')
      // console.log(res.data.data)
      dispatch(chatSlice.actions.setConsultants(res.data.data))
    } catch(error) {
      console.log(error)
      // Alert.alert('알림', 'email 혹은 패스워드가 틀립니다.');
    } finally {

    }
  }

  // console.log(consultants)
  useEffect(() => {
    console.log('Page: ConsultantList')
    getConsultantList()
  }, [])

  var sock = new SockJS('https://k6a104.p.ssafy.io/api/ws-stomp');
  var ws = Stomp.over(sock);
  var reconnect = 0;
  const userInfo = useSelector((state) => state.user.userInfo);
  const [ recv, setRecv ] = useState(0)
  
  function connect() {
    // pub/sub event
    ws.connect({}, function (frame) {
        ws.subscribe(`/api/sub/user/${userInfo.userSeq}`, function (message) {
          var recv = JSON.parse(message.body);
          console.log(`ConsultantList received msg:` , recv);
          // 또 소켓 연결
          // connect2(recv)
          setRecv(recv)
          storeChatList(recv)
          retrieveChatList(dispatch)
          dispatch(chatSlice.actions.setSocketConnected(recv.senderSeq))
        });
        // 또 소켓 연결
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
      }
      );
    }

  useEffect(() => {
    connect2(recv)
  }, [recv])
  function connect2(recv) {
    console.log('connect2 ran')
    ws.connect({}, function(frame) {
      console.log('connect2 connected')
      ws.subscribe(`/api/sub/chat/room/${recv.senderSeq}with${userInfo.userSeq}`, function(message) {
        var recv2 = JSON.parse(message.body);
        console.log("Consultant received user's msg: ", recv2);
        if (recv2.message) {
          dispatch(chatSlice.actions.setChat([recv.senderSeq, recv2]))
          // storeChat(recv)
        }
      })
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
    })
  }
  async function storeChatList(recv) {
    if (chatList.length > 0) {
      await EncryptedStorage.setItem(
        "chat_list",
        JSON.stringify({
          chatList: [...chatList, recv.senderSeq]
        })
        )
      } else {
        await EncryptedStorage.setItem(
          "chat_list",
          JSON.stringify({
            chatList: [recv.senderSeq]
          })
          )
          console.log('chatList was empty and one added')
        }
      }

  useEffect(() => {
    if (userInfo && userInfo.userType === '1') {
      console.log('ConsultantList connect')
      connect()
      retrieveChatList()
    }
  }, [])
  useEffect(() => {
    chatList.map(async(userSeq) => {
      try {
        const response = await axios.get(
          "https://k6a104.p.ssafy.io/api/member/chat",
          {
            params: { userSeq: Number(userSeq) },
          }
        );
        dispatch(chatSlice.actions.setUsers([userSeq, response.data.data]));
      } catch (err) {
        console.log(err);
      }
    })
  }, [chatList])
  return (
    <FlatList
    style={styles.container}
    horizontal={false}
    numColumns={2}
    ItemSeparatorComponent={
      Platform.OS !== 'android' &&
      (({ highlighted }) => (
        <View
        style={[
          style.separator,
          highlighted && { marginLeft: 0 }
        ]}
        />
        ))
      }
      data={consultants}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      renderItem={({ item, index, separators }) => (
        // data={[{item}, {item2}, {item3}]}
        <ConsultantCard consultantInfo={item}
          // key={item.userSeq}
        />
      )}
    />
  )
}

export default ConsultantList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: '2%'
  }
})