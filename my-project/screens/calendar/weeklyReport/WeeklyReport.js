import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import BloodPressureGraph from "../../../components/calendar/report/BloodPressureGraph";
import BloodSugarGraph from "../../../components/calendar/report/BloodSugarGraph";
import NutrientCompo from "../../../components/calendar/report/WeeklyNutrientCompo";
import UserInfo from "../../../components/calendar/report/UserInfo";
import { Dimensions } from "react-native";
import WeeklyEat from "../../../components/calendar/report/WeeklyEat";
import { useDispatch, useSelector } from "react-redux";
import weeklyReportSlice from "../../../slices/weeklyReport";
import {
  getWeeklyBloodPressure,
  getWeeklyBloodSugar,
  getWeeklyCalorie,
  getWeeklyDiet,
  getWeeklyNutirent,
} from "../../../api/reports";
import CalorieWeeklyCompo from "../../../components/calendar/report/CalorieWeeklyCompo";

const screenSize = Dimensions.get("screen");

const WeeklyReport = () => {
  const dispatch = useDispatch();
  const weeklyBloodPressure = useSelector((state) =>
    state.weeklyReport.weeklyBloodPressure.sort()
  );
  const weeklyBloodSugar = useSelector((state) =>
    state.weeklyReport.weeklyBloodSugar.sort()
  );
  const weeklyNutrient = useSelector(
    (state) => state.weeklyReport.weeklyNutrient
  );
  const weeklyDiet = useSelector((state) => state.weeklyReport.weeklyDiet);

  // 수정하기-api(현정)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getWeeklyBloodPressureResult = async () => {
      try {
        const response = await getWeeklyBloodPressure("2022-04-26", "2");
        dispatch(
          weeklyReportSlice.actions.setWeeklyBloodPressureReport(response)
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getWeeklyBloodSugarResult = async () => {
      try {
        const response = await getWeeklyBloodSugar("2022-04-26", "2");
        dispatch(weeklyReportSlice.actions.setWeeklyBloodSugarReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    const getWeeklyCalorieResult = async () => {
      try {
        const response = await getWeeklyCalorie("2022-04-26", "2");
        dispatch(weeklyReportSlice.actions.setWeeklyCalorieReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    const getWeeklyNutirentResult = async () => {
      try {
        const response = await getWeeklyNutirent("2022-04-26", "2");
        dispatch(weeklyReportSlice.actions.setWeeklyNutrientReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    const getWeeklyDietResult = async () => {
      try {
        const response = await getWeeklyDiet("2022-04-26", "2");
        dispatch(weeklyReportSlice.actions.setWeeklyDietReport(response));
      } catch (error) {
        console.log(error);
      }
    };
    getWeeklyBloodPressureResult();
    getWeeklyBloodSugarResult();
    getWeeklyCalorieResult();
    getWeeklyNutirentResult();
    getWeeklyDietResult();
  }, []);

  useEffect(() => {
    if (
      weeklyBloodPressure.length > 0 &&
      weeklyBloodSugar.length > 0 &&
      weeklyNutrient.length > 0 &&
      weeklyDiet.length > 0
    ) {
      setLoading(false);
    }
  }, [weeklyBloodPressure, weeklyBloodSugar, weeklyNutrient, weeklyDiet]);

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.reportTitle}>정현정님의 주간 리포트</Text>
      <UserInfo styles={styles}></UserInfo>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodSugarGraph
          styles={styles}
          weeklyBloodSugar={weeklyBloodSugar[0]}
        ></BloodSugarGraph>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodPressureGraph
          styles={styles}
          weeklyBloodPressure={weeklyBloodPressure[0]}
        ></BloodPressureGraph>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <CalorieWeeklyCompo
          title="평균 섭취 칼로리"
          subtitle="지난 주 섭취한 칼로리와 이번 주를 비교해보세요."
          before="지난 주"
          after="이번 주"
          styles={styles}
        ></CalorieWeeklyCompo>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <NutrientCompo
          now="이번 주"
          styles={styles}
          weeklyNutrient={weeklyNutrient[0]}
        ></NutrientCompo>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <WeeklyEat styles={styles}></WeeklyEat>
      )}
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
