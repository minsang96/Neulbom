import React from "react";
import { Text, View } from "react-native";

const NutrientCompo = (props) => {
  return (
    <View>
      <Text>영양소 비율</Text>
      <Text>권장 섭취 비율과 {props.now} 섭취 비율을 비교해보세요</Text>
      <Text>권장 섭취 비율</Text>
      <Text>{props.now} 섭취 비율</Text>
    </View>
  );
};

export default NutrientCompo;
