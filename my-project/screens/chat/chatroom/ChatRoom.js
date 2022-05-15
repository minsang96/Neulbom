import { View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import axios from 'axios';

const windowHeight = Dimensions.get('window').height*40/100;

const ChatRoom = () => {
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

  const sender = 23
  const roomId = 23
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState({});

  function sendMessage() {
    try {
      // send할 데이터
      const data = {type:'TALK', roomId: roomId, sender: sender, message: message}
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
        console.log(ws.ws.readyState);
        // dispatch(chatActions.writeMessage(''));
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  // const sendMessage = () => {
  //   ws.send("/pub/chat/message", {}, JSON.stringify({type:'TALK', roomId: roomId, sender: sender, message: message}));
  //   setMessage('');
  // }
  const recvMessage = (recv) => {
    console.log('메세지받음')
    setMessages({"type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.sender,"message":recv.message}, ...messages)
  }
  function connect() {
    // pub/sub event
    ws.connect({}, function(frame) {
        ws.subscribe("/api/sub/chat/room/"+roomId, function(message) {
          console.log('받음')
          var recv = JSON.parse(message.body);
          console.log(recv)
            recvMessage(recv);
        });
        ws.send("/pub/chat/message", {}, JSON.stringify({type:'ENTER', roomId: roomId, senderSeq: sender, message: message}));
    }, function(error) {
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
  console.log('-------------------------------')
  // console.log(messages)
  useEffect(() => {
    connect()
  }, [])

  return (
    <View style={{justifyContent: 'space-between', height: windowHeight}}>
      <ScrollView>
        <Text>ChatRoom</Text>
        {/* {Object.keys(messages).length > 0 && messages.map(message => {
          return (
            <>
              <Text>{message.sender}</Text>
              <Text>{message.message}</Text>
            </>
        )})} */}
      </ScrollView>
      <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          value={message}
          style={{width: '90%'}}
          onChangeText={event => setMessage(event)}></TextInput>
        <ButtonGreen2 buttonName='전송' onPressButton={() => sendMessage()}></ButtonGreen2>
      </View>
    </View>
  )
}
  
export default ChatRoom;