import React from "react";
import { LineChart, Grid } from "react-native-svg-charts";
import { Text, View } from "react-native";

const BloodPressureGraph = (props) => {
  // 수정하기-api 순서 맞게 들어오는지 확인(현정)
  const data1 = [];
  const data2 = [];

  for (var i in props.weeklyBloodPressure) {
    data1.push(props.weeklyBloodPressure[i]["BpHigh"]);
    data2.push(props.weeklyBloodPressure[i]["BpLow"]);
  }

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
