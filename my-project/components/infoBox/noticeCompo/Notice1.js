import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
const screenSize = Dimensions.get("screen");
const Notice1 = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <Text style={styles.title}>ver 1.0 출시</Text>
        <Text style={{ textAlign: "right" }}>2022-05-13</Text>
        <Text>
          안녕하세요! 그리고 어서오세요! 여러분의 건강을 유지하기 위해 노력하는
          늘봄입니다.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Notice1;

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
  title: {
    fontSize: 20,
  },
});
