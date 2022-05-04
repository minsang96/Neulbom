import React from "react";
import { Text, View } from "react-native";

const Qualification = (props) => {
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.subtitle}>🏅 자격</Text>
      <Text style={props.styles.box}>영양사 면허(보건복지부)</Text>
      <Text style={props.styles.subtitle}>💼 이력</Text>
      <View style={props.styles.box}>
        <Text>ㅇㅇ초등학교 영양사</Text>
        <Text>주식회사 롯데푸드 영양사</Text>
      </View>
    </View>
  );
};

export default Qualification;
