import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import BloodPressureGraph from "../../../components/calendar/report/BloodPressureGraph";
import BloodSugarGraph from "../../../components/calendar/report/BloodSugarGraph";
import NutrientCompo from "../../../components/calendar/report/WeeklyNutrientCompo";
import UserInfo from "../../../components/calendar/report/UserInfo";
import { Dimensions } from "react-native";
import WeeklyEat from "../../../components/calendar/report/WeeklyEat";
import { useDispatch, useSelector } from "react-redux";
import weeklyReportSlice from "../../../slices/weeklyReport";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  getWeeklyBloodPressure,
  getWeeklyBloodSugar,
  getWeeklyCalorie,
  getWeeklyDiet,
  getWeeklyNutirent,
} from "../../../api/reports";
import CalorieWeeklyCompo from "../../../components/calendar/report/CalorieWeeklyCompo";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const screenSize = Dimensions.get("screen");

const WeeklyReport = () => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDate, setIsDate] = useState(koreaNow.toISOString().split("T")[0]);
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirm = (date) => {
    const selectDate = new Date(date).toISOString().split("T")[0];
    setIsDate(selectDate);
    showDatePicker();
  };

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

  const getWeeklyBloodPressureResult = async () => {
    try {
      const response = await getWeeklyBloodPressure(isDate, userSeq);
      dispatch(
        weeklyReportSlice.actions.setWeeklyBloodPressureReport(response)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getWeeklyBloodSugarResult = async () => {
    try {
      const response = await getWeeklyBloodSugar(isDate, userSeq);
      dispatch(weeklyReportSlice.actions.setWeeklyBloodSugarReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getWeeklyCalorieResult = async () => {
    try {
      const response = await getWeeklyCalorie(isDate, userSeq);
      dispatch(weeklyReportSlice.actions.setWeeklyCalorieReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getWeeklyNutirentResult = async () => {
    try {
      const response = await getWeeklyNutirent(isDate, userSeq);
      dispatch(weeklyReportSlice.actions.setWeeklyNutrientReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getWeeklyDietResult = async () => {
    try {
      const response = await getWeeklyDiet(isDate, userSeq);
      dispatch(weeklyReportSlice.actions.setWeeklyDietReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

  useEffect(() => {
    getWeeklyBloodPressureResult();
    getWeeklyBloodSugarResult();
    getWeeklyCalorieResult();
    getWeeklyNutirentResult();
    getWeeklyDietResult();
  }, [isDate]);

  return (
    <ScrollView style={styles.background}>
      <View style={styles.center}>
        <View style={styles.dateTime}>
          <Pressable onPress={showDatePicker}>
            <Text style={styles.dateTimeText}>
              {format(new Date(isDate), "PPP", {
                locale: ko,
              })}
            </Text>
          </Pressable>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={showDatePicker}
      />
      <Text style={styles.reportTitle}>
        {userInfo.memberNickname}님의 주간 리포트
      </Text>
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
    </ScrollView>
  );
};

export default WeeklyReport;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  center: { alignItems: "center" },
  dateTime: {
    backgroundColor: "#09BC8A",
    color: "white",
    borderRadius: 10,
    width: 150,
    margin: 10,
    padding: 5,
    alignItems: "center",
  },
  dateTimeText: {
    color: "white",
  },
  reportTitle: {
    fontSize: 20,
    marginBottom: 10,
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
