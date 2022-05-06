import React from "react";
import { View, Text, Image } from "react-native";

const InfoConsultant = (props) => {
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
      <Text style={props.styles.subtitle}>한 줄 소개</Text>
      <View style={props.styles.box}>
        <Text>여러분의 건강을 책임지겠습니다!</Text>
      </View>
    </View>
  );
};

export default InfoConsultant;
