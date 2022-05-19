import { View, Text, StyleSheet, Dimensions } from "react-native";
import ButtonGreen2 from "../../../components/button/ButtonGreen2";
import ConfettiCannon from "react-native-confetti-cannon";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function SuccessSignUp({ navigation: { navigate } }) {
  return (
    <View
      style={{
        ...styles.textContainer,
        ...styles.container,
        height: loginBoxHeight,
        width: loginBoxWidth,
        borderRadius: (loginBoxWidth * 5) / 100,
      }}
    >
      <ConfettiCannon count={50} origin={{ x: -10, y: 0 }} />
      <ConfettiCannon count={50} origin={{ x: windowWidth, y: 0 }} />
      <Text style={styles.completeText}>
        가입이 완료되었습니다! {"\n"}
        자격 인증이 완료되면 입력하신 이메일로 알려드리겠습니다!
      </Text>

      <ButtonGreen2
        width="100%"
        buttonName="로그인하러 가기"
        fontSize={15}
        padding={9.5}
        borderRadius={10}
        position="absolute"
        bottom={20}
        onPressButton={() => navigate("login")}
      ></ButtonGreen2>
    </View>
  );
}
const loginBoxHeight = windowHeight * 50;
const loginBoxWidth = windowWidth;
const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: "10%",
    alignItems: "center",
    backgroundColor: "white",
  },
  loginBox: {
    marginHorizontal: "20%",
    backgroundColor: "rgba(226,226,226,0.2)",
    paddingHorizontal: "10%",
    paddingTop: "5%",
    elevation: 1,
    marginBottom: "5%",
  },
  completeText: {
    marginTop: 200,
    fontSize: 22,
  },
  container: {
    flex: 1,
  },
});
