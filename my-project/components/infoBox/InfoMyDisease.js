import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoMyDisease = () => {
  return (
    <View>
      <Text style={styles.font}>고혈압, 당뇨</Text>
    </View>
  );
};

export default InfoMyDisease;

const styles = StyleSheet.create({
  font: {
    backgroundColor: "rgba(229,229,229,0.5)",
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
  },
});
