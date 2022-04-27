import React from "react";
import { View, Text } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";

const UserMypage = () => {
  return (
    <View>
      <Text>내 소개 😊</Text>
      <Text>권장 섭취량 ✨</Text>
      <Text>건강 수치 ✨</Text>
      <Text>알림 설정 ✨</Text>
      <Text>질병 소개 ✨</Text>
      <Text>이용 안내 ✨</Text>
      <ButtonCompo buttonName="로그아웃"></ButtonCompo>
    </View>
  );
};

export default UserMypage;
