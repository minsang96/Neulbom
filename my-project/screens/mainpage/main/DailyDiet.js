import react from "react";
import { View, Text } from "react-native";
import ButtonCompo from "../../../components/button/ButtonCompo";
import styled from "styled-components/native";
import palette from "../../../components/palette";

const StyledView = styled.View`
  border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 2.0;
  shadow-radius: 2;
  elevation: 1;
  margin-left: 5;
  margin-right: 5;
  margin-bottom: 10;
`;

const Content = styled.Text`
  color: ${palette.navy};
  font-size: 18px;
  padding: 10px 15px;
`;

const SubContent = styled.Text`
  color: ${palette.navy};
  font-size: 12px;
  padding: 5px 15px;
`;

const Box = styled.View`
  width:90%
  background_color: white;
  padding: 10px 15px;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
  elevation: 3;
`;

const DailyDiet = () => (
  <>
    <Text>일일 영양 섭취량</Text>
    <Box>
      <Content>총 칼로리</Content>
      <SubContent>나트륨</SubContent>
      <SubContent>당</SubContent>
      <SubContent>탄수화물</SubContent>
      <SubContent>단백질</SubContent>
      <SubContent>지방</SubContent>
    </Box>
  </>
);

export default DailyDiet;
