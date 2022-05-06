import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

// 사용 예시 screen/calendar/calendarTab/CalendarTab
const ButtonHalfCompo = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPressButton}>
      <Text style={{ color: "white", fontSize: 16 }}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

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

export default ButtonHalfCompo;
