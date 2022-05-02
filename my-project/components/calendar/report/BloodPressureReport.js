import React from "react";
import { Text, View } from "react-native";

const BloodPressureReport = (props) => {
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>최근 혈압값 추세</Text>
      <Text style={props.styles.subTitle}>
        전날에 비해 얼마나 좋아졌을까요?
      </Text>
      <View>
        <Text>아침</Text>
        <Text>어제</Text>
        <Text>오늘</Text>
        <Text>최저</Text>
        <Text>최고</Text>
      </View>
      <View>
        <Text>저녁</Text>
        <Text>어제</Text>
        <Text>오늘</Text>
        <Text>최저</Text>
        <Text>최고</Text>
      </View>
    </View>
  );
};

export default BloodPressureReport;
