import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const ButtonCompo = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...props.styles,
        backgroundColor: "#e2e2e2",
        padding: 11,
        marginVertical: 9,
        // marginHorizontal: 25,
        alignItems: "center",
        borderRadius: 10,
        width: '80%',
        justifyContent: 'center'
      }}
      onPress={props.onPressButton}
    >
      <Text style={{ color: "#172A3A", fontSize: 14 }}>{props.buttonName}</Text>
      <Text style={styles.arrow}>&gt;</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: '5%'
  }
})

export default ButtonCompo;
