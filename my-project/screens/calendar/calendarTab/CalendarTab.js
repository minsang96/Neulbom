import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CalendarCompo from "../../../components/calendar/CalendarCompo";
import ButtonCompo from "../../../components/button/ButtonCompo";
import AddTodayRecord from "./component/AddTodayRecord";
import { getCalendarList } from "../../../api/reports";
import { useDispatch, useSelector } from "react-redux";
import calendarSlice from "../../../slices/calendar";

const CalendarTab = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [calendarList, setCalendarList] = useState([]);
  const calendarList = useSelector((state) => {
    state.calendar.calendarList;
  });

  const onPressButton = () => {
    setModalVisible(!isModalVisible);
  };

  // 수정하기-뭐가 문제인지도 모르겠음(현정)
  useEffect(() => {
    const getCalendarListFunction = async () => {
      try {
        const response = await getCalendarList("2022-05", 14);
        dispatch(calendarSlice.actions.setCalendar(response));
        // console.log(response);
        // setCalendarList(response);
      } catch (error) {
        console.log(error);
      }
    };
    getCalendarListFunction();
  }, []);

  console.log("hey" + calendarList);

  const todayList = ["혈당", "혈압", "술", "커피", "운동"];
  return (
    <View style={styles.background}>
      <CalendarCompo calendarList={calendarList}></CalendarCompo>
      <ButtonCompo
        buttonName="오늘의 기록 등록하기"
        onPressButton={onPressButton}
      ></ButtonCompo>
      <AddTodayRecord
        onPressButton={onPressButton}
        todayList={todayList}
        isModalVisible={isModalVisible}
      ></AddTodayRecord>
    </View>
  );
};

export default CalendarTab;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: Dimensions.get("screen").height,
  },
});
