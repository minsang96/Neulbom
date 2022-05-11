import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

// 수정하기-주간 칼로리 compo로 수정하기
const CalorieWeeklyCompo = (props) => {
  const calorie = useSelector((state) => state.weeklyReport.weeklyCalorie);
  const beforeCal = parseInt(calorie[0].last);
  const afterCal = parseInt(calorie[0].this);

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
        {beforeCal === afterCal ? (
          <Text style={styles.calCalculator}>0</Text>
        ) : beforeCal > afterCal ? (
          <Text style={styles.calCalculatorMin}>▼{beforeCal - afterCal}</Text>
        ) : (
          <Text style={styles.calCalculatorMax}>▲{afterCal - beforeCal}</Text>
        )}
      </View>
    </View>
  );
};

export default CalorieWeeklyCompo;

const styles = StyleSheet.create({
  calorieView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  calorieText: {
    fontSize: 20,
  },
  calCalculatorMax: {
    textAlign: "center",
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    color: "red",
    marginBottom: 5,
  },
  calCalculatorMin: {
    textAlign: "center",
    backgroundColor: "rgba(0,56,255,0.2)",
    borderRadius: 30,
    width: 60,
    color: "blue",
    marginBottom: 5,
  },
  calCalculator: {
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    color: "black",
    marginBottom: 5,
  },
});
