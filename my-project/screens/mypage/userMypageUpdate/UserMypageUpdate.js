import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getMemeberInfo } from "../../../api/getUserInfo";
import axios from "axios";
import userSlice from "../../../slices/user";

const screenSize = Dimensions.get("screen");

const UserMypageUpdate = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userSeq = useSelector((state) => state.user.userSeq);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigation = useNavigation();
  const [memberHeight, setMemberHeight] = useState(userInfo.memberHeight);
  const [memberWeight, setMemberWeight] = useState(userInfo.memberWeight);
  const [memberDesc, setMemberDesc] = useState(userInfo.memberDesc);
  const [memberImg, setMemberImg] = useState(userInfo.memberImg);
  const [BPColor, setBPColor] = useState(false);
  const [BSColor, setBSColor] = useState(false);
  const [settingList, setSettingList] = useState(userInfo.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    for (let i in userInfo.setting) {
      if (userInfo.setting[i] === "bloodPressure") {
        setBPColor(true);
      } else if (userInfo.setting[i] === "bloodSugar") {
        setBSColor(true);
      }
    }
  }, []);
  // 수정하기-img넣는 방법(현정)
  // 수정하기-건강수치 부분 array에 내용 바꾸기(현정)
  // 수정하기-img url(현정)
  const updateUserInfo = async () => {
    const data = {
      desc: memberDesc,
      height: memberHeight,
      img: "https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Profile/profile_1651121992083.jpg",
      setting: {
        bloodPressure: BPColor,
        bloodSugar: BSColor,
      },
      userSeq: userSeq,
      weight: memberWeight,
    };

    try {
      await axios.post("https://k6a104.p.ssafy.io/api/member/modify", data, {
        headers: {
          Authorization: accessToken,
        },
      });

      const response = await getMemeberInfo(accessToken, userSeq);
      dispatch(userSlice.actions.setUserInfo(response.data));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(settingList);
  return (
    <ScrollView style={styles.background}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Mypage"), props.onClick();
        }}
      >
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Image
          source={{ uri: userInfo.memberImg }}
          style={styles.image}
        ></Image>
        <Text style={styles.changingText}>사진 변경</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>키</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setMemberHeight(text);
          }}
        >
          {memberHeight}
        </TextInput>
        <Text style={styles.title}>몸무게</Text>
        <TextInput
          style={styles.titleInputBox}
          onChangeText={(text) => {
            setMemberWeight(text);
          }}
        >
          {memberWeight}
        </TextInput>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>건강 수치</Text>
        <View style={styles.boxRow}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: BPColor === true ? "#09BC8A" : "white" },
            ]}
            onPress={() => {
              // clickBP(settingList);
              setBPColor(!BPColor);
            }}
          >
            <Text
              style={{
                color: BPColor === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈압
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: BSColor === true ? "#09BC8A" : "white" },
            ]}
            onPress={() => {
              // clickBS(settingList);
              setBSColor(!BSColor);
            }}
          >
            <Text
              style={{
                color: BSColor === true ? "white" : "black",
                fontSize: 16,
              }}
            >
              혈당
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>질병 소개</Text>
        <TextInput
          style={styles.titleInputBox}
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
  changingText: { fontSize: 16, color: "#09BC8A", marginVertical: 5 },
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
