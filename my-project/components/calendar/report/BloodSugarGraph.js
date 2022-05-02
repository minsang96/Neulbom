import React from "react";
import { Text, View } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";

const BloodSugarGraph = (props) => {
  const data = [50, 10, 40, 95, -4, -24, 85];
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>주간 아침 공복 혈당값 추세</Text>
      <Text style={props.styles.subTitle}>
        한 주의 아침 공복 혈당값을 한눈에 확인해보세요!
      </Text>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: "rgb(134, 65, 244)" }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

export default BloodSugarGraph;
