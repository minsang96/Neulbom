import React from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import Qualification from "../../../components/infoBox/Qualification";
import InfoConsultant from "../../../components/infoBox/InfoConsultant";

const screenSize = Dimensions.get("screen");

const ConsultantMypageUpdate = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ConsultantMypage"), props.onClick();
        }}
      >
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <Text>전문가</Text>
      <Text style={styles.title}>내 소개 😊</Text>
      <InfoConsultant styles={styles}></InfoConsultant>
      <Text style={styles.title}>이력 사항✨</Text>
      <Qualification styles={styles}></Qualification>
      <ButtonCompo buttonName="수정 완료"></ButtonCompo>
    </ScrollView>
  );
};

export default ConsultantMypageUpdate;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: "white",
    paddingHorizontal: 20,
  },
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
  infoBox: {
    backgroundColor: "white",
    margin: screenSize.width * 0.01,
    marginBottom: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
  },
  infoItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: screenSize.width * 0.2,
    height: screenSize.width * 0.2,
  },
});
