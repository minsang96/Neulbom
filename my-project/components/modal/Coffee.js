import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompo from "../button/ButtonCompo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Coffee = (props) => {
  const [isDate, setIsDate] = useState(new Date());
  const [isTime, setIsTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // 날짜 관련 함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.log(date);
    setIsDate(date);
    hideDatePicker();
  };

  // 시간 관련 함수
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTimeConfirm = (time) => {
    // console.log(time);
    setIsTime(time);
    hideTimePicker();
  };

  return (
    <Modal
      isVisible={props.isCoffeeModalVisible}
      style={styles.bottomModal}
      swipeDirection="down"
      onSwipeComplete={() => {
        props.onPressCoffeeButton();
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.titleText}>커피 기록</Text>
        <Ionicons
          name="close"
          size={24}
          color="#09BC8A"
          style={styles.closeIcon}
          onPress={() => {
            props.onPressCoffeeButton();
          }}
        />

        <Text style={styles.subtitleText}>섭취 날짜</Text>
        <Text style={styles.dateTime}>
          <Pressable onPress={showDatePicker}>
            <Text style={styles.dateTimeText}>
              {format(new Date(isDate), "PPP", {
                locale: ko,
              })}
            </Text>
          </Pressable>
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.subtitleText}>섭취 시간</Text>
        <Text style={styles.dateTime}>
          <Pressable onPress={showTimePicker}>
            <Text style={styles.dateTimeText}>
              {format(new Date(isTime), "a p", { locale: ko })}
            </Text>
          </Pressable>
        </Text>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <ButtonCompo
          buttonName="커피 등록하기"
          onPressButton={() => {
            props.onPressCoffeeButton();
          }}
        ></ButtonCompo>
      </View>
    </Modal>
  );
};

export default Coffee;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 10,
  },
  dateTime: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 10,
  },
  dateTimeText: { fontSize: 18 },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 25,
    color: "black",
  },
  closeIcon: {
    position: "absolute",
    top: 27,
    right: 10,
  },
  subtitleText: { textAlign: "center", fontSize: 18, padding: 15 },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
});
