import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Calendar from "../screens/Calendar";
import Chat from "../screens/Chat";
import Mypage from "../screens/Mypage";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="main" component={Main}></Tab.Screen>
    <Tab.Screen name="calendar" component={Calendar}></Tab.Screen>
    <Tab.Screen name="chat" component={Chat}></Tab.Screen>
    <Tab.Screen name="myPage" component={Mypage}></Tab.Screen>
  </Tab.Navigator>
);

export default Tabs;
