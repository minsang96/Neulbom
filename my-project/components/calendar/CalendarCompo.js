import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View } from "react-native";
import { format } from "date-fns";
// import { ko } from "date-fns/locale";

const CalendarCompo = () => {
  const [clickDay, setClickDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedDates = {
    // "2022-05-17": {
    //   selected: true,
    // },
    "2022-05-18": {
      marked: true,
    },
    "2022-05-19": {
      marked: true,
    },
  };

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        theme={{
          selectedDayBackgroundColor: "#009688",
          arrowColor: "#009688",
          dotColor: "#009688",
          todayTextColor: "#009688",
        }}
      />
    </View>
  );
};

export default CalendarCompo;
