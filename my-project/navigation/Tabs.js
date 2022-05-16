import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../screens/mainpage/MainPage";
import Calendar from "../screens/calendar/Calendar";
import Chat from "../screens/chat/Chat";
import Mypage from "../screens/mypage/Mypage";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "../store";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Provider store={store}>
    <Tab.Navigator
      initialRouteName="식단관리"
      screenOptions={{
        tabBarActiveTintColor: "#09BC8A",
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="식단관리"
        component={MainPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "restaurant" : "restaurant-outline"}
                color={color}
                size={size}
              ></Ionicons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="건강달력"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "calendar" : "calendar-sharp"}
                color={color}
                size={size}
              ></Ionicons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="전문가상담"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                color={color}
                size={size}
              ></Ionicons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="마이페이지"
        component={Mypage}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                color={color}
                size={size}
              ></Ionicons>
            );
          },
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  </Provider>
);

export default Tabs;
