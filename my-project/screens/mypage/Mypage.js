import react from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import UserMypage from "./userMypage/UserMypage";

const Mypage = () => (
  <ScrollView style={styles.background}>
    <UserMypage></UserMypage>
  </ScrollView>
);

export default Mypage;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: "white",
    paddingHorizontal: 20,
  },
});
