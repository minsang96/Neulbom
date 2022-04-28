import React, { useState, useEffect } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text } from "react-native";

const CalendarCompo = () => {
  const [clickDay, setClickDay] = useState("");

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
        onDayPress={(day) => {
          setClickDay(day.dateString);
          console.log(clickDay);
        }}
      ></Calendar>
      {/* <Agenda></Agenda> */}
      {/* 만약 agenda 진짜 모르겠으면 쓸 코드 */}
      {/* {clickDay ? (
        <View>
          <Text>{clickDay}</Text>
        </View>
      ) : (
        <View>
          <Text>없지롱</Text>
        </View>
      )} */}
    </View>
  );
};

export default CalendarCompo;
