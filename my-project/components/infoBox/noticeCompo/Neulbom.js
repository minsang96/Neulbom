import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Row } from "react-native-table-component";

const screenSize = Dimensions.get("screen");

const Neulbom = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <View style={styles.titleBox}>
          <Text style={{ fontSize: 15, marginRight: 10, marginTop: 9 }}>
            똑똑한 식단 관리 앱,
          </Text>
          <Text style={styles.title}>🌱늘봄 </Text>
        </View>
        <Text style={styles.contentLine}>
          🌱 고혈압, 당뇨 등 만성 질환을 가진 분들의 건강 관리를 도와드립니다!
        </Text>
        <Text style={styles.contentLine}>
          🌱 혈당, 혈압을 주기적으로 기록하고, 음식 사진을 찍으면 알아서 영양
          정보를 계산해주고 기록해줍니다.
        </Text>
        <Text style={styles.contentLine}>
          🌱 권장 섭취량을 기준으로 과도한 나트륨, 당 섭취를 예방합니다.
        </Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.contentBox2}>
          생활하시다가 식단과 관련해서 궁금한 점이 있으시다구요?
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.contentBox}>
          그렇다면 늘봄에서 전문가와 상담해보세요!
        </Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.contentBox2}>
          각 분야의 전문가분들이 여러분의 리포트를 보고 상담을 진행해드립니다!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Neulbom;

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
  box2: {
    backgroundColor: "#09BC8A",
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
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  contentLine: {
    marginLeft: 10,
    marginBottom: 20,
  },
  contentBox: {
    color: "black",
    fontSize: 15,
  },
  contentBox2: {
    fontSize: 15,
    color: "white",
  },
});
