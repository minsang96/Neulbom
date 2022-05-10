import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ButtonHalfCompo from "../button/ButtonHalfCompo";
import { useSelector } from "react-redux";

const SelectBox = (props) => {
  // 수정하기-클릭하면 어떻게 어떻게 되는걸로 고쳐야 함(현정)
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <View style={props.styles.boxRow}>
      <ButtonHalfCompo buttonName="혈압"></ButtonHalfCompo>
      <ButtonHalfCompo buttonName="혈당"></ButtonHalfCompo>
    </View>
  );
};

export default SelectBox;
