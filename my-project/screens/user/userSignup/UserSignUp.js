import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LogBox,
  Alert,
} from "react-native";
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import React, { useState, useEffect } from "react";
import ButtonWhite from "../../../components/button/ButtonWhite";
import axios from "axios";
import {
  passwordVerify,
  stylePasswordVerify,
} from "../../../api/passwordVerify";
import { emailVerify } from "../../../api/emailVerify";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UserSignUp({ navigation: { navigate } }) {
  const [info, setInfo] = useState({
    email: "",
    certification: "",
    password: "",
    passwordVerification: "",
    gender: null,
    height: 0,
    weight: 0,
    birthYear: 0,
    healthValues: { bloodSugar: false, bloodPressure: false },
    disease: "",
    nickname: "",
  });
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getNickname();
  }, []);
  const infoBoxWidth = (windowWidth * 78) / 100;
  const radioWidth = (windowWidth * 5.5) / 100;
  const infoCardWidth = (infoBoxWidth * 47) / 100;
  const infoInputBoxWidth = (infoCardWidth * 65) / 100;
  const setInfoFromInfoBox = (event, param) => {
    if (param === "height") {
      setInfo({ ...info, height: Number(event) });
    } else if (param === "weight") {
      setInfo({ ...info, weight: Number(event) });
    } else if (param === "birthYear") {
      setInfo({ ...info, birthYear: Number(event) });
    }
  };
  const signUp = () => {
    if (!info.email || !info.email.trim()) {
      return Alert.alert("알림", "이메일을 입력해주세요.");
    } else if (
      !info.email.includes("@") ||
      !info.email.includes(".") ||
      info.email.length < 6
    ) {
      return Alert.alert("알림", "이메일을 확인해주세요.");
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
    if (!info.gender) {
      return Alert.alert("알림", "성별을 선택해주세요.");
    }
    if (info.height < 1 || info.height > 250) {
      return Alert.alert("알림", "키를 확인해주세요.");
    }
    if (info.weight < 1 || info.weight > 250) {
      return Alert.alert("알림", "몸무게를 확인해주세요.");
    }
    if (info.birthYear < 1922 || info.birthYear > new Date().getFullYear()) {
      return Alert.alert("알림", "출생연도를 확인해주세요.");
    }
    axios
      .post("https://k6a104.p.ssafy.io/api/member/join", {
        type: 0,
        email: info.email,
        pwd: info.password,
        gender: info.gender,
        height: info.height,
        weight: info.weight,
        year: info.birthYear,
        setting: info.healthValues,
        desc: info.disease,
        nickname: info.nickname,
        img: "https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f331.svg",
      })
      .then((res) => {
        console.log(res);
        navigate("SuccessSignUpUser");
      })
      .catch((err) => {
        if (
          err.response.data.message ===
          "이미 해당 이메일로 가입된 계정이 있습니다."
        ) {
          return Alert.alert("알림", "이미 가입된 이메일입니다.");
        }
      });
  };
  const getNickname = () => {
    axios
      .get("https://nickname.hwanmoo.kr/?format=json&count=1")
      .then((res) => {
        setInfo({ ...info, nickname: res.data.words[0] });
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: "8%" }}>
        <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="이메일"
            keyboardType="email-address"
            onChangeText={(event) => setInfo({ ...info, email: event })}
            autoFocus={true}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.inputline}></View>
          <View style={styles.certification}>
            <View style={styles.certificationtextInput}>
              <TextInput
                style={{ ...styles.textInput, width: "180%" }}
                placeholder="인증번호"
                onChangeText={(event) =>
                  setInfo({ ...info, certification: event })
                }
              ></TextInput>
              <View style={{ ...styles.inputline, width: "180%" }}></View>
            </View>
            <View style={styles.certificationButton}>
              <ButtonGreen2
                width={(windowWidth * 30) / 100}
                buttonName="이메일 인증"
                padding={8}
                borderRadius={10}
                onPressButton={() => {
                  emailVerify(info.email);
                }}
              ></ButtonGreen2>
            </View>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={(event) => setInfo({ ...info, password: event })}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.inputline}></View>
          <TextInput
            style={styles.textInput}
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
        <View style={{ ...styles.radiosBox }}>
          <View style={styles.radio}>
            {info.gender === "m" ? (
              <TouchableOpacity
                style={{
                  ...styles.radioButton,
                  width: radioWidth,
                  height: radioWidth,
                  borderRadius: (radioWidth * 30) / 100,
                  backgroundColor: "#09BC8A",
                }}
              ></TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setInfo({ ...info, gender: "m" })}
                style={{
                  ...styles.radioButton,
                  width: radioWidth,
                  height: radioWidth,
                  borderRadius: (radioWidth * 30) / 100,
                }}
              ></TouchableOpacity>
            )}
            <Text style={{ fontSize: 16 }}>남</Text>
          </View>
          <View style={styles.radio}>
            {info.gender === "f" ? (
              <TouchableOpacity
                style={{
                  ...styles.radioButton,
                  width: radioWidth,
                  height: radioWidth,
                  borderRadius: (radioWidth * 30) / 100,
                  backgroundColor: "#09BC8A",
                }}
              ></TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setInfo({ ...info, gender: "f" })}
                style={{
                  ...styles.radioButton,
                  width: radioWidth,
                  height: radioWidth,
                  borderRadius: (radioWidth * 30) / 100,
                }}
              ></TouchableOpacity>
            )}
            <Text style={{ fontSize: 16 }}>여</Text>
          </View>
        </View>
        <FlatList
          style={{
            ...styles.infoBox,
            width: infoBoxWidth,
            borderRadius: (infoBoxWidth * 5) / 100,
          }}
          scrollEnabled={false}
          horizontal={false}
          numColumns={2}
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) => (
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />
            ))
          }
          data={[
            { title: "키", key: "item1", measure: "cm", param: "height" },
            { title: "몸무게", key: "item2", measure: "kg", param: "weight" },
            {
              title: "태어난 해",
              key: "item3",
              measure: "년",
              param: "birthYear",
            },
          ]}
          renderItem={({ item, index, separators }) => (
            <View
              key={index}
              style={{ ...styles.infoCard, width: infoCardWidth }}
            >
              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              <View
                style={{
                  ...styles.infoInputBox,
                  width: infoInputBoxWidth,
                  borderRadius: (infoInputBoxWidth * 5) / 100,
                  elevation: (infoCardWidth * 1.7) / 100,
                }}
              >
                <View
                  style={{
                    ...styles.infoInput,
                    width: (infoInputBoxWidth * 60) / 100,
                  }}
                >
                  {
                    <TextInput
                      keyboardType="number-pad"
                      onChangeText={(event) =>
                        setInfoFromInfoBox(event, item.param)
                      }
                      maxLength={4}
                    ></TextInput>
                  }
                </View>
                {item.measure === "년" ? (
                  <Text style={{ position: "absolute", left: "67%" }}>
                    {item.measure}
                  </Text>
                ) : (
                  <Text style={{ position: "absolute", left: "60%" }}>
                    {item.measure}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
        <Text style={styles.title}>주요 건강 수치</Text>
        <View
          style={{
            ...styles.healthValueBox,
            width: infoBoxWidth,
            borderRadius: (infoBoxWidth * 5) / 100,
          }}
        >
          {info.healthValues.bloodPressure && (
            <ButtonGreen2
              onPressButton={() =>
                setInfo({
                  ...info,
                  healthValues: { ...info.healthValues, bloodPressure: false },
                })
              }
              buttonName="혈압"
              width={(infoBoxWidth * 40) / 100}
              padding={(windowHeight * 1.5) / 100}
              fontWeight="700"
              elevation={3}
            ></ButtonGreen2>
          )}
          {!info.healthValues.bloodPressure && (
            <ButtonWhite
              onPressButton={() =>
                setInfo({
                  ...info,
                  healthValues: { ...info.healthValues, bloodPressure: true },
                })
              }
              buttonName="혈압"
              width={(infoBoxWidth * 40) / 100}
              padding={(windowHeight * 1.5) / 100}
              fontWeight="700"
              elevation={3}
            ></ButtonWhite>
          )}
          {info.healthValues.bloodSugar && (
            <ButtonGreen2
              onPressButton={() =>
                setInfo({
                  ...info,
                  healthValues: { ...info.healthValues, bloodSugar: false },
                })
              }
              buttonName="혈당"
              width={(infoBoxWidth * 40) / 100}
              padding={(windowHeight * 1.5) / 100}
              fontWeight="700"
            ></ButtonGreen2>
          )}
          {!info.healthValues.bloodSugar && (
            <ButtonWhite
              onPressButton={() =>
                setInfo({
                  ...info,
                  healthValues: { ...info.healthValues, bloodSugar: true },
                })
              }
              buttonName="혈당"
              width={(infoBoxWidth * 40) / 100}
              padding={(windowHeight * 1.5) / 100}
              fontWeight="700"
              elevation={3}
            ></ButtonWhite>
          )}
        </View>
        <Text style={styles.title}>질병</Text>
        <TextInput
          style={{ marginLeft: "4%" }}
          placeholder="예) 당뇨, 고혈압"
          onChangeText={(event) => setInfo({ ...info, disease: event })}
        ></TextInput>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ ...styles.inputline, width: "92%" }}></View>
        </View>

        <ButtonGreen2
          width="100%"
          buttonName="늘봄 시작하기"
          padding={9.5}
          borderRadius={10}
          onPressButton={() => signUp()}
        ></ButtonGreen2>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: "11%",
  },
  inputline: {
    backgroundColor: "#172A3A",
    width: "100%",
    height: 1,
    marginTop: "1%",
    marginBottom: "5%",
  },
  textInput: {
    alignSelf: "flex-start",
    marginTop: "4%",
    width: "100%",
  },
  textInputBox: {
    width: "100%",
    paddingHorizontal: "7%",
  },
  certification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "2%",
    marginTop: "-2%",
  },
  certificationInput: {
    width: "50%",
  },
  certificationButton: {
    marginBottom: "-3%",
  },
  radioButton: {
    backgroundColor: "#e2e2e2",
    marginRight: "8%",
  },
  radio: {
    flexDirection: "row",
  },
  radiosBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: "6%",
    marginTop: "3%",
  },
  infoBox: {
    backgroundColor: "rgba(226,226,226,0.2)",
    elevation: 1,
    flexGrow: 0,
    paddingTop: "6%",
    paddingBottom: "3%",
    paddingHorizontal: "3%",
  },
  infoCard: {
    alignItems: "center",
    paddingBottom: "7%",
  },
  infoInputBox: {
    backgroundColor: "#fff",
    textAlign: "center",
    marginTop: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoInput: {
    paddingLeft: "25%",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 21.5,
    fontWeight: "700",
    marginTop: "5.5%",
    marginBottom: "2.5%",
  },
  healthValueBox: {
    backgroundColor: "rgba(226,226,226,0.2)",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: "0.5%",
  },
});
