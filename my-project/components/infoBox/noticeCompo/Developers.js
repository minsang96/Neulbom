import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Linking } from "react-native";
const screenSize = Dimensions.get("screen");

const Developers = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.box}>
        <Text># 늘보미들 소개{"\n"}</Text>
        <Image
          source={require("../../assets/images/nuelbomTeam.png")}
          style={{
            width: screenSize.width * 0.78,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Image>
        <Text style={styles.title}>
          {"\n"}
          🌱늘봄을 만들 늘보미들🌱
        </Text>
        <Text>
          {"\n"}
          <Text onPress={() => Linking.openURL("freessafy104@gmail.com")}>
            💬 문의하기
          </Text>
          <Text
            onPress={() =>
              Linking.openURL(
                "https://wry-nebula-845.notion.site/Neulbom-b1c97f798625453f9c44bceee7359375"
              )
            }
          >
            💡노션
          </Text>
          &nbsp;&nbsp;
          <Text
            onPress={() =>
              Linking.openURL(
                "https://lab.ssafy.com/s06-final/S06P31A104/-/tree/master"
              )
            }
          >
            😺깃헙
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
export default Developers;

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
