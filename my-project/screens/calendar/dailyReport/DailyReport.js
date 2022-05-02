import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import axios from "axios";
import CalorieCompo from "../../../components/calendar/report/CalorieCompo";
import NutrientCompo from "../../../components/calendar/report/NutrientCompo";

const DailyReport = () => {
  // axios 불러오는 법 알아보기.. ㅋ
  const getDailyReportInfo = () => {
    axios
      .get("http://localhost:3030/api/report/daily/bloodsugar")
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    // getDailyReportInfo();
  }, []);

  return (
    <ScrollView>
      <Text>일간 리포트</Text>
      <CalorieCompo
        title="총 섭취 칼로리"
        subtitle="어제 섭취한 칼로리와 오늘을 비교해보세요."
        before="어제"
        after="오늘"
      ></CalorieCompo>
      <NutrientCompo now="오늘"></NutrientCompo>
    </ScrollView>
  );
};

export default DailyReport;
