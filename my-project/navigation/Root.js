import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import TabsConsultant from "./TabsConsultant";
import Stack from "./Stack";
import LoginStack from "./LoginStack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import userSlice from "../slices/user";
import { LogBox } from "react-native";
import { retrieveChatList } from "../api/retrieveChatList";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import chatSlice from "../slices/chat";
// import SplashScreen from 'react-native-splash-screen';

const Nav = createNativeStackNavigator();

function Root() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const userInfo = useSelector((state) => state.user.userInfo);
  const chatList = useSelector((state) => state.chat.chatList);

  var sock = new SockJS("https://k6a104.p.ssafy.io/api/ws-stomp");
  var ws = Stomp.over(sock);
  var reconnect = 0;
  if (userInfo && userInfo.userType === 1) {
    console.log("Root consultant chatList", chatList);
  }
  function connect() {
    // pub/sub event
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/api/sub/user/${userInfo.userSeq}`, function (message) {
          var recv = JSON.parse(message.body);
          console.log("Root received msg: ", recv);
          // 또 소켓 연결
          // connect2(recv)
          // console.log('connect2')
          storeChatList(recv);
          retrieveChatList(dispatch);
          dispatch(chatSlice.actions.setSocketConnected(recv.senderSeq));
        });
        // 또 소켓 연결
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

  async function storeChatList(recv) {
    if (chatList.length > 0) {
      await EncryptedStorage.setItem(
        "chat_list",
        JSON.stringify({
          chatList: [...chatList, recv.userSeq],
        })
      );
    } else {
      await EncryptedStorage.setItem(
        "chat_list",
        JSON.stringify({
          chatList: [recv.userSeq],
        })
      );
      console.log("chatList was empty and one added");
    }
  }

  // if (chatList.map(c => )) {

  // }

  useEffect(() => {
    LogBox.ignoreLogs(["SerializableStateInvariantMiddleware took"]);
    if (!accessToken) {
      const getUserSessionAndLogin = async () => {
        try {
          const session = await EncryptedStorage.getItem("user_session");
          // if (!session) {
          //   SplashScreen.hide();
          //   return;
          // }
          let JsonSession;
          if (session !== undefined) {
            JsonSession = JSON.parse(session);
            console.log(JsonSession);
          }
          const res = await axios.post(
            "https://k6a104.p.ssafy.io/api/user/login",
            {
              userEmail: JsonSession.email,
              userPwd: JsonSession.password,
            }
          );

          dispatch(userSlice.actions.login(res.data.data));
          try {
            const response = await axios.get(
              "https://k6a104.p.ssafy.io/api/member/info",
              {
                headers: { Authorization: res.data.data.accessToken },
                params: { userSeq: res.data.data.userSeq },
              }
            );
            dispatch(userSlice.actions.setUserInfo(response.data.data));
          } catch (err) {
            console.log(err);
          }
        } catch (error) {
          console.log("error: " + error);
        } finally {
        }
      };
      getUserSessionAndLogin();
      console.log("root");
      retrieveChatList(dispatch);
    }
    // if (userInfo && userInfo.userType === '1') {
    //   console.log('connect')
    //   connect()
    // }
  }, []);
  // console.log('Root userInfo: ', userInfo)

  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      {userInfo === null ? (
        <Nav.Screen name="LoginStack" component={LoginStack} />
      ) : accessToken && userInfo.userType == 0 ? (
        <Nav.Screen name="Tabs" component={Tabs} />
      ) : (
        <Nav.Screen name="TabsConsultant" component={TabsConsultant} />
      )}
      {/* <Nav.Screen name="Tabs" component={Tabs} /> */}
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
}

export default Root;
