import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { getCalendarList } from "../../api/reports";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const screenSize = Dimensions.get("screen");

const CalendarCompo = () => {
  const userSeq = useSelector((state) => state.user.userSeq);
  const bloodPressure = { key: "bloodPressure", color: "#F4525F" };
  const alcohol = { key: "alcohol", color: "#558BCF" };
  const bloodSugar = { key: "bloodSugar", color: "#0E0F37" };
  const coffee = { key: "coffee", color: "#FF7F00" };
  const exercise = { key: "exercise", color: "#09BC8A" };
  const [calendarList, setCalendarList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [bloodPressureList, setBloodPressureList] = useState([]);
  const [bloodSugarList, setBloodSugarList] = useState([]);
  const [alcoholList, setAlcoholList] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [click, isClick] = useState(false);
  const [bloodPressureClick, setBloodPressureClick] = useState(false);
  const [bloodSugarClick, setBloodSugarClick] = useState(false);
  const [alcoholClick, setAlcoholClick] = useState(false);
  const [coffeeClick, setCoffeeClick] = useState(false);
  const [exerciseClick, setExerciseClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const getCalendarListFunction = async (month) => {
    try {
      const response = await getCalendarList(month, userSeq);
      setCalendarList(response);
      isLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCalendarListFunction(selectedDate.slice(0, 7), userSeq);
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
    setBloodPressureList([]);
    setBloodSugarList([]);
    setAlcoholList([]);
    setCoffeeList([]);
    setExerciseList([]);
    setBloodPressureClick(false);
    setBloodSugarClick(false);
    setAlcoholClick(false);
    setCoffeeClick(false);
    setExerciseClick(false);
    isClick(false);
    if (calendarList[date]) {
      const keys = Object.keys(calendarList[date]);
      isClick(true);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] != "dots") {
          if (keys[i] === "bloodPressure") {
            setBloodPressureList((oldArray) => [
              ...oldArray,
              calendarList[date]["bloodPressure"],
            ]);
            setBloodPressureClick(true);
          } else if (keys[i] === "bloodSugar") {
            setBloodSugarList((oldArray) => [
              ...oldArray,
              calendarList[date]["bloodSugar"],
            ]);
            setBloodSugarClick(true);
          } else if (keys[i] === "alcohol") {
            setAlcoholList((oldArray) => [
              ...oldArray,
              calendarList[date]["alcohol"],
            ]);
            setAlcoholClick(true);
          } else if (keys[i] === "coffee") {
            setCoffeeList((oldArray) => [
              ...oldArray,
              calendarList[date]["coffee"],
            ]);
            setCoffeeClick(true);
          } else if (keys[i] === "exercise") {
            setExerciseList((oldArray) => [
              ...oldArray,
              calendarList[date]["exercise"],
            ]);
            setExerciseClick(true);
          }
        }
      }
    }
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
            }}
            theme={{
              selectedDayBackgroundColor: "#009688",
              todayTextColor: "#009688",
            }}
            onMonthChange={(month) => {
              getCalendarListFunction(month.dateString.slice(0, 7));
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
              <Text>음주</Text>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {click ? (
              <View style={styles.box}>
                <Text style={styles.date}>
                  {selectedDate.slice(0, 4)}년 {selectedDate.slice(5, 7)}월{" "}
                  {selectedDate.slice(8, 10)}일
                </Text>
                {bloodSugarClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>혈당</Text>
                    {bloodSugarList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text>{data.bsCode}</Text>
                        </View>
                        <View>
                          <Text>{data.bsTime}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text>혈당 수치 </Text>
                          <Text style={styles.numberText} key={data.bsSeq}>
                            {data.bsLevel}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {bloodPressureClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>혈압</Text>
                    {bloodPressureList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text>{data.bpCode}</Text>
                        </View>
                        <View>
                          <Text>{data.bpTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text>최고 혈압 </Text>
                          <Text style={styles.numberText} key={data.bpSeq}>
                            {data.bpHigh}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text>최저 혈압 </Text>
                          <Text style={styles.numberText} key={data.bpSeq}>
                            {data.bpLow}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {alcoholClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>음주</Text>
                    {alcoholList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            🍺
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {coffeeClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>커피</Text>
                    {coffeeList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            ☕
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {exerciseClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>운동</Text>
                    {exerciseList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            🚲
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CalendarCompo;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  circle: { width: 15, height: 15, borderRadius: 50, marginRight: 3 },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginVertical: screenSize.height * 0.02,
    borderRadius: 10,
    elevation: 3,
  },
  boxSec: {
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
  },
  date: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 10,
  },
  numberText: {
    fontSize: 16,
    color: "black",
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
});
