import React from "react";
import { Text, View, StyleSheet } from "react-native";

const WeeklyEat = (props) => {
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>한 주의 기록</Text>
    </View>
  );
};
export default WeeklyEat;
