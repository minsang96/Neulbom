import react from "react";
import { View, Text } from "react-native";
import CalendarTab from "./calendarTab/CalendarTab";
import DailyReport from "./dailyReport/DailyReport";
import WeeklyReport from "./weeklyReport/WeeklyReport";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Calendar = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarActiveTintColor: "#09BC8A",
        tabBarInactiveTintColor: "#a7a7a7",
        tabBarIndicatorStyle: { backgroundColor: "#09BC8A" },
      }}
    >
      <Tab.Screen name="달력" component={CalendarTab} />
      <Tab.Screen name="일간 리포트" component={DailyReport} />
      <Tab.Screen name="주간 리포트" component={WeeklyReport} />
    </Tab.Navigator>
  </View>
);

export default Calendar;
