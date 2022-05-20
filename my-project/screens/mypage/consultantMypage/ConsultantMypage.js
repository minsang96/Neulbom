import React from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import Infomation from "../../../components/infoBox/Infomation";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import Qualification from "../../../components/infoBox/Qualification";
import InfoConsultant from "../../../components/infoBox/InfoConsultant";
import { useDispatch } from "react-redux";
import userSlice from "../../../slices/user";
import EncryptedStorage from "react-native-encrypted-storage";

const screenSize = Dimensions.get("screen");

const ConsultantMypage = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = () => {
    async function removeUserSession() {
      try {
        await EncryptedStorage.removeItem("user_session");
      } catch (error) {
        console.log(error.code);
      }
    }
    dispatch(userSlice.actions.logout());
    removeUserSession();
  };
  return (
    <ScrollView style={styles.background}>
      <Text style={styles.title}>내 소개 😊</Text>
      <InfoConsultant
        styles={styles}
        update={props.update}
        type={"infopage"}
      ></InfoConsultant>
      <Text style={styles.title}>이력 사항✨</Text>
      <Qualification styles={styles} update={props.update}></Qualification>
      <ButtonCompo buttonName="소개페이지 보기"></ButtonCompo>
      <Text style={styles.title}>이용 안내 ✨</Text>
      <Infomation styles={styles}></Infomation>
      <ButtonCompo
        onPressButton={() => logout()}
        buttonName="로그아웃"
      ></ButtonCompo>
    </ScrollView>
  );
};

export default ConsultantMypage;

const styles = StyleSheet.create({
  background: {
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
  userName: { fontSize: 18, marginBottom: 5 },
  flexDirectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: screenSize.height * 0.01,
    paddingLeft: screenSize.width * 0.04,
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
  subtitle: {
    fontSize: 16,
    marginVertical: screenSize.height * 0.01,
    marginLeft: screenSize.width * 0.01,
  },
});
