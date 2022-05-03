import React from "react";
import { View, Text, Image } from "react-native";

const InfoMyself = (props) => {
  // if 성별 줄 함수 고쳐야함 !!!!!!!!!!
  const userGender = "남";
  const whatsUserGender = () => {
    if (userGender === "여") {
      return <Text>👩</Text>;
    } else {
      return <Text>🧑</Text>;
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
            건강하게삽시다 {whatsUserGender()}
          </Text>
          <Text style={props.styles.email}>ssafy104@naver.com</Text>
        </View>
      </View>

      <View style={props.styles.userInfo}>
        <View style={props.styles.userInfoItem}>
          <Text>나이</Text>
          <Text style={props.styles.userInfoItemContent}>35</Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>키</Text>
          <Text style={props.styles.userInfoItemContent}>165cm</Text>
        </View>
        <View style={props.styles.userInfoItem}>
          <Text>몸무게</Text>
          <Text style={props.styles.userInfoItemContent}>55kg</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoMyself;
