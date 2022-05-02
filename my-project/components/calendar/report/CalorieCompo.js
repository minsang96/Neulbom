import React from "react";
import { Text, View } from "react-native";

const CalorieCompo = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <Text>{props.subtitle}</Text>
      <Text>{props.before}</Text>
      <Text>1780kcal</Text>
      <Text>{props.after}</Text>
      <Text>2150kcal</Text>
    </View>
  );
};

export default CalorieCompo;
