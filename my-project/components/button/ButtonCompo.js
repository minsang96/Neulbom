import React from "react";
import { Button, View, Alert, StyleSheet } from "react-native";

const ButtonCompo = () => {
  return (
    <View>
      <Button
        title="press me"
        color="#09BC8A"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ButtonCompo;
