import { View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import chatSlice from "../../../slices/chat";

const windowHeight = Dimensions.get('window').height*80/100

const ChatRoom = (props) => {
  console.log('Page: ChatRoom')
  const dispatch = useDispatch();
  var sock = new SockJS('https://k6a104.p.ssafy.io/api/ws-stomp');
  var ws = Stomp.over(sock);
  // var client = Stomp.Client('http://10.0.2.2:8081/api/ws-stomp')
  var reconnect = 0;
  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }
  const EnterRoom = async () => {
    const room_name = 'halo'
    let params = new URLSearchParams();
    params.append("name", room_name);
    await axios.get(`https://k6a104.p.ssafy.io/api/chat/room/enter/${userSeq}with${consultantSeq}`)
    .then(
      response => {
        alert(response.data.name+"방 개설에 성공하였습니다.")
      }
    ).catch( response => { alert("채팅방 개설에 실패하였습니다."); console.log(response)} );
  }

  // const consultantSeq = 3
  const consultantSeq = props.route.params.consultantSeq
  const userSeq = useSelector((state) => state.user.userSeq);
  // const userSeq = 23;
  const socketConnected = useSelector((state) => state.chat.socketConnected);
  const [ message, setMessage ] = useState('');
  const chat = useSelector(state => state.chat.chat)

  function sendMessage() {
    try {
      // send할 데이터
      const data = {type:'TALK', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq, message: message}
      // 빈문자열이면 리턴
      if (message === '') {
        return;
      }
      // 로딩 중
      // dispatch(chatActions.isLoading());
      waitForConnection(ws, function () {
        ws.send(
          '/pub/chat/message',
          {},
          JSON.stringify(data)
        );
        // console.log(ws.ws.readyState);
        setMessage('');
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }
  
  function connect() {
    // pub/sub event
    ws.connect({}, function(frame) {
        ws.subscribe(`/api/sub/chat/room/${userSeq}with${consultantSeq}`, function(message) {
            var recv = JSON.parse(message.body);
            console.log('received msg: ', recv)
            const storeChat = async () => {
              try {
                if (chat[consultantSeq].length > 0) {
                  await EncryptedStorage.setItem(
                    `chatWith${consultantSeq}`,
                    JSON.stringify({chat: [...chat[consultantSeq], recv]})
                    );
                  } else {
                    await EncryptedStorage.setItem(
                      `chatWith${consultantSeq}`,
                      JSON.stringify({chat: [recv]})
                  );
                }
              } catch {
                
              } finally {
                console.log('chat stored')
              }
            }
            if (recv.message) {
              dispatch(chatSlice.actions.setChat([consultantSeq, recv]))
              storeChat()
            }
        });
        ws.send("/pub/chat/message", {}, JSON.stringify({type:'ENTER', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq}));
        dispatch(chatSlice.actions.setSocketConnected(consultantSeq))
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
  // const storeChat = async () => {
  //   dispatch(chatSlice.actions.setChat([consultantSeq, {type:'TALK', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq, message: message}]))
  //   try {
  //     if (chat[consultantSeq].length > 0) {
  //       await EncryptedStorage.setItem(
  //         `chatWith${consultantSeq}`,
  //         JSON.stringify({chat: [...chat[consultantSeq], {type:'TALK', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq, message: message}]})
  //         );
  //       } else {
  //         await EncryptedStorage.setItem(
  //         `chatWith${consultantSeq}`,
  //         JSON.stringify({chat: [{type:'TALK', roomId: `${userSeq}with${consultantSeq}`, senderSeq: userSeq, message: message}]})
  //       );
  //     }
  //   } catch {
      
  //   } finally {
  //     setMessage('')
  //   }
  // }
  useEffect(() => {
    loadChat()
    // EnterRoom()
    if (!socketConnected.includes(consultantSeq)) {
      connect()
    }
  }, [])
  console.log('state chat: ', chat)
  const loadChat = async () => {
    try {
      const chatFromStorage = await EncryptedStorage.getItem(`chatWith${consultantSeq}`)
      let JsonChat;
      if (chatFromStorage !== undefined && chatFromStorage !== null) {
        JsonChat = JSON.parse(chatFromStorage);
        console.log('JsonChat: ')
        console.log(JsonChat)
        dispatch(chatSlice.actions.setInitialChat([consultantSeq, JsonChat['chat']]))
      }
    } catch {
      
    }
  }

  // async function deleteChat() {
  //   try {
  //     await EncryptedStorage.removeItem(`chatWith${consultantSeq}`);
  //     console.log('deleted successfully')

  //   } catch (error) {
      
  //   }
  // }
  return (
    <KeyboardAvoidingView style={{justifyContent: 'space-between', height: windowHeight, flex: 1}}>
      {/* <TouchableOpacity onPress={() => {deleteChat()}}><Text>대화 기록encrypted storage삭제</Text></TouchableOpacity> */}
      <ScrollView>
        {Object.keys(chat).includes(String(consultantSeq)) && chat[String(consultantSeq)].map(message => {
          return (
            <View style={{borderWidth: 1}}>
              <Text style={message && message.senderSeq === userSeq ? {alignSelf: 'flex-end'} : {}}>{message && message.message}</Text>
            </View>)
        })}
      </ScrollView>
      <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          value={message}
          style={{width: '90%'}}
          onChangeText={event => setMessage(event)}></TextInput>
        <ButtonGreen2 buttonName='전송' onPressButton={() => sendMessage()}></ButtonGreen2>
        {/* <ButtonGreen2 buttonName='전송' onPressButton={() => storeChat()}></ButtonGreen2> */}
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingTop: '1.5%'
  }
})