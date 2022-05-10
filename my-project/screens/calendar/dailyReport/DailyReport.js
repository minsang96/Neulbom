import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/DailyNutrientCompo";
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
  getDailyNutirent,
  getDailyOtherReport,
} from "../../../api/reports";

const screenSize = Dimensions.get("screen");

const DailyReport = () => {
  const dispatch = useDispatch();
  const todayBloodPressure = useSelector(
    (state) => state.dailyReport.todayBloodPressure
  );
  const yesterdayBloodPressure = useSelector(
    (state) => state.dailyReport.yesterdayBloodPressure
  );
  const todayBloodSugar = useSelector(
    (state) => state.dailyReport.todayBloodSugar
  );
  const yesterdayBloodSugar = useSelector(
    (state) => state.dailyReport.yesterdayBloodSugar
  );
  const recommendNutrient = useSelector(
    (state) => state.dailyReport.recommendNutrient
  );
  const intakeNutrient = useSelector(
    (state) => state.dailyReport.intakeNutrient
  );

  // 수정하기-api(현정)
  const [loading, setLoading] = useState(true);
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
    const getDailyNutirentResult = async () => {
      try {
        const response = await getDailyNutirent("2022-04-26", "1");
        dispatch(dailyReportSlice.actions.setDailyNutrientReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    const getDailyOtherResult = async () => {
      try {
        const response = await getDailyOtherReport("2022-04-26", "1");
        dispatch(dailyReportSlice.actions.setDailyOtherReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    getDailyBloodpressureResult();
    getDailyBloodSugarResult();
    getCalorieResult();
    getDailyNutirentResult();
    getDailyOtherResult();
  }, []);

  useEffect(() => {
    if (
      yesterdayBloodSugar.length > 0 &&
      todayBloodPressure.length > 0 &&
      intakeNutrient.length > 0
    ) {
      setLoading(false);
    }
  }, [yesterdayBloodSugar, todayBloodPressure, intakeNutrient]);

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.reportTitle}>정현정님의 일간 리포트</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodPressureReport
          styles={styles}
          todayBloodPressure={todayBloodPressure[0]}
          yesterdayBloodPressure={yesterdayBloodPressure[0]}
        ></BloodPressureReport>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodSugarReport
          styles={styles}
          todayBloodSugar={todayBloodSugar[0]}
          yesterdayBloodSugar={yesterdayBloodSugar[0]}
        ></BloodSugarReport>
      )}
      <CalorieCompo
        title="총 섭취 칼로리"
        subtitle="어제 섭취한 칼로리와 오늘을 비교해보세요."
        before="어제"
        after="오늘"
        styles={styles}
      ></CalorieCompo>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <NutrientCompo
          now="오늘"
          styles={styles}
          recommendNutrient={recommendNutrient[0]}
          intakeNutrient={intakeNutrient[0]}
        ></NutrientCompo>
      )}
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
