import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Infomation = (props) => {
  return (
    <View style={props.styles.box}>
      <View style={props.styles.flexDirectionRow}>
        <View>
          <Ionicons name="megaphone" size={24} color="black" />
          <Text>공지사항</Text>
        </View>
        <View>
          <Ionicons name="book" size={24} color="black" />
          <Text>이용약관</Text>
        </View>
        <View>
          <Ionicons name="shield-checkmark" size={24} color="black" />
          <Text>개인정보 처리방침</Text>
        </View>
      </View>
    </View>
  );
};

export default Infomation;
