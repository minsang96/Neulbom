import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart, StackedBarChart } from "react-native-svg-charts";

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
        <StackedBarChart
          style={{ height: 200 }}
          keys={keys}
          colors={colors}
          data={data2}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
        />
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
