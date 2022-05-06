import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// props로 buttonName, fontSize, fontWieht, elevation, onPressButton, padding, width를 받을 수 있다.
const ButtonWhite = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        padding: props.padding,
        marginVertical: 10,
        // marginHorizontal: 25,
        alignItems: "center",
        borderRadius: 10,
        width: props.width,
        elevation: props.elevation
      }}
      onPress={props.onPressButton}
    >
      <Text style={{ fontSize: props.fontSize, fontWeight: props.fontWeight }}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonWhite;
