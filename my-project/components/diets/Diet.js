import react from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import palette from "../palette";

const Diet = ({ kind, kcal, what, nutritions }) => (
  <Box>
    <Column>
      <Content style={{ flex: 1 }}>{kind}</Content>
      <Content style={{ color: `${palette.green}` }}>{kcal}</Content>
      <Plus>
        <Content style={{ color: "white" }}>+</Content>
      </Plus>
    </Column>
    <Content>{nutritions}</Content>
  </Box>
);

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Box = styled.View`
  flex: 1;
  align-items: center;
  margin: 10px 20px;
  background-color: ${palette.gray};
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 10px;
`;

const Content = styled.Text`
  color: ${palette.navy};
  padding: 10px 15px;
`;

const Plus = styled.View`
  background-color: ${palette.green};
  border-radius: 30px;
`;
export default Diet;
