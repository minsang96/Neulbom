import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import ButtonGray from "../../../components/button/ButtonSignUp";
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import React, { useState } from "react";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import userSlice from "../../../slices/user";
import { useDispatch } from "react-redux";
// import { getUserInfo } from '../../../api/getUserInfo';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function UserLogin({ navigation: { navigate } }) {
  const dispatch = useDispatch();

  const login = async () => {
    if (!user.email || !user.email.trim()) {
      return Alert.alert("알림", "이메일을 입력해주세요.");
    }
    if (!user.password || !user.password.trim()) {
      return Alert.alert("알림", "비밀번호를 입력해주세요.");
    }
    try {
      const res = await axios.post("https://k6a104.p.ssafy.io/api/user/login", {
        userEmail: user.email,
        userPwd: user.password,
      });
      dispatch(userSlice.actions.login(res.data.data));
      await EncryptedStorage.setItem(
        "user_session",
        JSON.stringify({
          email: user.email,
          password: user.password,
        })
      );
      const userType = res.data.data.userType;
      if (userType == 0) {
        try {
          const response = await axios.get(
            "https://k6a104.p.ssafy.io/api/member/info",
            {
              headers: { Authorization: res.data.data.accessToken },
              params: { userSeq: res.data.data.userSeq },
            }
          );
          dispatch(userSlice.actions.setUserInfo(response.data.data));
        } catch (err) {
          console.log(err);
        }
      } else if (userType == 1) {
        try {
          const response = await axios.get(
            "https://k6a104.p.ssafy.io/api/expert/info",
            {
              headers: { Authorization: res.data.data.accessToken },
              params: { userSeq: res.data.data.userSeq },
            }
          );
          dispatch(userSlice.actions.setUserInfo(response.data.data));
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
      // Alert.alert('알림', 'email 혹은 패스워드가 틀립니다.');
    } finally {
    }
  };
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const loginBoxHeight = (windowHeight * 28) / 100;
  const loginBoxWidth = (windowWidth * 80) / 100;
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <Text style={styles.text}>안녕하세요</Text>
        <Text style={styles.text}>늘봄에 오신 것을 환영합니다.</Text>
      </View>
      <View
        style={{
          ...styles.loginBox,
          height: loginBoxHeight,
          width: loginBoxWidth,
          borderRadius: (loginBoxWidth * 5) / 100,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="이메일"
          keyboardType="email-address"
          onChangeText={(event) => setUser({ ...user, email: event })}
          autoCapitalize="none"
        ></TextInput>
        <View style={styles.inputline}></View>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(event) => setUser({ ...user, password: event })}
          autoCapitalize="none"
        ></TextInput>
        <View style={styles.inputline}></View>
        <ButtonGreen2
          // onPressButton={() => loginf()}
          onPressButton={() => login()}
          buttonName="로그인"
          fontSize={15}
          padding={9.5}
          borderRadius={10}
        ></ButtonGreen2>
      </View>
      <ButtonGray
        onPressButton={() => navigate("UserSignUp")}
        buttonName="일반회원 회원가입"
      ></ButtonGray>
      <ButtonGray
        onPressButton={() => navigate("ConsultantSignUp")}
        buttonName="전문가 회원가입"
      ></ButtonGray>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "28%",
    backgroundColor: "#fff",
    height: "100%",
    alignItems: "center",
  },
  welcomeText: {
    marginBottom: "12%",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  loginBox: {
    marginHorizontal: "20%",
    backgroundColor: "rgba(226,226,226,0.2)",
    paddingHorizontal: "10%",
    paddingTop: "5%",
    elevation: 1,
    marginBottom: "5%",
  },
  inputline: {
    backgroundColor: "#172A3A",
    width: "100%",
    height: 1,
    marginTop: "1%",
    marginBottom: "5%",
  },
  input: {
    alignSelf: "flex-start",
    marginTop: "4%",
    width: "100%",
  },
});
