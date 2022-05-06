import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Infomation = (props) => {
  return (
    <View style={props.styles.infoBox}>
      <View style={props.styles.flexDirectionRow}>
        <TouchableOpacity style={props.styles.infoItem}>
          <Ionicons name="megaphone" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={props.styles.infoItem}>
          <Ionicons name="book" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>이용약관</Text>
        </TouchableOpacity>
        <TouchableOpacity style={props.styles.infoItem}>
          <Ionicons name="information-circle" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>늘봄소개</Text>
        </TouchableOpacity>
        <TouchableOpacity style={props.styles.infoItem}>
          <Ionicons name="people" size={24} color="black" />
          <Text style={{ marginTop: 5 }}>늘보미들</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Infomation;
