import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompo from "../button/ButtonCompo";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// isSecModalVisible로 통일
const BloodPressure = (props) => {
  const radioButtonsData = [
    {
      id: "1",
      label: "아침",
      value: "아침",
    },
    {
      id: "2",
      label: "점심",
      value: "점심",
    },
    {
      id: "3",
      label: "저녁",
      value: "저녁",
    },
  ];

  // useState
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [isDate, setIsDate] = useState(new Date());
  const [isTime, setIsTime] = useState(new Date());

  // 라디오 버튼 관련 함수
  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  };

  // 날짜 관련 함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    console.log(date);
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
    console.warn("A time has been picked: ", time);
    console.log(time);
    setIsTime(time);
    hideTimePicker();
  };

  // console.log(props);
  return (
    <Modal
      isVisible={props.isBloodModalVisible}
      style={styles.bottomModal}
      swipeDirection="down"
      onSwipeComplete={() => {
        props.onPressBloodButton();
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.titleText}>혈압 기록</Text>
        <Ionicons
          name="close"
          size={24}
          color="#09BC8A"
          style={styles.closeIcon}
          onPress={() => {
            props.onPressBloodButton();
          }}
        />
        <Text style={styles.subtitleText}>측정 날짜</Text>
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
        <Text style={styles.subtitleText}>측정 시간</Text>
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
        <Text style={styles.subtitleText}>측정 시점 선택</Text>
        <View style={{ alignItems: "center" }}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="row"
          />
        </View>
        <Text style={styles.subtitleText}>최고 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최고 혈압을 입력하세요"
        ></TextInput>
        <Text style={styles.subtitleText}>최저 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최저 혈압을 입력하세요"
        ></TextInput>
        <ButtonCompo
          buttonName="혈압 등록하기"
          onPressButton={() => {
            props.onPressBloodButton();
          }}
        ></ButtonCompo>
      </View>
    </Modal>
  );
};

export default BloodPressure;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 10,
    fontSize: 18,
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
  subtitleText: { textAlign: "center", fontSize: 16, padding: 15 },
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
  textCenter: {
    textAlign: "center",
    fontSize: 30,
  },
});
