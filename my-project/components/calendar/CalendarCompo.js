import React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View } from "react-native";

const CalendarCompo = () => {
  return (
    <View>
      {/* 달력 사용법 아직 확실히 모르겠습니다 */}
      {/* https://github.com/wix/react-native-calendars */}
      <Calendar
        markedDates={{
          "2022-04-16": { marked: true },
          "2022-04-17": { marked: true },
          "2022-04-18": { marked: true, dotColor: "red" },
        }}
      ></Calendar>
      <Agenda></Agenda>
    </View>
  );
};

export default CalendarCompo;
