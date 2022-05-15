import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const Nuelbom = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <Text>이것은 늘봄 소개</Text>
      </View>
    </ScrollView>
  );
};

export default Nuelbom;

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
