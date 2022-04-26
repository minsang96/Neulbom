import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/main/Main";
import Calendar from "../screens/calendar/Calendar";
import Chat from "../screens/chat/Chat";
import Mypage from "../screens/mypage/Mypage";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="식단관리"
    screenOptions={{ tabBarActiveTintColor: "#09BC8A" }}
  >
    <Tab.Screen name="식단관리" component={Main}></Tab.Screen>
    <Tab.Screen name="건강달력" component={Calendar}></Tab.Screen>
    <Tab.Screen name="전문가상담" component={Chat}></Tab.Screen>
    <Tab.Screen name="마이페이지" component={Mypage}></Tab.Screen>
  </Tab.Navigator>
);

export default Tabs;
