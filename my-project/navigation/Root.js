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
// import SplashScreen from 'react-native-splash-screen';

const Nav = createNativeStackNavigator();

function Root() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const userInfo = useSelector((state) => state.user.userInfo);
  var sock = new SockJS("https://k6a104.p.ssafy.io/api/ws-stomp");
  var ws = Stomp.over(sock);
  function connect() {
    // pub/sub event
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/api/sub/user/${userInfo.userSeq}`, function (message) {
          var recv = JSON.parse(message.body);
          console.log("Root received msg: ", recv);
          // ws.subscribe(`/api/sub/chat/room/${recv.senderSeq}with${userInfo.userSeq}`, function(message) {

          // })
        });
        ws.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            type: "ENTER",
            roomId: `${userSeq}with${consultantSeq}`,
            senderSeq: userSeq,
          })
        );
        dispatch(chatSlice.actions.setSocketConnected(recv.senderSeq));
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
      if (userInfo && userInfo.userType === 1) {
        connect();
      }
    }
  }, []);

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
