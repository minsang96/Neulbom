import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import ConsultantCard from '../../../components/chat/ConsultantCard'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatSlice from '../../../slices/chat'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'

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

  console.log(consultants)
  useEffect(() => {
    console.log('Page: ConsultantList')
    getConsultantList()
  }, [])

  var sock = new SockJS('https://k6a104.p.ssafy.io/api/ws-stomp');
  var ws = Stomp.over(sock);
  const userInfo = useSelector((state) => state.user.userInfo);
  function connect() {
    // pub/sub event
    ws.connect({}, function(frame) {
        ws.subscribe(`/api/sub/user/${userInfo.userSeq}`, function(message) {
            var recv = JSON.parse(message.body);
            console.log('Root received msg: ', recv)
            // ws.subscribe(`/api/sub/chat/room/${recv.senderSeq}with${userInfo.userSeq}`, function(message) {

            // })
            dispatch(chatSlice.actions.setSocketConnected(recv.senderSeq))
        });
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
  useEffect(() => {
    if (userInfo && userInfo.userType === '1') {
      console.log('connect')
      connect()
    }
  }, [])
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