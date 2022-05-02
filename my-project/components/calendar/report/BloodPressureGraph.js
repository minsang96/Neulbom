import React from "react";
import { LineChart, Grid } from "react-native-svg-charts";
import { Text, View } from "react-native";

const BloodPressureGraph = (props) => {
  const data1 = [50, 10, 40, 95, -4, -24, 85];
  const data2 = [-87, 66, -69, 92, -40, -61, 16];

  const data = [
    {
      data: data1,
      svg: { stroke: "#8800cc" },
    },
    {
      data: data2,
      svg: { stroke: "green" },
    },
  ];

  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>주간 혈압값 추세</Text>
      <Text style={props.styles.subTitle}>
        한 주의 혈압값을 한눈에 확인해보세요!
      </Text>
      <LineChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

export default BloodPressureGraph;
