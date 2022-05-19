import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// props로 buttonName, fontSize, fontWieht, onPressButton, padding, width, borderRadius를 받을 수 있다.
const ButtonGreen2 = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#09BC8A",
        padding: props.padding,
        marginVertical: 10,
        // marginHorizontal: 25,
        alignItems: "center",
        borderRadius: props.borderRadius,
        width: props.width,
        elevation: props.elevation
      }}
      onPress={props.onPressButton}
    >
      <Text style={{ color: "white", fontSize: props.fontSize, fontWeight: props.fontWeight }}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonGreen2;
