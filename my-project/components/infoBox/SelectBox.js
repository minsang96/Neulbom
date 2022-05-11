import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";

const SelectBox = (props) => {
  // 수정하기-클릭하면 어떻게 어떻게 되는걸로 고쳐야 함(현정)
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo.setting);
  // for (let i in userInfo.setting) {
  //   if (userInfo.setting[i] === "bloodPressure") {}
  // }
  return (
    <View style={props.styles.boxRow}>
      <View style={styles.button}>
        <Text style={{ color: "white", fontSize: 16 }}>혈압</Text>
      </View>
      <View style={styles.button}>
        <Text style={{ color: "white", fontSize: 16 }}>혈당</Text>
      </View>
    </View>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#09BC8A",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width:
      Dimensions.get("screen").width / 2 -
      Dimensions.get("screen").width * 0.15,
    alignItems: "center",
    borderRadius: 10,
  },
});
