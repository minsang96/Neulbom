import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const screenSize = Dimensions.get("screen");

const ConsultantMypageUpdate = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const accessToken = useSelector((state) => state.user.accessToken);

  // 수정하기-api 연결이 잘 안돼요(현정)
  const updateUserInfo = async () => {
    const data = {
      career: ["싸피 병원 근무무", "싸피 보건소 근무"],
      desc: "건강한 식습관 만들어요.",
      expertImg:
        "https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Profile/profile_1651121992083.jpg",
      userSeq: userSeq,
    };

    try {
      await axios.post("https://k6a104.p.ssafy.io/api/member/modify", data, {
        headers: {
          Authorization: accessToken,
        },
      });

      const response = await getMemeberInfo(accessToken, userSeq);
      dispatch(userSlice.actions.setUserInfo(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const [expertDesc, setExpertDesc] = useState(userInfo.expertDesc);
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
        {/* <Image
          source={{ uri: userInfo.expertImg }}
          style={styles.image}
        ></Image>
        <Text style={styles.changingText}>사진 변경</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>한 줄 소개</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setExpertDesc(text);
          }}
        >
          {expertDesc}
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>이력 사항</Text>
        {userInfo.expertCareer.map((data, index) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text key={index}>{data.careerContent}</Text>
            <Text>X</Text>
          </View>
        ))} */}
        {/* 수정하기-textinput 추가하기(현정) */}
        <Text
          style={styles.changingText}
          onPress={() => {
            // userInfo.expertCareer.push();
          }}
        >
          + 추가하기
        </Text>
      </View>
      <ButtonCompo
        buttonName="수정 완료"
        onPressButton={() => {
          updateUserInfo(),
            navigation.navigate("ConsultantMypage"),
            props.onClick();
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
