import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CalendarCompo from "../../../components/calendar/CalendarCompo";
import ButtonCompo from "../../../components/button/ButtonCompo";
import AddTodayRecord from "./component/AddTodayRecord";

const CalendarTab = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  let onPressButton = () => {
    setModalVisible(!isModalVisible);
  };

  const todayList = ["혈당", "혈압", "술", "커피", "운동"];
  return (
    <View style={styles.background}>
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
