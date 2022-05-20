import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultantMypage from "./consultantMypage/ConsultantMypage";
import ConsultantMypageUpdate from "./consultantMypageUpdate/ConsultantMypageUpdate";
import { useSelector } from "react-redux";
import UserMypage from "./userMypage/UserMypage";
import UserMypageUpdate from "./userMypageUpdate/UserMypageUpdate";
import Notice from "../../components/infoBox/noticeCompo/Notice";
import Notice1 from "../../components/infoBox/noticeCompo/Notice1";
import Notice2 from "../../components/infoBox/noticeCompo/Notice2";
import ToS from "../../components/infoBox/noticeCompo/ToS";
import Neulbom from "../../components/infoBox/noticeCompo/Neulbom";
import Developers from "../../components/infoBox/noticeCompo/Developers";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NativeStack = createNativeStackNavigator();

const Mypage = () => {
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  const onClick = () => {
    setUpdate(!update);
  };
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <NativeStack.Navigator>
      {userInfo.userType === "0" ? (
        <>
          <NativeStack.Screen
            name="Mypage"
            options={{
              title: "마이 페이지",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MypageUpdate"), onClick();
                  }}
                >
                  <Text style={{ color: "#09BC8A" }}>수정</Text>
                </TouchableOpacity>
              ),
            }}
          >
            {(props) => (
              <UserMypage {...props} onClick={onClick} update={update} />
            )}
          </NativeStack.Screen>
          <NativeStack.Screen
            name="MypageUpdate"
            options={{
              title: "마이 페이지",
            }}
          >
            {(props) => (
              <UserMypageUpdate {...props} onClick={onClick} update={update} />
            )}
          </NativeStack.Screen>
        </>
      ) : (
        <>
          <NativeStack.Screen
            name="ConsultantMypage"
            options={{
              title: "마이 페이지",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ConsultantMypageUpdate"), onClick();
                  }}
                >
                  <Text style={{ color: "#09BC8A" }}>수정</Text>
                </TouchableOpacity>
              ),
            }}
          >
            {(props) => (
              <ConsultantMypage {...props} onClick={onClick} update={update} />
            )}
          </NativeStack.Screen>
          <NativeStack.Screen
            name="ConsultantMypageUpdate"
            options={{ title: "마이 페이지" }}
          >
            {(props) => (
              <ConsultantMypageUpdate
                {...props}
                onClick={onClick}
                update={update}
              />
            )}
          </NativeStack.Screen>
        </>
      )}
      <NativeStack.Screen
        options={{ title: "공지사항" }}
        name="Notice"
        component={Notice}
      />
      <NativeStack.Screen
        name="Notice1"
        component={Notice1}
        options={{ title: "공지사항" }}
      />
      <NativeStack.Screen
        name="Notice2"
        component={Notice2}
        options={{ title: "공지사항" }}
      />
      <NativeStack.Screen
        name="ToS"
        component={ToS}
        options={{ title: "이용약관" }}
      />
      <NativeStack.Screen
        name="Neulbom"
        component={Neulbom}
        options={{ title: "늘봄소개" }}
      />
      <NativeStack.Screen
        name="Developers"
        component={Developers}
        options={{ title: "늘보미들" }}
      />
      {/* <NativeStack.Screen name="ConsultantMypage">
        {(props) => (
          <ConsultantMypage {...props} onClick={onClick} update={update} />
        )}
      </NativeStack.Screen>
      <NativeStack.Screen name="ConsultantMypageUpdate">
        {(props) => (
          <ConsultantMypageUpdate
            {...props}
            onClick={onClick}
            update={update}
          />
        )}
      </NativeStack.Screen> */}
    </NativeStack.Navigator>
  );
};

export default Mypage;
