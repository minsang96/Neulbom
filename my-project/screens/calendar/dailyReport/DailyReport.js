import React, { useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import axios from "axios";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/NutrientCompo";
import TodayReport from "../../../components/calendar/report/TodayReport";
import BloodPressureReport from "../../../components/calendar/report/BloodPressureReport";
import BloodSugarReport from "../../../components/calendar/report/BloodSugarReport";

import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const DailyReport = () => {
  // 고쳐라 axios 불러오는 법 알아보기.. ㅋ
  const getDailyReportInfo = () => {
    axios
      .get("http://k6a104.p.ssafy.io:3030/api/report/daily/bloodsugar", {
        params: { date: "2022-04-26", userSeq: 2 },
      })
      .then(function (res) {
        console.log(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getDailyReportInfo();
  }, []);

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.reportTitle}>정현정님의 일간 리포트</Text>
      <BloodPressureReport styles={styles}></BloodPressureReport>
      <BloodSugarReport styles={styles}></BloodSugarReport>
      <CalorieCompo
        title="총 섭취 칼로리"
        subtitle="어제 섭취한 칼로리와 오늘을 비교해보세요."
        before="어제"
        after="오늘"
        styles={styles}
      ></CalorieCompo>
      <NutrientCompo now="오늘" styles={styles}></NutrientCompo>
      <TodayReport styles={styles}></TodayReport>
    </ScrollView>
  );
};

export default DailyReport;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  reportTitle: {
    fontSize: 20,
    marginVertical: 10,
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
