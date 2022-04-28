import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const InfoMyself = () => {
  // if 성별 줄 함수 고쳐야함 !!!!!!!!!!
  const userGender = "남";
  const whatsUserGender = () => {
    if (userGender === "여") {
      return <Text>👩</Text>;
    } else {
      return <Text>🧑</Text>;
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.flexDirectionRow}>
        <Image
          source={require("../assets/images/dog.jpg")}
          style={styles.image}
        ></Image>
        <View>
          <Text style={styles.userName}>
            건강하게삽시다 {whatsUserGender()}
          </Text>
          <Text>ssafy104@naver.com</Text>
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userInfoItem}>
          <Text>나이</Text>
          <Text style={styles.userInfoItemContent}>35</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text>키</Text>
          <Text style={styles.userInfoItemContent}>165cm</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text>몸무게</Text>
          <Text style={styles.userInfoItemContent}>55kg</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoMyself;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(229,229,229,0.5)",
    borderRadius: 10,
    // 지우기
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "black",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: { fontSize: 20, marginBottom: 5 },
  flexDirectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 40,
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
    margin: 10,
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  userInfoItemContent: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
