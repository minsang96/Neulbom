import react from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styled from "styled-components/native";
import palette from "../../../components/palette";

const Content = styled.Text`
  color: ${palette.navy};
  font-size: 18px;
  padding: 5px 15px;
`;

const Box = styled.View`
  width: 90%;
  background-color: ${palette.gray};
  padding: 10px 15px;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
`;

const Ad = () => (
  <Box>
    <View style={{ flexDirection: "row" }}>
      <View>
        <Content style={{ fontFamily: "SeoulNamsanEB" }}>
          수기 작성 식단관리,
          {"\n"}이제는 그만!
        </Content>
        <Text style={styles.contentMore}>늘봄에서 편하게 관리해보세요</Text>
      </View>
      <Image
        source={require("../../../components/assets/images/bab.png")}
      ></Image>
    </View>
  </Box>
);

export default Ad;

const styles = StyleSheet.create({
  contentMore: { marginLeft: 15, marginRight: 15, fontFamily: "SeoulNamsanL" },
});
