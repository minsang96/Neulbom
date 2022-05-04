import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserMypage from "./userMypage/UserMypage";
import UserMypageUpdate from "./userMypageUpdate/UserMypageUpdate";
import ConsultantMypage from "./consultantMypage/ConsultantMypage";
import ConsultantMypageUpdate from "./consultantMypageUpdate/ConsultantMypageUpdate";

const NativeStack = createNativeStackNavigator();

const Mypage = () => {
  const [update, setUpdate] = useState(false);
  const onClick = () => {
    setUpdate(!update);
    console.log(update);
  };

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      {/* 일반 회원 */}
      {/* <NativeStack.Screen name="Mypage">
        {(props) => <UserMypage {...props} onClick={onClick} update={update} />}
      </NativeStack.Screen>
      <NativeStack.Screen name="MypageUpdate">
        {(props) => (
          <UserMypageUpdate {...props} onClick={onClick} update={update} />
        )}
      </NativeStack.Screen> */}
      {/* 전문가 회원 */}
      <NativeStack.Screen name="ConsultantMypage">
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
      </NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default Mypage;
