import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

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
        <Text>
          #간식도 기록하자!{"\n"}
          (간식 검색 페이지){"\n"}
          간식도 식단에 기록하고 싶으셨다구요? 그래서 준비했습니다!{"\n"}
          [그 검색하는 데이터들 출처]에서 제공하는 [몇개]의 음식 정보들을 통해
          검색해서 기록할 수 있어요!{"\n"}
          {"\n"}
          #전문가 상담할 때 내 식단을 보고{"\n"}
          (전문가가 상담받는 사람 식단 보는 페이지){"\n"}
          이제는 상담할 때 말이 아니라 직접 내 식단 기록을 보고 상담할 수
          있어요!{"\n"}
          자료를 바탕으로 상담할 수 있으니 조금 더 상세하게 상담 받을 수 있겠죠?
          {"\n"}
        </Text>
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
});
