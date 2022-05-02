import React from "react";
import { Text, View } from "react-native";

const UserInfo = (props) => {
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.title}>정현정님의 신체 정보</Text>
      <Text>고혈압 및 당뇨</Text>
      <Text>나이</Text>
      <Text>35세</Text>
      <Text>키</Text>
      <Text>165cm</Text>
      <Text>몸무게</Text>
      <Text>55kg</Text>
    </View>
  );
};

export default UserInfo;
