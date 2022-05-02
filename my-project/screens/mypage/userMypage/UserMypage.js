import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import AlarmSetting from "../../../components/infoBox/AlarmSetting";
import InfoMyDisease from "../../../components/infoBox/InfoMyDisease";
import InfoMyself from "../../../components/infoBox/InfoMyself";
import Intake from "../../../components/infoBox/Intake";
import SelectBox from "../../../components/infoBox/SelectBox";

const UserMypage = () => {
  return (
    <View>
      <Text style={styles.title}>내 소개 😊</Text>
      <InfoMyself></InfoMyself>
      <Text style={styles.title}>권장 섭취량 ✨</Text>
      <Intake></Intake>
      <Text style={styles.title}>건강 수치 ✨</Text>
      <SelectBox></SelectBox>
      <Text style={styles.title}>알림 설정 ✨</Text>
      <AlarmSetting></AlarmSetting>
      <Text style={styles.title}>질병 소개 ✨</Text>
      <InfoMyDisease></InfoMyDisease>
      <Text style={styles.title}>이용 안내 ✨</Text>
      <ButtonCompo buttonName="로그아웃"></ButtonCompo>
    </View>
  );
};

export default UserMypage;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
});
