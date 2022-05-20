import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const Qualification = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(true);
  return (
    <View style={props.styles.box}>
      <Text style={props.styles.subtitle}>🏅 자격</Text>
      <Text style={props.styles.box}>{userInfo.expertCert}</Text>
      <Text style={props.styles.subtitle}>💼 이력</Text>
      <View style={props.styles.box}>
        {userInfo.expertCareer.map((data) => (
          <View>
            <Text key={data.careerSeq} style={{ color: "black" }}>
              {data.careerContent}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Qualification;
