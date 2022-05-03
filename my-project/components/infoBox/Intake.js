import React from "react";
import { View, Text } from "react-native";

const Intake = (props) => {
  return (
    <View style={props.styles.box}>
      <View style={props.styles.userInfo}>
        <View style={props.styles.userInfoItem}>
          <Text>권장 칼로리</Text>
          <Text style={props.styles.userInfoItemContent}>2100</Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>권장 나트륨</Text>
          <Text style={props.styles.userInfoItemContent}>350</Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>권장 당류</Text>
          <Text style={props.styles.userInfoItemContent}>400</Text>
        </View>
      </View>
    </View>
  );
};

export default Intake;
