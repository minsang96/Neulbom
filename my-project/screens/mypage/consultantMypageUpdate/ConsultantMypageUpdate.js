import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";

const screenSize = Dimensions.get("screen");

// 수정하기-전체 다...(현정)
// 수정하기-api연결 해야함(현정)
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
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Image
          // source={{ uri: userInfo.memberImg }}
          source={require("../assets/images/dog.jpg")}
          style={styles.image}
        ></Image>
        <Text style={styles.changingText}>사진 변경</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>한 줄 소개</Text>
        <TextInput
          style={styles.titleInputBox}
          // onChangeText={(text) => {
          //   setMemberDesc(text);
          // }}
        >
          {/* {memberDesc}  */}
          저는 양양사는 영양사입니다.
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>이력 사항</Text>
        {/* 수정하기-map 함수 쓰기(현정) */}
        <TextInput style={styles.titleInputBox}>
          안녕하세요ㅇㅇㅇㅇㅇㅇㅇ
        </TextInput>
        <TextInput style={styles.titleInputBox}>저는 말이죠</TextInput>
        <TextInput style={styles.titleInputBox}></TextInput>
        <Text style={styles.changingText}>+ 추가하기</Text>
      </View>
      <ButtonCompo
        buttonName="수정 완료"
        onPressButton={() => {
          // updateUserInfo(),
          navigation.navigate("ConsultantMypage"), props.onClick();
        }}
      ></ButtonCompo>
    </ScrollView>
  );
};

export default ConsultantMypageUpdate;

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
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    marginVertical: screenSize.height * 0.01,
    marginLeft: screenSize.width * 0.01,
  },
  titleInputBox: {
    borderColor: "black",
    borderBottomWidth: 1,
    width: screenSize.width * 0.75,
    marginLeft: screenSize.width * 0.01,
    fontSize: 16,
    paddingBottom: 2,
  },
  changingText: {
    fontSize: 16,
    color: "#09BC8A",
    marginVertical: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#09BC8A",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width:
      Dimensions.get("screen").width / 2 -
      Dimensions.get("screen").width * 0.15,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
  },
});
