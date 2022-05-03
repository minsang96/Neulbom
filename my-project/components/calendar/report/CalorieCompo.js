import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CalorieCompo = (props) => {
  // 테스트임 정보 받아오면 고칠 부분
  const beforeCal = 1780;
  const afterCal = 2150;

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>{props.title}</Text>
      <Text style={props.styles.subTitle}>{props.subtitle}</Text>
      <View style={styles.calorieView}>
        <View>
          <Text style={{ textAlign: "center" }}>{props.before}</Text>
          <Text style={styles.calorieText}>{beforeCal}kcal</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>{props.after}</Text>
          <Text style={styles.calorieText}>{afterCal}kcal</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.calCalculator}>▲{afterCal - beforeCal}</Text>
      </View>
    </View>
  );
};

export default CalorieCompo;

const styles = StyleSheet.create({
  calorieView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  calorieText: {
    fontSize: 20,
  },
  calCalculator: {
    textAlign: "center",
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    color: "red",
    marginBottom: 5,
  },
});
