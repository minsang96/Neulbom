import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const screenSize = Dimensions.get("screen");

const Notice = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.background}>
      <View>
        <TouchableOpacity style={styles.box}>
          <Text
            onPress={() => navigation.navigate("Notice2")}
            style={styles.title}
          >
            방금 업데이트 한 것 같은데 또 찾아온{" "}
            <Text style={{ fontWeight: "bold" }}>1.1</Text> 업데이트 안내
          </Text>
          <Text style={styles.date}>2022-05-16</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text
            style={styles.title}
            onPress={() => navigation.navigate("Notice1")}
          >
            안녕하세요! 늘봄 1.0 출시 안내
          </Text>
          <Text style={styles.date}>2022-05-14</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Notice;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginTop: screenSize.height * 0.01,
    borderRadius: 10,
    elevation: 3,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  date: {
    color: "gray",
  },
});
