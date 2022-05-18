import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import palette from "../palette";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Plus = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 275px;
  height: 30px;
  width: 30px;
  background-color: ${palette.green};
  border-radius: 30px;
  elevation: 5;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
  margin-bottom: 2.5%;
`;

const screenSize = Dimensions.get("screen");

const BsAlarmSetting = (props) => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTime, setIsTime] = useState(koreaNow.toISOString().split("T")[0]);
  const showTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };
  const handleConfirm = (time) => {
    const selectTime = new Date(time)
      .toISOString()
      .split("T")[1]
      .substring(0, 5);
    console.log(selectTime);
    setIsTime(selectTime);
    showTimePicker();
  };
  return (
    <View style={styles.box}>
      <View>
        <Column>
          <Text style={props.styles.userInfoItemContent}>혈당</Text>
          <Plus onPress={showTimePicker}>
            <Ionicons name="add" color="white" size={30} />
          </Plus>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={showTimePicker}
          />
        </Column>

        <Column>
          <View
            style={[
              styles.button,
              {
                backgroundColor: "white",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              08:00
            </Text>
          </View>
          <View
            style={[
              styles.button,
              {
                backgroundColor: "white",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              19:30
            </Text>
          </View>
        </Column>
      </View>
    </View>
  );
};

export default BsAlarmSetting;

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
    elevation: 3,
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
});
