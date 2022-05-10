import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View } from "react-native";
import { format } from "date-fns";
import { getCalendarList } from "../../api/reports";
// import { ko } from "date-fns/locale";

const CalendarCompo = () => {
  const bloodPressure = { key: "vacation", color: "red" };
  const alcohol = { key: "massage", color: "blue" };
  const bloodSugar = { key: "workout", color: "green" };
  const coffee = { key: "workout", color: "black" };
  const exercise = { key: "workout", color: "yellow" };
  const [clickDay, setClickDay] = useState("");
  const [click, isClick] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  // !수정하기 = 해결 못하는 중(현정)
  useEffect(() => {
    const getCalendarListFunction = async () => {
      try {
        const response = await getCalendarList("2022-05", 14);
        setCalendarList(response);
        isLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCalendarListFunction();
  }, []);
  console.log(calendarList);

  const markedDates = { calendarList };
  const picker = (date) => {
    console.log(calendarList[date]);
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Calendar
            markingType={"multi-dot"}
            markedDates={markedDates}
            selectedDate={selectedDate}
            onDayPress={(data) => {
              setSelectedDate(data.dateString);
              isClick(true);
              picker(selectedDate);
            }}
            theme={{
              selectedDayBackgroundColor: "#009688",
              todayTextColor: "#009688",
            }}
          />
          {click ? (
            <View>
              {/* <Text>{calendarList[selectedDate["bloodPressure"]]}</Text> */}
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default CalendarCompo;
