import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import onGallery from "../../../api/onGallery";
import axios from "axios";
import {
  passwordVerify,
  stylePasswordVerify,
} from "../../../api/passwordVerify";
import Career from "../../../components/modal/Career";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ConsultantSignUp({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const infoBoxWidth = (windowWidth * 78) / 100;
  const infoInputBoxWidth = (infoBoxWidth * 86.3) / 100;
  const plusButtonWidth = (infoInputBoxWidth * 30) / 100;
  const [isCareerModalVisible, setIsCareerModalVisible] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    certification: "",
    name: "",
    password: "",
    passwordVerification: "",
    intro: "",
    career: "",
  });
  const profileImgUri = useSelector(
    (state) => state.user.consultantProfileImageUri
  );
  const certImgUri = useSelector((state) => state.user.consultantCertImageUri);
  const signUp = () => {
    if (!info.email || !info.email.trim()) {
      return Alert.alert("알림", "이메일을 입력해주세요.");
    }
    // else if (!info.email.includes('@') || !info.email.includes('.') || info.email.length < 6) {
    //   return Alert.alert('알림', '이메일을 확인해주세요.');
    // }
    if (!info.name || !info.name.trim()) {
      return Alert.alert("알림", "성명을 입력해주세요.");
    }
    if (!info.password || !info.password.trim()) {
      return Alert.alert("알림", "비밀번호를 입력해주세요.");
    }
    if (!info.passwordVerification || !info.passwordVerification.trim()) {
      return Alert.alert("알림", "비밀번호 확인을 입력해주세요.");
    }
    if (info.password !== info.passwordVerification) {
      return Alert.alert("알림", "비밀번호 확인을 확인해주세요.");
    }
    if (!info.intro || !info.intro.trim()) {
      return Alert.alert("알림", "소개글을 입력해주세요.");
    }
    if (!info.career) {
      return Alert.alert("알림", "경력을 입력해주세요.");
    }
    if (!profileImgUri) {
      return Alert.alert("알림", "프로필사진을 입력해주세요.");
    }
    if (!certImgUri) {
      return Alert.alert("알림", "자격 증명서를 입력해주세요.");
    }
    axios
      .post("https://k6a104.p.ssafy.io/api/expert/join", {
        career: info.career, // []로
        desc: info.intro,
        email: info.email,
        img: "https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f331.svg",
        name: info.name,
        pwd: info.password,
        type: 1,
      })
      .then((res) => {
        console.log(res);
        console.log("apiSuccess");
        navigate("SuccessSignUpConsultant");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          return Alert.alert("알림", "이미 가입된 이메일입니다.");
        }
      });
    // navigate('SuccessSignUpConsultant')
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginTop: "8%",
          justifyContent: "center",
        }}
      >
        <View style={styles.textInputs}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            keyboardType="email-address"
            onChangeText={(event) => setInfo({ ...info, email: event })}
            autoFocus={true}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.inputline}></View>
          <View style={styles.certification}>
            <View style={styles.certificationInput}>
              <TextInput
                style={styles.input}
                placeholder="인증번호"
                onChangeText={(event) =>
                  setInfo({ ...info, certification: event })
                }
              ></TextInput>
              <View style={{ ...styles.inputline, width: "80%" }}></View>
            </View>
            <View style={styles.certificationButton}>
              <ButtonGreen2
                width={(windowWidth * 30) / 100}
                buttonName="이메일 인증"
                padding={8}
                borderRadius={10}
              ></ButtonGreen2>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="성명"
            onChangeText={(event) => setInfo({ ...info, name: event })}
          ></TextInput>
          <View style={styles.inputline}></View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={(event) => setInfo({ ...info, password: event })}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.inputline}></View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onChangeText={(event) =>
              setInfo({ ...info, passwordVerification: event })
            }
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.inputline}></View>
          <Text style={stylePasswordVerify(info)}>
            {info.passwordVerification && passwordVerify(info)}
          </Text>
        </View>

        <View
          style={{
            ...styles.infoBox,
            width: infoBoxWidth,
            borderRadius: (infoBoxWidth * 5) / 100,
          }}
        >
          <Text style={styles.title}>소개글 (최대 100자)</Text>
          <View
            style={{
              ...styles.infoInputBox,
              height: (windowHeight * 12) / 100,
              width: infoInputBoxWidth,
              borderRadius: (infoInputBoxWidth * 5) / 100,
              elevation: (infoInputBoxWidth * 1) / 100,
            }}
          >
            <TextInput
              style={{}}
              multiline={true}
              onChangeText={(event) => setInfo({ ...info, intro: event })}
              maxLength={100}
            ></TextInput>
          </View>
          <Text style={styles.title}>경력</Text>
          <TouchableOpacity
            onPress={() => {
              setIsCareerModalVisible(!isCareerModalVisible);
            }}
            style={{
              ...styles.infoInputBox,
              height: (windowHeight * 12) / 100,
              width: infoInputBoxWidth,
              borderRadius: (infoInputBoxWidth * 5) / 100,
              elevation: (infoInputBoxWidth * 1) / 100,
            }}
          >
            {/* <TextInput
              onChangeText={(event) =>  setInfo({...info, career: [event]})}
              maxLength={100}></TextInput> */}
          </TouchableOpacity>
          <View style={styles.photosContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "700" }}>
                프로필사진
              </Text>
              {profileImgUri ? (
                <TouchableOpacity
                  onPress={() =>
                    navigate("CheckImage", { imgType: "프로필사진" })
                  }
                >
                  <Image
                    source={{
                      uri: profileImgUri,
                    }}
                    style={{
                      ...styles.plusButton,
                      width: plusButtonWidth,
                      height: plusButtonWidth,
                      borderRadius: (plusButtonWidth * 15) / 100,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onGallery("프로필사진", dispatch);
                  }}
                >
                  <View
                    style={{
                      ...styles.plusButton,
                      width: plusButtonWidth,
                      height: plusButtonWidth,
                      borderRadius: (plusButtonWidth * 15) / 100,
                    }}
                  >
                    <Text style={styles.plusText}>+</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "700" }}>
                자격 증명서
              </Text>
              {certImgUri ? (
                <TouchableOpacity
                  onPress={() =>
                    navigate("CheckImage", { imgType: "자격 증명서" })
                  }
                >
                  <Image
                    source={{
                      uri: certImgUri,
                    }}
                    style={{
                      ...styles.plusButton,
                      width: plusButtonWidth,
                      height: plusButtonWidth,
                      borderRadius: (plusButtonWidth * 15) / 100,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onGallery("자격 증명서", dispatch);
                  }}
                >
                  <View
                    style={{
                      ...styles.plusButton,
                      width: plusButtonWidth,
                      height: plusButtonWidth,
                      borderRadius: (plusButtonWidth * 15) / 100,
                    }}
                  >
                    <Text style={styles.plusText}>+</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Career
            style={styles.modalContainer}
            isCareerModalVisible={isCareerModalVisible}
          ></Career>
        </View>
        <ButtonGreen2
          width="100%"
          buttonName="늘봄 시작하기"
          padding={9.5}
          borderRadius={10}
          onPressButton={() => signUp()}
        ></ButtonGreen2>
        <View style={styles.modalContainer}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: "10%",
    marginBottom: "2%",
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
  },
  textInputs: {
    width: "100%",
    paddingHorizontal: "10%",
  },
  certification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "1%",
  },
  certificationInput: {
    width: "50%",
  },
  certificationButton: {
    marginBottom: "-3%",
  },
  infoBox: {
    backgroundColor: "rgba(226,226,226,0.2)",
    elevation: 1,
    flexGrow: 0,
    paddingTop: "4%",
    paddingBottom: "3%",
    paddingHorizontal: "6%",
    marginTop: "4.5%",
    marginBottom: "2%",
  },
  infoInputBox: {
    backgroundColor: "#fff",
    marginTop: "3.5%",
    alignSelf: "center",
    marginBottom: "4%",
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    height: "100%",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  plusButton: {
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "9.5%",
  },
  plusText: {
    fontWeight: "700",
    fontSize: 35,
  },
  photosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    // height: windowHeight
  },
});
