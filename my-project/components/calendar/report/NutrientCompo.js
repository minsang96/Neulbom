import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-svg-charts";
import * as Progress from "react-native-progress";

const NutrientCompo = (props) => {
  const data = [50, 10, 40];
  const tandanjiColor = ["#FF6107", "#7ED320", "#FFD302"];
  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: tandanjiColor[index],
        onPress: () => console.log("press", index),
      },
      key: `pie-${index}`,
    }));

  const data2 = [
    {
      month: new Date(2015, 0, 1),
      권장량: 3840,
      섭취량: 1920,
    },
    {
      month: new Date(2015, 1, 1),
      권장량: 1600,
      섭취량: 1440,
    },
  ];

  const colors = ["#1F77B4", "#C5E7FF"];
  const keys = ["권장량", "섭취량"];

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>영양소 비율</Text>
      <Text style={props.styles.subTitle}>
        권장 섭취 비율과 {props.now} 섭취 비율을 비교해보세요
      </Text>
      <View style={styles.graphView}>
        <View style={styles.graph}>
          <Text style={styles.graphTitle}>권장 섭취 비율</Text>
          <PieChart
            style={{ height: 100, width: 100 }}
            data={pieData}
            innerRadius="70%"
          />
        </View>
        <View style={styles.graph}>
          <Text style={styles.graphTitle}>{props.now} 섭취 비율</Text>
          <PieChart
            style={{ height: 100, width: 100 }}
            data={pieData}
            innerRadius="70%"
          />
        </View>
      </View>
      <View>
        <Text>권장 오늘</Text>
        <Text>탄수화물</Text>
        <Text>단백질</Text>
        <Text>지방</Text>
      </View>
      <View style={styles.graphView}>
        <Progress.Bar
          progress={0.3}
          animated={false}
          color="#1F77B4"
          borderColor="rgba(0, 122, 255, 0)"
          unfilledColor="#E2E2E2"
          height={10}
        />
        <Progress.Bar
          progress={0.3}
          animated={false}
          color="#FF7F0E"
          borderColor="rgba(0, 122, 255, 0)"
          unfilledColor="#E2E2E2"
          height={10}
        />
      </View>
      <View>
        <Text>나트륨</Text>
        <Text>당</Text>
      </View>
    </View>
  );
};

export default NutrientCompo;

const styles = StyleSheet.create({
  graphView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  graph: {},
  graphTitle: {
    textAlign: "center",
    marginBottom: 10,
  },
});
