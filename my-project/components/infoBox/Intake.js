import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Intake = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <View style={props.styles.box}>
      <View style={props.styles.userInfo}>
        <View style={props.styles.userInfoItem}>
          <Text>권장 칼로리</Text>
          <Text style={props.styles.userInfoItemContent}>
            {userInfo.memberKcal}
          </Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>권장 나트륨</Text>
          <Text style={props.styles.userInfoItemContent}>
            {userInfo.memberNatrium}
          </Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>권장 당류</Text>
          <Text style={props.styles.userInfoItemContent}>
            {userInfo.memberSugar}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Intake;
