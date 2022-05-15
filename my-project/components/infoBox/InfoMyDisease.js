import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const InfoMyDisease = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <View style={props.styles.box}>
      <Text>{userInfo.memberDesc}</Text>
    </View>
  );
};

export default InfoMyDisease;
