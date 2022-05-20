import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompo from "../button/ButtonCompo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSelector } from "react-redux";
import { addOtherRecodeFunction } from "../../api/recode";

const Workout = (props) => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const [isDate, setIsDate] = useState(format(koreaNow, "yyyy-MM-dd"));
  const [isTime, setIsTime] = useState(
    koreaNow.toTimeString().split(" ")[0].slice(0, 5)
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const userSeq = useSelector((state) => state.user.userSeq);

  // 날짜 관련 함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setIsDate(format(date, "yyyy-MM-dd"));
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
    setIsTime(time.toTimeString().split(" ")[0].slice(0, 5));
    showTimePicker();
  };

  const addExerciseRecodeFunction = () => {
    const otherDto = {
      code: "exercise",
      otherDate: isDate,
      otherTime: isTime,
      userSeq: userSeq,
    };
    try {
      addOtherRecodeFunction(otherDto);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={props.isWorkoutModalVisible}
      style={styles.bottomModal}
      swipeDirection="down"
      onSwipeComplete={() => {
        props.onPressWorkoutButton();
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.titleText}>운동 기록</Text>
        <Ionicons
          name="close"
          size={24}
          color="#09BC8A"
          style={styles.closeIcon}
          onPress={() => {
            props.onPressWorkoutButton();
          }}
        />

        <Text style={styles.subtitleText}>운동 날짜</Text>
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
        <Text style={styles.subtitleText}>운동 시간</Text>
        <Text style={styles.dateTime}>
          <Pressable onPress={showTimePicker}>
            <Text style={styles.dateTimeText}>{isTime}</Text>
          </Pressable>
        </Text>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <ButtonCompo
          buttonName="운동 등록하기"
          onPressButton={() => {
            props.onPressWorkoutButton();
            addExerciseRecodeFunction();
          }}
        ></ButtonCompo>
      </View>
    </Modal>
  );
};

export default Workout;

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
