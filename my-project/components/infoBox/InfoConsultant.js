import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const InfoConsultant = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <View style={props.styles.box}>
      <View style={props.styles.flexDirectionRow}>
        <Image
          source={{ uri: userInfo.expertImg }}
          style={props.styles.image}
        ></Image>
        <View>
          <Text style={props.styles.userName}>{userInfo.expertName}</Text>
          <Text style={props.styles.email}>{userInfo.userEmail}</Text>
        </View>
      </View>
      <Text style={props.styles.subtitle}>한 줄 소개</Text>
      <View style={props.styles.box}>
        <Text>{userInfo.expertDesc}</Text>
      </View>
    </View>
  );
};

export default InfoConsultant;
