import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlarmSetting = () => {
  return (
    <View>
      <Text style={styles.font}>알람 설정하시오</Text>
    </View>
  );
};

export default AlarmSetting;

const styles = StyleSheet.create({
  font: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
  },
});
