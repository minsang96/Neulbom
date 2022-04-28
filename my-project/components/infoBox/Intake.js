import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Intake = () => {
  return (
    <View style={styles.box}>
      <View style={styles.userInfo}>
        <View style={styles.userInfoItem}>
          <Text>권장 칼로리</Text>
          <Text style={styles.userInfoItemContent}>2100</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text>권장 나트륨</Text>
          <Text style={styles.userInfoItemContent}>350</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text>권장 당류</Text>
          <Text style={styles.userInfoItemContent}>400</Text>
        </View>
      </View>
    </View>
  );
};

export default Intake;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(229,229,229,0.5)",
    borderRadius: 10,
    // 지우기
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "black",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: { fontSize: 20, marginBottom: 5 },
  flexDirectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  userInfoItemContent: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
