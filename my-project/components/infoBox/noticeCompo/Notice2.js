import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions, Image } from "react-native";

const screenSize = Dimensions.get("screen");

const Notice2 = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <Text style={styles.title}>
          방금 업데이트 한 것 같은데 또 찾아온 1.1 업데이트 안내
        </Text>
        <Text style={{ textAlign: "right" }}>2022-05-14</Text>

        <View style={styles.line} />
        <View style={styles.titleBox}>
          <Text style={styles.contentTitle}>
            🌱늘봄의 새로운 기능을 소개합니다!
          </Text>
        </View>
        <View>
          <Text style={styles.subheading}>#1 간식도 기록하자!</Text>
          <Text style={styles.subContent}>
            간식도 식단에 기록하고 싶으셨다구요? 그래서 준비했습니다!{"\n"}
            [그 검색하는 데이터들 출처]에서 제공하는 [몇 개]의 음식 정보들을
            통해 검색해서 기록할 수 있어요!
          </Text>
          {/* <Image
            source={require("../../assets/images/dailyReport2.PNG")}
            style={{
              width: screenSize.width * 0.78,
              height: 380,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Image>
          <Image
            source={require("../../assets/images/dailyReport2.PNG")}
            style={{
              width: screenSize.width * 0.78,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          ></Image> */}
        </View>
        <View>
          <Text style={styles.subheading}>
            # 2 전문가 상담할 때 내 식단을 보고
          </Text>
          <Text style={styles.subContent}>
            이제는 상담할 때 말이 아니라 직접 내 식단 기록을 보고 상담할 수
            있어요!{"\n"}
            자료를 바탕으로 상담할 수 있으니 조금 더 상세하게 상담 받을 수
            있겠죠?
          </Text>
          <Image
            source={require("../../assets/images/mainpage1.jpeg")}
            style={{
              width: screenSize.width * 0.78,
              height: 380,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          ></Image>
        </View>
      </View>
    </ScrollView>
  );
};

export default Notice2;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.02,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginTop: screenSize.height * 0.02,
    borderRadius: 10,
    elevation: 3,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  subheading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  subContent: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
