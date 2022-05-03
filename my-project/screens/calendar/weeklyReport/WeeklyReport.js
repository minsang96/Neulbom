import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import BloodPressureGraph from "../../../components/calendar/report/BloodPressureGraph";
import BloodSugarGraph from "../../../components/calendar/report/BloodSugarGraph";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/NutrientCompo";
import UserInfo from "../../../components/calendar/report/UserInfo";
import { Dimensions } from "react-native";
import WeeklyEat from "../../../components/calendar/report/WeeklyEat";

const screenSize = Dimensions.get("screen");

const WeeklyReport = () => {
  return (
    <ScrollView style={styles.background}>
      <Text style={styles.reportTitle}>정현정님의 주간 리포트</Text>
      <UserInfo styles={styles}></UserInfo>
      <BloodSugarGraph styles={styles}></BloodSugarGraph>
      <BloodPressureGraph styles={styles}></BloodPressureGraph>
      <CalorieCompo
        title="평균 섭취 칼로리"
        subtitle="지난 주 섭취한 칼로리와 이번 주를 비교해보세요."
        before="지난 주"
        after="이번 주"
        styles={styles}
      ></CalorieCompo>
      <NutrientCompo now="이번 주" styles={styles}></NutrientCompo>
      <WeeklyEat styles={styles}></WeeklyEat>
    </ScrollView>
  );
};

export default WeeklyReport;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  reportTitle: {
    fontSize: 20,
    marginVertical: 10,
    // fontWeight: "bold",
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginVertical: screenSize.width * 0.01,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    color: "#A7A7A7",
    marginBottom: screenSize.height * 0.01,
  },
});
