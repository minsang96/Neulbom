import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompo from "../button/ButtonCompo";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { addBPRecodeFunction } from "../../api/recode";
import { useSelector } from "react-redux";

const BloodPressure = (props) => {
  const radioButtonsData = [
    {
      id: "1",
      label: "아침",
      value: "Breakfast",
    },
    {
      id: "2",
      label: "점심",
      value: "Lunch",
    },
    {
      id: "3",
      label: "저녁",
      value: "Dinner",
    },
  ];
  const radioButtonsData2 = [
    {
      id: "1",
      label: "식전",
      value: "before",
    },
    {
      id: "2",
      label: "식후",
      value: "after",
    },
  ];

  // useState
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const userSeq = useSelector((state) => state.user.userSeq);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [radioButtons, setRadioButtons] = useState("");
  const [radioButtons2, setRadioButtons2] = useState("");
  const [radioButtonData, setRadioButtonData] = useState(radioButtonsData);
  const [radioButtonData2, setRadioButtonData2] = useState(radioButtonsData2);
  const [BloodPressureHigh, setBloodPressureHigh] = useState(0);
  const [BloodPressureLow, setBloodPressureLow] = useState(0);
  const [isDate, setIsDate] = useState(koreaNow.toISOString().split("T")[0]);
  const [isTime, setIsTime] = useState(
    koreaNow.toTimeString().split(" ")[0].slice(0, 5)
  );

  // 라디오 버튼 관련 함수
  const onPressRadioButton = (radioButtonsArray) => {
    let i = 0;
    for (i; i < radioButtonsArray.length; i++) {
      if (radioButtonsArray[i].selected === true) {
        setRadioButtons(radioButtonsArray[i].value);
        break;
      }
    }
  };
  const onPressRadioButton2 = (radioButtonsArray2) => {
    let i = 0;
    for (i; i < radioButtonsArray2.length; i++) {
      if (radioButtonsArray2[i].selected === true) {
        setRadioButtons2(radioButtonsArray2[i].value);
        break;
      }
    }
  };

  // 날짜 관련 함수
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirm = (date) => {
    const selectDate = new Date(date).toISOString().split("T")[0];
    setIsDate(selectDate);
    showDatePicker();
  };

  // 시간 관련 함수
  const showTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };
  const handleTimeConfirm = (time) => {
    setIsTime(time.toTimeString().split(" ")[0].slice(0, 5));
    showTimePicker();
  };

  const addBloodPressureRecodeFunction = () => {
    const bloodPressureDto = {
      bpCode: radioButtons2 + radioButtons,
      bpDate: isDate,
      bpHigh: BloodPressureHigh,
      bpLow: BloodPressureLow,
      bpTime: isTime,
      userSeq: userSeq,
    };
    try {
      addBPRecodeFunction(bloodPressureDto);
    } catch (error) {
      console.log(error);
    }
  };

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
          onCancel={showDatePicker}
        />
        <Text style={styles.subtitleText}>측정 시간</Text>
        <Text style={styles.dateTime}>
          <Pressable onPress={showTimePicker}>
            <Text style={styles.dateTimeText}>{isTime}</Text>
          </Pressable>
        </Text>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={showTimePicker}
        />
        <Text style={styles.subtitleText}>측정 시점 선택</Text>
        <View style={{ alignItems: "center" }}>
          <RadioGroup
            radioButtons={radioButtonData}
            onPress={onPressRadioButton}
            layout="row"
          />
        </View>
        <Text style={styles.subtitleText}>식전/식후</Text>
        <View style={{ alignItems: "center" }}>
          <RadioGroup
            radioButtons={radioButtonData2}
            onPress={onPressRadioButton2}
            layout="row"
          />
        </View>
        <Text style={styles.subtitleText}>최고 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최고 혈압을 입력하세요"
          keyboardType="numeric"
          onChangeText={(text) => {
            setBloodPressureHigh(text);
          }}
        ></TextInput>
        <Text style={styles.subtitleText}>최저 혈압</Text>
        <TextInput
          style={styles.input}
          placeholder="최저 혈압을 입력하세요"
          keyboardType="numeric"
          onChangeText={(text) => {
            setBloodPressureLow(text);
          }}
        ></TextInput>
        <ButtonCompo
          buttonName="혈압 등록하기"
          onPressButton={() => {
            props.onPressBloodButton();
            addBloodPressureRecodeFunction();
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
