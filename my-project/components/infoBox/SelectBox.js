import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ButtonHalfCompo from "../button/ButtonHalfCompo";

const SelectBox = (props) => {
  return (
    <View style={props.styles.boxRow}>
      <ButtonHalfCompo buttonName="혈압"></ButtonHalfCompo>
      <ButtonHalfCompo buttonName="혈당"></ButtonHalfCompo>
    </View>
  );
};

export default SelectBox;
