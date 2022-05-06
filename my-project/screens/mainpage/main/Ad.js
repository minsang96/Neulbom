import react from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import palette from "../../../components/palette";

const Content = styled.Text`
  color: ${palette.navy};
  font-size: 18px;
  padding: 10px 15px;
`;
const Box = styled.View`
  width:90%
  background_color: ${palette.gray};
  padding: 10px 15px;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
`;
const Ad = () => (
  <Box>
    <Content>
      수기 작성 식단관리, 이제는 그만 {"\n"} FREE에서 편하게 관리해보세요
    </Content>
  </Box>
);

export default Ad;
