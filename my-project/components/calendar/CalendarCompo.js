import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View } from "react-native";
import { format } from "date-fns";
import { getCalendarList } from "../../api/reports";
// import { ko } from "date-fns/locale";

const CalendarCompo = () => {
  const bloodPressure = { key: "bloodPressure", color: "red" };
  const alcohol = { key: "alcohol", color: "blue" };
  const bloodSugar = { key: "bloodSugar", color: "green" };
  const coffee = { key: "coffee", color: "black" };
  const exercise = { key: "exercise", color: "yellow" };
  const [click, isClick] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  // !수정하기 = 달력 내용 보이게 하기(현정)
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

  let markedDates = {};
  for (const date in calendarList) {
    const dot = [];
    for (let i in calendarList[date]["dots"]) {
      if (calendarList[date]["dots"][i] === "alcohol") {
        dot.push(alcohol);
      } else if (calendarList[date]["dots"][i] === "bloodPressure") {
        dot.push(bloodPressure);
      } else if (calendarList[date]["dots"][i] === "bloodSugar") {
        dot.push(bloodSugar);
      } else if (calendarList[date]["dots"][i] === "coffee") {
        dot.push(coffee);
      } else if (calendarList[date]["dots"][i] === "exercise") {
        dot.push(exercise);
      }
    }
    markedDates[date] = { dots: dot };
  }
  console.log("---------------");
  const picker = (date) => {
    console.log(calendarList[date]);
    // for (let i in calendarList[date]) {
    //   console.log(calendarList[date][i]);
    // }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Calendar
            markingType={"multi-dot"}
            // markedDates={{
            //   "2022-05-25": {
            //     dots: [bloodPressure, alcohol, bloodSugar],
            //     selected: true,
            //     selectedColor: "yellow",
            //   },
            //   "2022-05-26": { dots: [alcohol, bloodSugar] },
            // }}
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
              <Text>{calendarList[selectedDate]["exercise"]}</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default CalendarCompo;
