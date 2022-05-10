import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const InfoMyself = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const whatsUserGender = () => {
    if (userInfo.memberGender === "m") {
      return <Text>🧑</Text>;
    } else {
      return <Text>👩</Text>;
    }
  };
  const year = new Date().getFullYear() - userInfo.memberYear + 1;
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
          <Text style={props.styles.email}>{userInfo.memberEmail}</Text>
        </View>
      </View>

      <View style={props.styles.userInfo}>
        <View style={props.styles.userInfoItem}>
          <Text>나이</Text>
          <Text style={props.styles.userInfoItemContent}>{year}</Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>키</Text>
          <Text style={props.styles.userInfoItemContent}>
            {userInfo.memberHeight}cm
          </Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>몸무게</Text>
          <Text style={props.styles.userInfoItemContent}>
            {userInfo.memberWeight}kg
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoMyself;
