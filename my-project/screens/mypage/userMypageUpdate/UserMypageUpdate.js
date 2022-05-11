import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import { useDispatch, useSelector } from "react-redux";
import { updateMemeberInfo } from "../../../api/updateUserInfo";
import { getMemeberInfo } from "../../../api/getUserInfo";

const screenSize = Dimensions.get("screen");

// 수정하기-CSS(현정)
const UserMypageUpdate = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigation = useNavigation();
  const [memberHeight, setMemberHeight] = useState(userInfo.memberHeight);
  const [memberWeight, setMemberWeight] = useState(userInfo.memberWeight);
  const [memberDesc, setMemberDesc] = useState(userInfo.memberDesc);
  const [memberImg, setMemberImg] = useState(userInfo.memberImg);
  const dispatch = useDispatch();
  // 수정하기-건강수치 부분(현정)

  // 수정하기-img url(현정)
  const updateUserInfo = async () => {
    const data = {
      desc: memberDesc,
      height: memberHeight,
      img: "https://notion-emojis.s3-us-west-2.jpg",
      setting: {
        bloodPressure: true,
        bloodSugar: false,
      },
      userSeq: userSeq,
      weight: memberWeight,
    };

    try {
      const response = await axios.put(
        "https://k6a104.p.ssafy.io/api/member/modify",
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      // dispatch(userSlice.actions.setUserInfo(response));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Mypage"), props.onClick();
        }}
      >
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <Text>사진 변경</Text>
      <View style={styles.box}>
        <Text>키</Text>
        <TextInput
          onChangeText={(text) => {
            setMemberHeight(text);
          }}
        >
          {memberHeight}
        </TextInput>
        <Text>몸무게</Text>
        <TextInput
          onChangeText={(text) => {
            setMemberWeight(text);
          }}
        >
          {memberWeight}
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text>건강 수치</Text>
      </View>
      <View style={styles.box}>
        <Text>질병 소개</Text>
        <TextInput
          onChangeText={(text) => {
            setMemberDesc(text);
          }}
        >
          {memberDesc}
        </TextInput>
      </View>
      <ButtonCompo
        buttonName="수정 완료"
        onPressButton={() => {
          updateUserInfo(), navigation.navigate("Mypage"), props.onClick();
        }}
      ></ButtonCompo>
    </ScrollView>
  );
};

export default UserMypageUpdate;

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
