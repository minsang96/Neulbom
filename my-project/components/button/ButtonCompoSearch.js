import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");
// 사용 예시 screen/calendar/calendarTab/CalendarTab
const ButtonCompoSearch = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#09BC8A",
        padding: 10,
        marginVertical: 10,
        // marginHorizontal: 25,
        alignItems: "center",
        borderRadius: 10,
        width: screenSize.width * 0.79,
      }}
      onPress={props.onPressButton}
    >
      <Text
        style={{ color: "white", fontSize: 20, fontFamily: "SeoulNamsanEB" }}
      >
        {props.buttonName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonCompoSearch;
