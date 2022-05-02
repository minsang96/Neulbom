import React from "react";
import { Text, View } from "react-native";

const TodayReport = (props) => {
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>오늘의 기록</Text>
      <Text>커피</Text>
      <Text>☕</Text>
      <Text>음주</Text>
      <Text>🍺</Text>
      <Text>운동</Text>
      <Text>🚲</Text>
    </View>
  );
};

export default TodayReport;
