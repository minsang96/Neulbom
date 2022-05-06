import React, { useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/NutrientCompo";
import TodayReport from "../../../components/calendar/report/TodayReport";
import BloodPressureReport from "../../../components/calendar/report/BloodPressureReport";
import BloodSugarReport from "../../../components/calendar/report/BloodSugarReport";
import { useDispatch, useSelector } from "react-redux";

import { Dimensions } from "react-native";
import dailyReportSlice from "../../../slices/dailyReport";
import {
  getDailyBloodPressure,
  getDailyBloodSugar,
  getDailyCalorie,
} from "../../../api/reports";

const screenSize = Dimensions.get("screen");

const DailyReport = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDailyBloodpressureResult = async () => {
      try {
        const response = await getDailyBloodPressure("2022-04-26", "2");
        dispatch(
          dailyReportSlice.actions.setDailyBloodPressureReport(response)
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getDailyBloodSugarResult = async () => {
      try {
        const response = await getDailyBloodSugar("2022-04-26", "2");
        dispatch(dailyReportSlice.actions.setDailyBloodSugarReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    const getCalorieResult = async () => {
      try {
        const response = await getDailyCalorie("2022-04-26", "1");
        dispatch(dailyReportSlice.actions.setDailyCalroieReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    getDailyBloodpressureResult();
    getDailyBloodSugarResult();
    getCalorieResult();
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
