import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const Notice1 = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <Text style={styles.title}>안녕하세요! 늘봄 1.0 출시 안내</Text>
        <Text style={{ textAlign: "right" }}>2022-05-14</Text>
        <View style={styles.line} />
        <Text>
          [늘봄의 서비스를 소개합니다!]{"\n"}
          {"\n"}
          #1 식단 관리{"\n"}
          (메인 페이지 사진){"\n"}
          오늘의 혈당/혈압과 식단을 기록하고 확인할 수 있어요!{"\n"}
          {"\n"}# 2 식단 분석{"\n"}
          (식단 분석 페이지){"\n"}
          사진을 찍으면 무슨 음식인지, 영양소의 비율은 어떻게 되는지 알 수
          있어요!{"\n"}
          {"\n"}
          #3 건강 달력{"\n"}
          (건강 달력){"\n"}한 달 동안의 기록 이력을 한눈에 확인할 수 있습니다
          {"\n"}
          음주, 커피, 운동을 얼마나 많이 했는지 쉽게 확인할 수 있겠네요~{"\n"}
          {"\n"}
          #4 리포트 (오늘의 리포트 | 주간 리포트 사진){"\n"}
          나의 하루, 나의 한 주를 한 번에 볼 수 있어요{"\n"}
          어제보다 혈압/혈당 값은 어땠는지, 영양소는 얼마나 균형있게 섭취했는지
          확인할 수 있겠죠?{"\n"}
          {"\n"}
          #5 전문가 상담{"\n"}
          (상담 내역 사진){"\n"}
          갑자기 혈당 수치가 오른다거나, 혈압이 올랐을 때 무엇이 문제인지
          물어보고 싶다면?{"\n"}
          전문가 상담을 이용해보세요{"\n"}
          {"\n"}
          #6 전문가 상세{"\n"}
          (전문가 상세 사진){"\n"}
          상담사 분의 경력과 이력 등을 확인할 수 있어요{"\n"}
          믿고 상담할 수 있겠죠?{"\n"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Notice1;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.02,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginTop: screenSize.height * 0.02,
    borderRadius: 10,
    elevation: 3,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
  },
});
