import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BloodPressure from "../../../../components/modal/BloodPressure";

const AddTodayRecord = (props) => {
  const [isSecModalVisible, setSecModalVisible] = useState(false);

  const onPressSecButton = () => {
    setSecModalVisible(!isSecModalVisible);
  };

  const onPressListItem = (key) => {
    console.log(key);
    console.log("-----");
    // Alert.alert(`${key}`);
    setSecModalVisible(true);
    console.log(isSecModalVisible);
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
      <BloodPressure
        onPressSecButton={onPressSecButton}
        onPressButton={props.onPressButton}
        isSecModalVisible={isSecModalVisible}
      ></BloodPressure>
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
