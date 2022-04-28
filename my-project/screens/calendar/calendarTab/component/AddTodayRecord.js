import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BloodPressure from "../../../../components/modal/BloodPressure";
import BloodSugar from "../../../../components/modal/BloodSugar";
import Alcohol from "../../../../components/modal/Alcohol";
import Coffee from "../../../../components/modal/Coffee";
import Workout from "../../../../components/modal/Workout";

const AddTodayRecord = (props) => {
  // useState
  const [isBloodModalVisible, setBloodModalVisible] = useState(false);
  const [isBloodSugarModalVisible, setBloodSugarModalVisible] = useState(false);
  const [isAlcoholModalVisible, setAlcoholModalVisible] = useState(false);
  const [isCoffeeModalVisible, setCoffeeModalVisible] = useState(false);
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);

  // modal 관련 함수
  const onPressBloodButton = () => {
    setBloodModalVisible(!isBloodModalVisible);
  };
  const onPressBloodSugarButton = () => {
    setBloodSugarModalVisible(!isBloodSugarModalVisible);
  };
  const onPressAlcoholButton = () => {
    setAlcoholModalVisible(!isAlcoholModalVisible);
  };
  const onPressCoffeeButton = () => {
    setCoffeeModalVisible(!isCoffeeModalVisible);
  };
  const onPressWorkoutButton = () => {
    setWorkoutModalVisible(!isWorkoutModalVisible);
  };

  const onPressListItem = (key) => {
    if (key === 0) {
      setBloodSugarModalVisible(true);
    } else if (key === 1) {
      setBloodModalVisible(true);
    } else if (key === 2) {
      setAlcoholModalVisible(true);
    } else if (key === 3) {
      setCoffeeModalVisible(true);
    } else if (key === 4) {
      setWorkoutModalVisible(true);
    }
    props.onPressButton();
  };

  return (
    <>
      <Modal
        isVisible={props.isModalVisible}
        // style={{ backgroundColor: "white", marginBottom: 0 }}
        style={styles.bottomModal}
        swipeDirection="down"
        onSwipeComplete={props.onPressButton}
      >
        <View style={styles.modalView}>
          <Text style={styles.titleText}>오늘의 기록</Text>
          <Ionicons
            name="close"
            size={24}
            color="#09BC8A"
            style={styles.closeIcon}
            onPress={props.onPressButton}
          />

          {props.todayList.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.tab}
              onPress={() => onPressListItem(key)}
            >
              <Text key={key} style={styles.tabText}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <BloodSugar
        onPressBloodSugarButton={onPressBloodSugarButton}
        isBloodSugarModalVisible={isBloodSugarModalVisible}
      ></BloodSugar>
      <BloodPressure
        onPressBloodButton={onPressBloodButton}
        isBloodModalVisible={isBloodModalVisible}
      ></BloodPressure>
      <Alcohol
        onPressAlcoholButton={onPressAlcoholButton}
        isAlcoholModalVisible={isAlcoholModalVisible}
      ></Alcohol>
      <Coffee
        onPressCoffeeButton={onPressCoffeeButton}
        isCoffeeModalVisible={isCoffeeModalVisible}
      ></Coffee>
      <Workout
        onPressWorkoutButton={onPressWorkoutButton}
        isWorkoutModalVisible={isWorkoutModalVisible}
      ></Workout>
    </>
  );
};

export default AddTodayRecord;

const styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 25,
    color: "#09BC8A",
  },
  closeIcon: {
    position: "absolute",
    top: 27,
    right: 10,
  },
  tab: {
    padding: 15,
    marginHorizontal: 25,
    alignItems: "center",
    borderBottomWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#E2E2E2",
  },
  tabText: { fontSize: 20, color: "black" },
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
