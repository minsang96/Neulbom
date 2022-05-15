import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultantMypage from "./consultantMypage/ConsultantMypage";
import ConsultantMypageUpdate from "./consultantMypageUpdate/ConsultantMypageUpdate";
import { useSelector } from "react-redux";
import UserMypage from "./userMypage/UserMypage";
import UserMypageUpdate from "./userMypageUpdate/UserMypageUpdate";
import Notice from "../../components/infoBox/noticeCompo/Notice";
import Notice1 from "../../components/infoBox/noticeCompo/Notice1";
import ToS from "../../components/infoBox/noticeCompo/ToS";
import Nuelbom from "../../components/infoBox/noticeCompo/Nuelbom";
import Developers from "../../components/infoBox/noticeCompo/Developers";

const NativeStack = createNativeStackNavigator();

const Mypage = () => {
  const [update, setUpdate] = useState(false);
  const onClick = () => {
    setUpdate(!update);
  };
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      {userInfo.userType === "0" ? (
        <>
          <NativeStack.Screen name="Mypage">
            {(props) => (
              <UserMypage {...props} onClick={onClick} update={update} />
            )}
          </NativeStack.Screen>
          <NativeStack.Screen name="MypageUpdate">
            {(props) => (
              <UserMypageUpdate {...props} onClick={onClick} update={update} />
            )}
          </NativeStack.Screen>
        </>
      ) : (
        <>
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
        </>
      )}
      <NativeStack.Screen name="Notice" component={Notice} />
      <NativeStack.Screen name="Notice1" component={Notice1} />
      <NativeStack.Screen name="ToS" component={ToS} />
      <NativeStack.Screen name="Nuelbom" component={Nuelbom} />
      <NativeStack.Screen name="Developers" component={Developers} />
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
