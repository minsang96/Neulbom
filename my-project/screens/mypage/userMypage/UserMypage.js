import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import AlarmSetting from "../../../components/infoBox/AlarmSetting";
import InfoMyDisease from "../../../components/infoBox/InfoMyDisease";
import InfoMyself from "../../../components/infoBox/InfoMyself";
import Intake from "../../../components/infoBox/Intake";
import SelectBox from "../../../components/infoBox/SelectBox";
import Infomation from "../../../components/infoBox/Infomation";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const UserMypage = () => {
  return (
    <View>
      <Text style={styles.title}>내 소개 😊</Text>
      <InfoMyself styles={styles}></InfoMyself>
      <Text style={styles.title}>권장 섭취량 ✨</Text>
      <Intake styles={styles}></Intake>
      <Text style={styles.title}>건강 수치 ✨</Text>
      <SelectBox styles={styles}></SelectBox>
      <Text style={styles.title}>알림 설정 ✨</Text>
      <AlarmSetting styles={styles}></AlarmSetting>
      <Text style={styles.title}>질병 소개 ✨</Text>
      <InfoMyDisease styles={styles}></InfoMyDisease>
      <Text style={styles.title}>이용 안내 ✨</Text>
      <Infomation styles={styles}></Infomation>
      <ButtonCompo buttonName="로그아웃"></ButtonCompo>
    </View>
  );
};

export default UserMypage;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
  },
  boxRow: {
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: screenSize.width * 0.05,
  },
  userName: { fontSize: 20, marginBottom: 5 },
  flexDirectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: screenSize.height * 0.01,
    justifyContent: "center",
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
    marginHorizontal: screenSize.width * 0.03,
    marginVertical: screenSize.height * 0.01,
    borderRadius: 10,
    width: screenSize.width * 0.2,
    height: screenSize.width * 0.2,
    elevation: 3,
  },
  userInfoItemContent: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  title: {
    fontSize: 20,
    marginVertical: screenSize.height * 0.01,
    marginLeft: screenSize.width * 0.01,
  },
  email: {
    color: "#A7A7A7",
  },
});
