import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  useCallback,
} from "react-native";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import chatSlice from "../../../slices/chat";
import { GiftedChat } from "react-native-gifted-chat";

const windowHeight = (Dimensions.get("window").height * 80) / 100;

const ChatRoom = (props) => {
  console.log(
    "-----------------------------------------------------------------------"
  );
  console.log("Page: ChatRoom");
  const dispatch = useDispatch();
  var sock = new SockJS("https://k6a104.p.ssafy.io/api/ws-stomp");
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

  // const consultantSeq = 3
  const consultantSeq = props.route.params.consultantSeq;
  const userSeq = useSelector((state) => state.user.userSeq);
  // const userSeq = 23;
  const socketConnected = useSelector((state) => state.chat.socketConnected);
  const [message, setMessage] = useState("");
  const chat = useSelector((state) => state.chat.chat);
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const kr_curr = new Date(utc + 9 * 60 * 60 * 1000);
  const userInfo = useSelector((state) => state.user.userInfo);

  function sendMessage() {
    try {
      let data;
      if (userInfo.userType === "0") {
        data = {
          type: "TALK",
          roomId: `${userSeq}with${consultantSeq}`,
          senderSeq: userSeq,
          message: message,
          time: kr_curr,
        };
      } else {
        data = {
          type: "TALK",
          roomId: `${consultantSeq}with${userSeq}`,
          senderSeq: userSeq,
          message: message,
          time: kr_curr,
        };
      }
      if (message === "") {
        return;
      }
      // 로딩 중
      // dispatch(chatActions.isLoading());
      waitForConnection(ws, function () {
        ws.send("/pub/chat/message", {}, JSON.stringify(data));
        // console.log(ws.ws.readyState);
        setMessage("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }
  const recvMessage = (recv) => {
    console.log("메세지받음");
    setMessages(
      {
        type: recv.type,
        sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      },
      ...messages
    );
  };

  const storeChat = async (recv) => {
    try {
      console.log("store triedbads");
      console.log("함수 chat ", this.chat);
      console.log(chat[consultantSeq]);
      if (chat[consultantSeq]) {
        console.log("chat[consultantSeq].length > 0");
        await EncryptedStorage.setItem(
          `chatWith${consultantSeq}`,
          JSON.stringify({ chat: [...chat[consultantSeq], recv] })
        );
      } else {
        console.log("!chat[consultantSeq]");
        await EncryptedStorage.setItem(
          `chatWith${consultantSeq}`,
          JSON.stringify({ chat: [recv] })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log("chat stored");
    }
  };
  function connect() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(
          `/api/sub/chat/room/${userSeq}with${consultantSeq}`,
          function (message) {
            var recv = JSON.parse(message.body);
            console.log("received msg: ", recv);
            if (recv.message) {
              dispatch(chatSlice.actions.setChat([consultantSeq, recv]));

              storeChat(recv);
            }
          }
        );
        ws.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            type: "ENTER",
            roomId: `${userSeq}with${consultantSeq}`,
            senderSeq: userSeq,
            recvSeq: consultantSeq,
          })
        );
        dispatch(chatSlice.actions.setSocketConnected(consultantSeq));
      },
      function (error) {
        console.log("error:");
        console.log(error);
        if (reconnect++ <= 5) {
          setTimeout(function () {
            console.log("connection reconnect");
            sock = new SockJS("https://k6a104.p.ssafy.io/api/ws-stomp");
            ws = Stomp.over(sock);
            connect();
          }, 10 * 1000);
        }
      }
    );
  }
  useEffect(() => {
    loadChat();
    // EnterRoom()
    if (!socketConnected.includes(consultantSeq)) {
      connect();
    }
  }, []);
  console.log(`${userSeq}'s state chat: `, chat[consultantSeq]);

  let JsonChat;
  const loadChat = async () => {
    console.log("loadChat");
    try {
      const chatFromStorage = await EncryptedStorage.getItem(
        `chatWith${consultantSeq}`
      );
      // console.log(chatFromStorage);
      if (chatFromStorage !== undefined && chatFromStorage !== null) {
        JsonChat = JSON.parse(chatFromStorage);
        // console.log("JsonChat: ");
        // console.log(JsonChat);
        dispatch(
          chatSlice.actions.setInitialChat([consultantSeq, JsonChat["chat"]])
        );
      }
    } catch {}
  };

  async function deleteChat() {
    try {
      await EncryptedStorage.removeItem(`chatWith${consultantSeq}`);
      console.log("deleted successfully");
    } catch (error) {}
  }
  // 채팅방을 나갔다 다시 들어올 시
  // 전문가로 로그인했을 시에만 잘 작동함
  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "white",
        justifyContent: "space-between",
        height: windowHeight,
        flex: 1,
        paddingTop: "3%",
      }}
    >
      {/* <TouchableOpacity onPress={() => {deleteChat()}}><Text>대화 기록encrypted storage삭제</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {dispatch(chatSlice.actions.clearChat())}}><Text>대화 기록 redux삭제</Text></TouchableOpacity> */}
      <ScrollView>
        {Object.keys(chat).includes(String(consultantSeq)) &&
          chat[String(consultantSeq)].map((message) => {
            return (
              <View>
                {/* <Text style={message && message.senderSeq === userSeq ? {alignSelf: 'flex-end'} : {}}>{message && message.message}</Text> */}
                {message && message.senderSeq === userSeq ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "70%",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <Text style={{...styles.timeText, alignSelf: 'flex-end', marginRight: 10, paddingBottom: 2}}>{Number(message.time.slice(11,13)) < 12 ? message.time.slice(11,16)+' AM' : Number(message.time.slice(11,13))-12+':'+message.time.slice(14,16)+' PM'}</Text> */}
                    <Text style={{ ...styles.textBox, alignSelf: "flex-end" }}>
                      {message && message.message}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", width: "70%" }}>
                    <Text
                      style={{
                        ...styles.textBox,
                        backgroundColor: "#F8E16C",
                        alignSelf: "flex-start",
                      }}
                    >
                      {message && message.message}
                    </Text>
                    {/* <Text style={{...styles.timeText, alignSelf: 'flex-end', marginLeft: 6, paddingBottom: 2}}>{Number(message.time.slice(11,13)) < 12 ? message.time.slice(11,16)+' AM' : Number(message.time.slice(11,13))-12+':'+message.time.slice(14,16)+' PM'}</Text> */}
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
      <View
        style={{
          paddingRight: "1%",
          borderTopColor: "rgba(23, 42, 58, 0.25)",
          borderTopWidth: 1,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          value={message}
          style={{ width: "90%" }}
          multiline={true}
          onChangeText={(event) => setMessage(event)}
        ></TextInput>
        <ButtonGreen2
          buttonName="전송"
          padding={2.5}
          borderRadius={4}
          onPressButton={() => sendMessage()}
        ></ButtonGreen2>
        {/* <ButtonGreen2 buttonName='전송' onPressButton={() => storeChat()}></ButtonGreen2> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  textBox: {
    margin: 3,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#e2e2e2",
    borderRadius: 8,
  },
  timeText: {
    fontSize: 13,
    color: "#172A3A",
  },
});
