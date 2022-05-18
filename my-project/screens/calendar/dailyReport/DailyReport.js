import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable, View } from "react-native";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/DailyNutrientCompo";
import TodayReport from "../../../components/calendar/report/TodayReport";
import BloodPressureReport from "../../../components/calendar/report/BloodPressureReport";
import BloodSugarReport from "../../../components/calendar/report/BloodSugarReport";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import dailyReportSlice from "../../../slices/dailyReport";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  getDailyBloodPressure,
  getDailyBloodSugar,
  getDailyCalorie,
  getDailyNutirent,
  getDailyOtherReport,
} from "../../../api/reports";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const screenSize = Dimensions.get("screen");

const DailyReport = () => {
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
  // const other = useSelector((state) => state.dailyReport.other);

  // const todayBloodPressure = useSelector(
  //   (state) => state.dailyReport.todayBloodPressure
  // );
  const dailyReport = useSelector((state) => state.dailyReport);
  // const yesterdayBloodPressure = useSelector(
  //   (state) => state.dailyReport.yesterdayBloodPressure
  // );
  // const todayBloodSugar = useSelector(
  //   (state) => state.dailyReport.todayBloodSugar
  // );
  // const yesterdayBloodSugar = useSelector(
  //   (state) => state.dailyReport.yesterdayBloodSugar
  // );
  // const recommendNutrient = useSelector(
  //   (state) => state.dailyReport.recommendNutrient
  // );
  // const intakeNutrient = useSelector(
  //   (state) => state.dailyReport.intakeNutrient
  // );

  const getDailyBloodpressureResult = async () => {
    try {
      const response = await getDailyBloodPressure(isDate, userSeq);
      dispatch(dailyReportSlice.actions.setDailyBloodPressureReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getDailyBloodSugarResult = async () => {
    try {
      const response = await getDailyBloodSugar(isDate, userSeq);
      dispatch(dailyReportSlice.actions.setDailyBloodSugarReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getCalorieResult = async () => {
    try {
      const response = await getDailyCalorie(isDate, userSeq);
      dispatch(dailyReportSlice.actions.setDailyCalroieReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getDailyNutirentResult = async () => {
    try {
      const response = await getDailyNutirent(isDate, userSeq);
      dispatch(dailyReportSlice.actions.setDailyNutrientReport(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getDailyOtherResult = async () => {
    try {
      const response = await getDailyOtherReport(isDate, userSeq);
      dispatch(dailyReportSlice.actions.setDailyOtherReport(response));
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDailyBloodpressureResult();
    getDailyBloodSugarResult();
    getCalorieResult();
    getDailyNutirentResult();
    getDailyOtherResult();
  }, []);

  // useEffect(() => {
  //   getDailyBloodpressureResult();
  //   getDailyBloodSugarResult();
  //   getCalorieResult();
  //   getDailyNutirentResult();
  //   getDailyOtherResult();
  // }, [dailyReport]);

  // useEffect(() => {
  //   getDailyBloodSugarResult();
  // }, [dailyReport.todayBloodSugar]);

  // useEffect(() => {
  //   getDailyBloodpressureResult();
  //   getDailyBloodSugarResult();
  //   getCalorieResult();
  //   getDailyNutirentResult();
  //   getDailyOtherResult();
  // }, [
  //   dailyReport.todayBloodPressure,
  //   dailyReport.todayBloodSugar,
  //   dailyReport.intakeNutrient,
  //   dailyReport.other,
  // ]);

  useEffect(() => {
    if (
      dailyReport.yesterdayBloodSugar.length > 0 &&
      dailyReport.todayBloodPressure.length > 0 &&
      dailyReport.intakeNutrient.length > 0
    ) {
      setLoading(false);
    }
  }, [
    dailyReport.yesterdayBloodSugar,
    dailyReport.todayBloodPressure,
    dailyReport.intakeNutrient,
  ]);

  useEffect(() => {
    getDailyBloodpressureResult();
    getDailyBloodSugarResult();
    getCalorieResult();
    getDailyNutirentResult();
    getDailyOtherResult();
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
        {userInfo.memberNickname}님의 일간 리포트
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodPressureReport
          styles={styles}
          todayBloodPressure={dailyReport.todayBloodPressure[0]}
          yesterdayBloodPressure={dailyReport.yesterdayBloodPressure[0]}
        ></BloodPressureReport>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <BloodSugarReport
          styles={styles}
          todayBloodSugar={dailyReport.todayBloodSugar[0]}
          yesterdayBloodSugar={dailyReport.yesterdayBloodSugar[0]}
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
          recommendNutrient={dailyReport.recommendNutrient[0]}
          intakeNutrient={dailyReport.intakeNutrient[0]}
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
  center: { alignItems: "center" },
  reportTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
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
