import react from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatList from './chatList/ChatList'
import ConsultantList from './consultantList/ConsultantList'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarActiveTintColor: '#09BC8A',
        tabBarInactiveTintColor: '#a7a7a7',
        tabBarIndicatorStyle: { backgroundColor: '#09BC8A' },
      }}
    >
      <Tab.Screen name="전문가 목록" component={ConsultantList} />
      <Tab.Screen name="대화 목록" component={ChatList} />
    </Tab.Navigator>
  );
}
const Chat = () => (
  MyTabs()
);

export default Chat;


