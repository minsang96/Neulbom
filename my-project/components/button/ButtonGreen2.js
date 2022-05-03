import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// 사용 예시 screen/calendar/calendarTab/CalendarTab
const ButtonCompo = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#09BC8A",
        padding: props.padding,
        marginVertical: 10,
        // marginHorizontal: 25,
        alignItems: "center",
        borderRadius: 10,
        width: props.width
      }}
      onPress={props.onPressButton}
    >
      <Text style={{ color: "white", fontSize: props.fontSize }}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonCompo;
