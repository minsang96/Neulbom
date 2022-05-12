import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import CalendarCompo from "../../../components/calendar/CalendarCompo";
import ButtonCompo from "../../../components/button/ButtonCompo";
import AddTodayRecord from "./component/AddTodayRecord";
import { useDispatch, useSelector } from "react-redux";

const CalendarTab = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const onPressButton = () => {
    setModalVisible(!isModalVisible);
  };

  const todayList = ["혈당", "혈압", "술", "커피", "운동"];
  return (
    <ScrollView style={styles.background}>
      <CalendarCompo></CalendarCompo>
      <ButtonCompo
        buttonName="오늘의 기록 등록하기"
        onPressButton={onPressButton}
      ></ButtonCompo>
      <AddTodayRecord
        onPressButton={onPressButton}
        todayList={todayList}
        isModalVisible={isModalVisible}
      ></AddTodayRecord>
    </ScrollView>
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
