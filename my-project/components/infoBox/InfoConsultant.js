import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const InfoConsultant = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const whatsUserGender = () => {
    if (userInfo.memberGender === "m") {
      return <Text>🧑</Text>;
    } else {
      return <Text>👩</Text>;
    }
  };

  return (
    <View style={props.styles.box}>
      <View style={props.styles.flexDirectionRow}>
        <Image
          source={require("../assets/images/dog.jpg")}
          style={props.styles.image}
        ></Image>
        <View>
          <Text style={props.styles.userName}>
            {userInfo.memberNickname} {whatsUserGender()}
          </Text>
          <Text style={props.styles.email}>ssafy104@naver.com</Text>
        </View>
      </View>
      <Text style={props.styles.subtitle}>한 줄 소개</Text>
      <View style={props.styles.box}>
        <Text>{userInfo.memberDesc}</Text>
      </View>
    </View>
  );
};

export default InfoConsultant;
