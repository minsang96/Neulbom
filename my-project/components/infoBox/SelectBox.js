import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ButtonHalfCompo from "../button/ButtonHalfCompo";

const SelectBox = () => {
  return (
    <View style={styles.box}>
      <ButtonHalfCompo buttonName="혈압"></ButtonHalfCompo>
      <ButtonHalfCompo buttonName="혈당"></ButtonHalfCompo>
    </View>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(229,229,229,0.5)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
