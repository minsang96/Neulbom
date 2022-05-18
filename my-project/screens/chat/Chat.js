import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatList from './chatList/ChatList'
import ConsultantList from './consultantList/ConsultantList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConsultantInfo from './consultantInfo/ConsultantInfo'
import ChatRoom from './chatroom/ChatRoom'

const Tab = createMaterialTopTabNavigator();

const Chat = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarActiveTintColor: '#09BC8A',
        tabBarInactiveTintColor: '#a7a7a7',
        tabBarIndicatorStyle: { backgroundColor: '#09BC8A' },
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="전문가 목록" component={ConsultantStack} />
      <Tab.Screen name="대화 목록" component={ChatStack} />
    </Tab.Navigator>
  );
}

const NativeStack = createNativeStackNavigator();

function ConsultantStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <NativeStack.Screen name="ConsultantList" component={ConsultantList} />
      <NativeStack.Screen name="ConsultantInfo" component={ConsultantInfo} />
    </NativeStack.Navigator>
  );
}

function ChatStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <NativeStack.Screen name="ChatList" component={ChatList} />
      <NativeStack.Screen name="ChatRoom" component={ChatRoom} />
    </NativeStack.Navigator>
  );
}

export default Chat;