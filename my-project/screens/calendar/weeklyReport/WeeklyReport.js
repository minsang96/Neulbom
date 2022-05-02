import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";

const WeeklyReport = () => {
  return (
    <View>
      <Text>hey</Text>
      <CalorieCompo
        title="평균 섭취 칼로리"
        subtitle="지난 주 섭취한 칼로리와 이번 주를 비교해보세요."
        before="지난 주"
        after="이번 주"
      ></CalorieCompo>
    </View>
  );
};

export default WeeklyReport;
