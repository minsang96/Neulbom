import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { getCalendarList } from "../../api/reports";
import { Dimensions } from "react-native";

const CalendarCompo = () => {
  const screenSize = Dimensions.get("screen");
  const bloodPressure = { key: "bloodPressure", color: "#F4525F" };
  const alcohol = { key: "alcohol", color: "#558BCF" };
  const bloodSugar = { key: "bloodSugar", color: "#0E0F37" };
  const coffee = { key: "coffee", color: "#FF7F00" };
  const exercise = { key: "exercise", color: "#09BC8A" };
  const [click, isClick] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    const getCalendarListFunction = async () => {
      try {
        const response = await getCalendarList("2022-04", 2);
        setCalendarList(response);
        isLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCalendarListFunction();
  }, []);

  useEffect(() => {
    picker(selectedDate);
  }, [selectedDate]);

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

  // 수정하기-왜 안될까요?(현정)
  const picker = (date) => {
    setData([]);
    // console.log(arr);
    if (calendarList[date]) {
      // console.log(calendarList[date]);
      const keys = Object.keys(calendarList[date]);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] != "dots") {
          if (keys[i] === "bloodPressure") {
            console.log(Object.keys(calendarList[date]["bloodPressure"]));
            const objectKeys = Object.keys(calendarList[date]["bloodPressure"]);
            for (let j = 0; j < objectKeys.length; j++) {
              setData((oldArray) => [
                ...oldArray,
                [
                  calendarList[date]["bloodPressure"][j]["bpCode"],
                  calendarList[date]["bloodPressure"][j]["bpHigh"],
                  calendarList[date]["bloodPressure"][j]["bpLow"],
                  calendarList[date]["bloodPressure"][j]["bpTime"],
                ],
              ]);
              console.log(data);
            }
          }
        }
      }
      isClick(true);
      console.log(data);
    }
  };

  // const arr = data.map((value, key) => {
  //   return <Text key={key}>{value}</Text>;
  // });

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
            }}
            theme={{
              selectedDayBackgroundColor: "#009688",
              todayTextColor: "#009688",
            }}
          />
          <View
            style={[
              styles.row,
              {
                marginHorizontal: screenSize.width * 0.07,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#F4525F" }]}
              ></Text>
              <Text>혈당</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#558BCF" }]}
              ></Text>
              <Text>혈압</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#0E0F37" }]}
              ></Text>
              <Text>술</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#FF7F00" }]}
              ></Text>
              <Text>커피</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#09BC8A" }]}
              ></Text>
              <Text>운동</Text>
            </View>
          </View>
          <View>
            {click ? (
              <View>
                <Text>{data[0]}</Text>
                <Text>{data[1]}</Text>
                <Text>{data[2]}</Text>
                <Text>{data[3]}</Text>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarCompo;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  circle: { width: 15, height: 15, borderRadius: 50, marginRight: 3 },
});
