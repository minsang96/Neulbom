import react from "react";
import { View, Text, StyleSheet } from "react-native";
import UserMypage from "./userMypage/UserMypage";

const Mypage = () => (
  <View style={styles.background}>
    <UserMypage></UserMypage>
  </View>
);

export default Mypage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
});
